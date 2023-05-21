import React, { useState, useEffect,useContext } from "react";
import profile from "../../img/testimonials/testimonials-1.jpg";
import DownloadTable from "../../plugins/DownloadTable";
import alertContext from "../../contexts/Alert/alertContext";
import queryContext from "../../contexts/queryContext";

const Query = (props) => {
    const isLog = props.isLog;
  const context = useContext(alertContext);
  const { showAlert } = context;

  const contextQuery = useContext(queryContext);
  const { sendReply,queryLogs,getAllQueries } = contextQuery;

  //contains all records of trainers
  const [records, setRecords] = useState([]);
  // used to store the original copy as search functionality will change the records array
  const [recordsCopy, setRecordsCopy] = useState([]);
  // used to store the search query
  const [searchQuery, setSearchQuery] = useState("");
  // used to store the reply message
  const [replyMessage, setReplyMessage] = useState("");

  const handleReplyMessageChange = (e) => {
    setReplyMessage(e.target.value);
  };

  const handleReplySubmit = async (queryId) => {
      try{
        if(replyMessage === ""){
            showAlert("Please enter a reply message", "danger");
            return;
        }
        // send the reply message to the server
        const res = await sendReply(queryId,replyMessage);
        // set the updated records in the state
        
        if(res.status){
          const updatedRecords = recordsCopy.filter((record) => {
              return (record._id !== queryId)
          });
          setRecords(updatedRecords);
          setRecordsCopy(updatedRecords);
          // clear the reply message state
          setReplyMessage("");
          showAlert("Reply Successfully Sent", "success");        
        }else{
          showAlert(res.msg, "danger");
        }
    }catch(err){
      showAlert("Error sending Reply", "danger");
    }

  };

  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchQuery(searchValue);
    const filteredRecords = recordsCopy.filter((record) => {
      return (
        record.name.toLowerCase().includes(searchValue) || record.email.toLowerCase().includes(searchValue)
      );
    });
    setRecords(filteredRecords);
  };

  useEffect(() => {
    async function fetchData() {
      try{
        let res = false;
        if(isLog){
          res = await queryLogs();
        }else{
          res = await getAllQueries();
        }
        if (res.status) {
          setRecords(res.queries);
          setRecordsCopy(res.queries);
        }else{
          showAlert(res.msg, "danger");
        }
      }catch(err){
        showAlert("Error Fetching Data", "danger");
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [isLog]);

  return (
    <>
      <div className="container container-fluid py-4">
        <div className="container row mt-4">
          <div className="col-12">
            <div className="card mb-4 ">
              <div className="card-header pb-0">
                <h6>{`Queries ${isLog?"Log":""} Table`}</h6>
              </div>
              <div className="ms-md-auto pe-md-3 d-flex align-items-center ">
                <div className="row">
                  <div className="col-12 my-3">
                    <div className="btn btn-success">
                      <DownloadTable data={records} filename="table.xlsx" omitKeys={["_id","__v"]}/>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text text-body">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type here..."
                        value={searchQuery}
                        onChange={handleChange}
                        />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                {records.length === 0 && <p className="text-center">No Records Found</p>}
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Name
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Email
                        </th>
                        <th className=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Query
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Reply
                        </th>
                        <th className="text-secondary opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {records &&
                        records.map((record, index) => {
                          return (
                            <tr key={record._id}>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div>
                                    <img
                                      src={profile}
                                      className="avatar avatar-sm me-3"
                                      alt="user1"
                                    />
                                  </div>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                      {record.name}
                                    </h6>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {record.email}
                                </p>
                              </td>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {record.message}
                                </p>
                              </td>
                                {isLog ? 
                                <td className="text-center">
                                    {record.reply}
                                </td>
                                :
                                <td className="text-center">
                                <button
                                  type="button"
                                  className="btn badge badge-sm bg-gradient-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#replyModal${record._id}`}
                                >
                                  Reply
                                </button> 
                                
                                <div
                                  className="modal fade"
                                  id={`replyModal${record._id}`}
                                  tabIndex="-1"
                                  aria-labelledby={`replyModal${record._id}Label`}
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id={`replyModal${record._id}Label`}
                                        >
                                          Reply to {record.name}
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <div className="mb-3">
                                          <label
                                            htmlFor={`replyInput${record._id}`}
                                            className="form-label"
                                          >
                                            Reply message
                                          </label>
                                          <textarea
                                            className="form-control"
                                            id={`replyInput${record._id}`}
                                            rows="3"
                                            value={replyMessage}
                                            onChange={handleReplyMessageChange}
                                          ></textarea>
                                        </div>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          data-bs-dismiss="modal"
                                          onClick={() =>
                                            handleReplySubmit(record._id)
                                          }
                                        >
                                          Send
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Query;
