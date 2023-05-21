import React, { useState, useContext, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "../css/style.css";
import alertContext from "../contexts/Alert/alertContext";
import trainerContext from "../contexts/trainerContext";

const Profile = (props) => {

  const { bsgid,dob } = useParams(); // fetches the ID from the URI
  const navigate = useNavigate();
  
  const context = useContext(alertContext);
  const { showAlert } = context;
  
  const contextTrainer = useContext(trainerContext);
  const {getTrainerData } = contextTrainer;

  const [trainerData, setTrainerData] = useState(props.trainer);

  useEffect(() => {
  const trainerRecord = async () => {
    try {
      const res = await getTrainerData(bsgid.toUpperCase(),dob);
      if (res.status) {
        setTrainerData(res.trainer);
      } else {
        navigate(-1)
        showAlert(res.msg, "danger");
      }
      
    } catch (err) {
      showAlert("Error Fetching Trainer Data", "danger");
      // navigate(-1)
    }
  };
  trainerRecord();
}, [bsgid,dob]);

  // const  = (date) => {
  //   const d = new Date(date);
  //   const month = d.getMonth() + 1;
  //   const day = d.getDate();
  //   const year = d.getFullYear();
  //   return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}`;
  // };
  
  return (
    <> 
      <div id="profile" className="profile">
      <button onClick={()=>{navigate(-1)}}><i className="fa fa-arrow-left" aria-hidden="true"></i> &nbsp;</button>
        <h1>Profile</h1>
      </div>

      <div className="col">
        <div className="pro-card">
          <p><b>BSG UID : &nbsp;&nbsp;</b>{trainerData.bsgid}</p>
          <p><b>Name :  &nbsp;&nbsp;</b>{trainerData.name}</p>
          <p><b>Email :  &nbsp;&nbsp;</b>{trainerData.emailId}</p>
          <p><b>Date of Birth :  &nbsp;&nbsp;</b>{(trainerData.dob)}</p>
          <p><b>Aadaar Card No. :  &nbsp;&nbsp;</b>{trainerData.aadharNo}</p>
          <p><b>Phone No. :  &nbsp;&nbsp;</b>{trainerData.phoneNo}</p>
          <p><b>Name of the State :  &nbsp;&nbsp;</b>{trainerData.state}</p>
        </div>

        <div className="pro-card">
          <p><b>Unit :  &nbsp;&nbsp;</b>{trainerData.unit}</p>
          <p><b>Category :  &nbsp;&nbsp;</b>{trainerData.category}</p>
          <p><b>Post :  &nbsp;&nbsp;</b>{trainerData.post}</p>
        </div>

        <div className="pro-card">
          <p><b>{(trainerData.category==="Leader Trainer") ? "LT" : "ALT"} Certificate no :  &nbsp;&nbsp;</b>{trainerData.certificateNo}</p>
          <p><b>Date :  &nbsp;&nbsp;</b>{(trainerData.certificateDate)}</p>
          <p><b>{(trainerData.category==="Leader Trainer") ? "LT" : "ALT"} Hon'ble Charge no :  &nbsp;&nbsp;</b>{trainerData.honrableChargeNo}</p>
          <p><b>Date :  &nbsp;&nbsp;</b>{(trainerData.honrableChargeDate)}</p>
          <p><b>Valid Upto :  &nbsp;&nbsp;</b>{(trainerData.certificateValidity)}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;


Profile.defaultProps = {
  trainer : {
    bsgid: "BSG UID",
    name: "Trainer Name",
    emailId: "Your Email ID",
    dob: "Your Date of Birth",
    aadharNo: "Your Aadhar Card No.",
    state: "Maharashtra",
    unit: "Your Unit",
    category: "Your Category",
    post: "Your Post",
    certificateNo: "Your Certificate No.",
    certificateDate: "Your Certificate Date",
    honrableChargeNo: "Your Honrable Charge No.",
    honrableChargeDate: "Your Honrable Charge Date",
    certificateValidity: "Your Certificate Validity",
  }
};
