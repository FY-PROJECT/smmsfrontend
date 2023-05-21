import React, { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import profile from "../../img/testimonials/testimonials-1.jpg";
import DownloadTable from "../../plugins/DownloadTable";
import Card from "./Card";

import trainerContext from "../../contexts/trainerContext";
import alertContext from "../../contexts/Alert/alertContext";

const Dashboard = () => {
  const  contextAlert = useContext(alertContext);
  const {showAlert} = contextAlert;

  const context = useContext(trainerContext);
  const {countOfTrainers,getTrainers,deleteTrainer} = context;

  //contains all records of trainers
  const [records, setRecords] = useState([]);
  // used to store the original copy as search functionality will change the records array
  const [recordsCopy, setRecordsCopy] = useState([]);
  // used to store the search query
  const [searchQuery, setSearchQuery] = useState("");
  let countDefault = {"assistantLeaderTrainerScoutCount":0,"assistantLeaderTrainerRoverCount":0,"assistantLeaderTrainerCubCount":0,"leaderTrainerScoutCount":0,"leaderTrainerRoverCount":0,"leaderTrainerCubCount":0};
  // Store the count of the leader and assisstant leader trainer of specific unit
  const [count,setCount] = useState(countDefault);
  
  useEffect(() => {
    async function fetchData() {
      try{
        const res = await getTrainers();
        if (res.status) {
          setRecords(res.trainers);
          setRecordsCopy(res.trainers);
          
          let cnt = await countOfTrainers();
          setCount(cnt.trainerCount);
        }
      }catch(err){
        showAlert("Error Fetching Trainers", "danger");
      }
    }
    fetchData();
  }, []);

  
  const deleteTrainerRecord = async (id) => {
    try {
      const res = await deleteTrainer(id);
      if (res.status) {
        showAlert(res.msg, "success");
        setRecords(records.filter((record) => record.bsgid !== id));
      } else {
        showAlert(res.msg, "danger");
      }
    } catch (err) {
      showAlert("Error Deleting Trainer", "danger");
    }
  };


  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchQuery(searchValue);
    const filteredRecords = recordsCopy.filter((record) => {
      return (
        record.name.toLowerCase().includes(searchValue) ||
        record.category.toLowerCase().includes(searchValue)
      );
    });
    setRecords(filteredRecords);
  };
  

  return (
    <>
      <div className="container container-fluid py-4">
        <div className="container row text-center">
          <h4 className="text-white mb-3">Leader Trainer</h4>
          <Card count={count["leaderTrainerCubCount"]} unit = {"Cub"}/>
          <Card count={count["leaderTrainerScoutCount"]} unit = {"Scout"}/>
          <Card count={count["leaderTrainerRoverCount"]} unit = {"Rover"}/>
          
          <h4 className="text-white mb-3 alt">Assisstant Leader Trainer</h4>
          <Card count={count["assistantLeaderTrainerCubCount"]} unit = {"Cub"}/>
          <Card count={count["assistantLeaderTrainerScoutCount"]} unit = {"Scout"}/>
          <Card count={count["assistantLeaderTrainerRoverCount"]} unit = {"Rover"}/>
        </div>
        <div className="container row mt-4">
          <div className="col-12">
            <div className="card mb-4 ">
              <div className="card-header pb-0">
                <h6>Trainers Table</h6>
              </div>
              <div className="ms-md-auto pe-md-3 d-flex align-items-center ">
                <div className="row">
                  <div className="col-12 my-3">
                    <div className = "btn btn-success">
                      <DownloadTable  data={records} filename="table.xlsx" omitKeys={[]} />
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
                          Trainer
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          BSG-ID
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Unit
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          DOB
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          View
                        </th>
                        <th className="text-secondary opacity-7"></th>
                        <th className="text-secondary opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {records &&
                        records.map((record, index) => {
                          return (
                            <tr key={record.bsgid}>
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
                                    <p className="text-xs text-secondary mb-0">
                                      {record.category}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {record.bsgid}
                                </p>
                                {/* <p className="text-xs text-secondary mb-0">
                                  {"EMS"}
                                </p> */}
                              </td>
                              <td className="align-middle text-center text-sm">
                                <span className={`badge badge-sm bg-gradient-${(record.unit === "Scouting") ? "success" : (record.unit === "Rovering") ? "danger" :"primary"}`}>
                                  {record.unit}
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  {(record.dob)}
                                </span>
                              </td>

                              <td className="text-center">
                                <Link
                                  to={"../../profile/" + record.bsgid+"/"+(record.dob)}
                                  type="button"
                                  className="btn badge badge-sm bg-gradient-secondary"
                                >
                                  <i className="fa fa-eye" aria-hidden="true"></i>
                                </Link> 
                                </td>
                              <td className="align-middle">
                                <Link
                                  to={`/admin/update/${record.bsgid}/${record.dob}`}
                                  className="text-secondary font-weight-bold text-xs "
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  <i className="fa fa-pencil" aria-hidden="true"></i>
                                </Link>
                              </td>
                              <td className="align-middle">
                                <button onClick={()=>deleteTrainerRecord(record.bsgid)}>
                                  <i style={{color:"#CA1929"}} className="fa fa-trash" aria-hidden="true"></i>
                                </button>
                              </td>
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

export default Dashboard;
