import React from 'react'
import Admin_Sidebar from './Admin_Sidebar'
import Dashboard from "./Dashboard";
import { Routes, Route } from 'react-router-dom';
import Ward from './ward/ward';
import Staff from './staff/Staff';
import Lab from './lab/Lab';
import Pharmacy from './pharmacy/Pharmacy';
import PatientDetails from './PatientDetails/PatientDetails';


const AdminDashboard = () => {
  return (
    <div className='flex'>
        <div className="left w-[20%]">
            <Admin_Sidebar/>
        </div>
      <div className="right w-[80%]" >
        <Routes>
            <Route path="/" element={<Dashboard/>} ></Route>
            <Route path="/Admin-Dashboard/staff" element={<Staff/>} ></Route>
            <Route path="/Admin-Dashboard/lab" element={<Lab/>} ></Route>
            <Route path="/Admin-Dashboard/pharmacy" element={<Pharmacy/>} ></Route>
            <Route path="/Admin-Dashboard/patientDetails" element={<PatientDetails/>} ></Route>
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard
