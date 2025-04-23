import React from 'react'
import Admin_Sidebar from './Admin_Sidebar'
import Dashboard from "./Dashboard";
import { Routes, Route } from 'react-router-dom';
import Staff from './staff/Staff';
import Lab from './lab/Lab';
import Pharmacy from './pharmacy/Pharmacy';
import PatientDetails from './PatientDetails/PatientDetails';
import Ward from './ward/Ward';

const AdminDashboard = () => {
  return (
    <div className='flex'>
        <div className="left w-[20%]">
            <Admin_Sidebar/>
        </div>
      <div className="right w-[80%]" >
        <Routes>
            <Route path="/Admin" element={<Dashboard/>} ></Route>
            <Route path="/staff" element={<Staff/>} ></Route>
            <Route path="/lab" element={<Lab/>} ></Route>
            <Route path="/Ward" element={<Ward/>} ></Route>
            <Route path="/pharmacy" element={<Pharmacy/>} ></Route>
            <Route path="/patientDetails" element={<PatientDetails/>} ></Route>
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard
