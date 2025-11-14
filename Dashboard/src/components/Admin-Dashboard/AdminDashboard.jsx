import React from 'react';
import Admin_Sidebar from './Admin_Sidebar';
import Dashboard from "./Dashboard";
import { Routes, Route } from 'react-router-dom';
import Staff from './staff/Staff';
import Lab from './lab/Lab';
import Pharmacy from './pharmacy/Pharmacy';
import PatientDetails from './PatientDetails/PatientDetails';
import Ward from './ward/Ward';
import Treatments from './AdminTreatments';

const AdminDashboard = () => {
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className="left w-[20%]">
        <Admin_Sidebar />
      </div>
      <div className="right w-[80%]  h-full overflow-y-scroll bg-gray-50 p-6  ">
        <Routes>
          {/* Default Dashboard route */}
          <Route index element={<Dashboard />} />
          <Route path="admin" element={<Dashboard />} />

          {/* Relative child routes */}
          <Route path="staff" element={<Staff />} />
          <Route path="lab" element={<Lab />} />
          <Route path="ward" element={<Ward />} />
          <Route path="treatment" element={<Treatments />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="patientDetails" element={<PatientDetails />} />
        </Routes>
        <div className='h-15'></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
