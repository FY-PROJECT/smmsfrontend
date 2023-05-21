import React, { useState, useContext, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import alertContext from "../../contexts/Alert/alertContext";
import trainerContext from "../../contexts/trainerContext";

const Trainer = (props) => {
  let { tittle } = props;
  const { id,dob } = useParams(); // fetches the ID from the URI
  const navigate = useNavigate();

  const context = useContext(alertContext);
  const { showAlert } = context;

  const contextTrainer = useContext(trainerContext);
  const {getFormatedDate,getTrainerData,addTrainer,updateTrainer} = contextTrainer;
  
  const [trainerData, setTrainerData] = useState(props.trainer);

  function formatDate(date) {
    let inputDate;

  if (typeof date === 'string') {
      const parts = date.split('-');
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      inputDate = new Date(`${year}-${month}-${day}`);
  } else if (typeof date === 'number') {
    inputDate = new Date(date);
  } else {
    return 'Invalid input';
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
  }
  

  

  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const res = await getTrainerData(id,dob);
        if (res.status) {
          const formatedTrainerData = {
            ...res.trainer,
            dob: formatDate(res.trainer.dob),
            certificateDate: formatDate(res.trainer.certificateDate),
            honrableChargeDate : formatDate(res.trainer.honrableChargeDate),
            certificateValidity : formatDate(res.trainer.certificateValidity),
          };
          setTrainerData(formatedTrainerData);
        } else {
          showAlert(res.msg, "danger");
          navigate('/admin');
        }
      } catch (err) {
        showAlert("Error Fetching Trainer Data", "danger");
      }
    };
    if(tittle === "Update" && localStorage.getItem("token")){
        fetchTrainerData();
    }
    // eslint-disable-next-line
  },[tittle,id]); // fetches the trainer data on component mount
  
  const addTrainerRecord = async (trainerData) => {
    try{
      const res = await addTrainer(trainerData);
      if (res.status) {
        // (localStorage.getItem('token')) ? navigate('/admin') : navigate('/');
        showAlert(res.msg, "success");
        // setTrainerData(props.trainer)
      } else {
        showAlert(res.msg, "danger");
      }
    }catch(err){
      showAlert("Error Adding Trainer", "danger");
    }
  };

 
  const updateTrainerRecord = async (trainerData,id) => {
    try {
      const res = await updateTrainer(trainerData,id);
      if (res.status) {
        navigate('/admin');
        showAlert("Trainer Updated Successfully", "success");
      } else {
        showAlert("Error Updating Trainer", "danger");
      }
    } catch (err) {
      console.log("error", err);
      showAlert("Error Updating Trainer"+err, "danger");
    }
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formatedTrainerData = {
      ...trainerData,
      bsgid: trainerData.bsgid.toUpperCase(),
      dob: getFormatedDate(trainerData.dob),
      certificateDate: getFormatedDate(trainerData.certificateDate),
      honrableChargeDate: getFormatedDate(trainerData.honrableChargeDate),
      certificateValidity: getFormatedDate(trainerData.certificateValidity),
    };
    if(tittle === "Update" && localStorage.getItem("token")){
      await updateTrainerRecord(formatedTrainerData,id);
    }else if(tittle === "Update"){
      showAlert("Unauthorized Access Please Login to Continue", "danger");
      navigate('/login');
    }else if(tittle === "Add"){
      await addTrainerRecord(formatedTrainerData);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    await setTrainerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h3 className="card-title text-center">{tittle} Trainer</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Bsg uid */}
              <div className="form-group">
                <label htmlFor="bsgid">BSG UID</label>
                <input
                  type="text"
                  className="form-control"
                  id="bsgid"
                  name="bsgid"
                  value={trainerData.bsgid?.toUpperCase()}
                  onChange={handleChange}
                  required
                />
              </div>
              {/*Name of trainer */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={trainerData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Email */}
              <div className="form-group">
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  value={trainerData.emailId}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Dob */}
              <div className="form-group">
                {/* {formatDate(trainerData.dob)} */}
                <br /><br />
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob"
                  value={trainerData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Aadhar */}
              <div className="form-group">
                <label htmlFor="aadharNo">Aadhar Card No.</label>
                <input
                  type="number"
                  className="form-control"
                  id="aadharNo"
                  name="aadharNo"
                  value={trainerData.aadharNo}
                  onChange={handleChange}
                  minLength={12}
                  maxLength={12}
                  required
                />
              </div>
              {/* Phone No */}
              <div className="form-group">
                <label htmlFor="phoneNo">Phone No.</label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNo"
                  name="phoneNo"
                  value={trainerData.phoneNo}
                  onChange={handleChange}
                  minLength={10}
                  maxLength={10}
                  required
                />
              </div>
              {/* State */}
              <div className="form-group">
                <label htmlFor="state">State</label>
                <select 
                  className="form-control"
                  id="state"
                  name="state"
                  value={trainerData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
              {/* Unit */}
              <div className="form-group">
                <label htmlFor="unit">Unit</label>
                <select
                  className="form-control"
                  id="unit"
                  name="unit"
                  value={trainerData.unit}
                  onChange={handleChange}
                  required
                >
                  <option value="">--Select--</option>
                  <option value="Scout">Scout</option>
                  <option value="Rover">Rover</option>
                  <option value="Cub">Cub</option>
                </select>
              </div>
              {/* Category */}
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  className="form-control"
                  id="category"
                  name="category"
                  value={trainerData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">--Select--</option>
                  <option value="Leader Trainer">Leader Trainer</option>
                  <option value="Assistant Leader Trainer">
                    Assisstant Leader Trainer
                  </option>
                </select>
              </div>
              {/* Post */}
              <div className="form-group">
                <label htmlFor="post">Post</label>
                <input
                  type="text"
                  className="form-control"
                  id="post"
                  name="post"
                  value={trainerData.post}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Certificate No */}
              <div className="form-group">
                <label htmlFor="certificateNo">Certificate No.</label>
                <input
                  type="text"
                  className="form-control"
                  id="certificateNo"
                  name="certificateNo"
                  value={trainerData.certificateNo}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Certificate Date */}
              <div className="form-group">
                <label htmlFor="certificateDate">Certificate Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="certificateDate"
                  name="certificateDate"
                  value={trainerData.certificateDate}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Honrabale Charge No */}
              <div className="form-group">
                <label htmlFor="honrableChargeNo">
                  Hon'able Charge No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="honrableChargeNo"
                  name="honrableChargeNo"
                  value={trainerData.honrableChargeNo}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Honrabale Charge Date */}
              <div className="form-group">
                <label htmlFor="honrableChargeDate">
                Hon'able Charge Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="honrableChargeDate"
                  name="honrableChargeDate"
                  value={trainerData.honrableChargeDate}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Certificate Validity */}
              <div className="form-group">
                <label htmlFor="certificateValidity">
                  Certificate Validity
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="certificateValidity"
                  name="certificateValidity"
                  value={trainerData.certificateValidity}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn bg-gradient-primary mx-auto">
                {tittle}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  ); 
};

export default Trainer;

Trainer.defaultProps = {
  tittle: "Add",
  trainer : {
    bsgid: "",
    name: "",
    emailId: "",
    dob: Date.now(),
    aadharNo: "",
    phoneNo:"",
    state: "Maharashtra",
    unit: "",
    category: "",
    post: "",
    certificateNo: "",
    certificateDate:Date.now(),
    honrableChargeNo: "",
    honrableChargeDate: Date.now(),
    certificateValidity: Date.now(),
  }
};
