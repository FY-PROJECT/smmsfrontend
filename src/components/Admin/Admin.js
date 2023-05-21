import React,{useContext} from 'react'
import { Routes, Route,useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import Sidebar from './Sidebar'
import Trainer from './Trainer'
import Query from './Query'
import Alert from '../Alert'
import alertContext from "../../contexts/Alert/alertContext";

const Admin = () => {
  
  const navigate = useNavigate();
  const context = useContext(alertContext);
  const { showAlert } = context;

  if(localStorage.getItem("token") === null){
    navigate("/login")
    showAlert("Access Denied Please Login to Continue", "danger")
  }
  return (
    <>
    <div className="g-sidenav-show bg-gray-100">
        <div className="min-height-300 bg-primary position-absolute w-100"></div>
        <Sidebar/>
        <main className="main-content position-relative border-radius-lg ps">
        <Alert/>  
        <Routes>      
          <Route path="/" element={<><Dashboard/></>} />
          <Route path="/add" element={<Trainer tittle={"Add"} />} />
          <Route path="/update/:id/:dob" element={<Trainer tittle={"Update"} />} />
          <Route path="/query" element={<Query isLog={false} />} />
          <Route path="/querylog" element={<Query isLog={true} />} />
        </Routes>        
        </main>
    </div> 
    </>
  )
}

export default Admin