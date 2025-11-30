import React from "react";
import { Routes, Route } from "react-router-dom";
import Patient_Sidebar from "./Patient_Sidebar";
import PatientStaff from "./PatientStaff/PatientStaff";
import PatientLab from "./PatientLab/PatientLab";
import PatientPharmacy from "./PatientPharmacy/PatientPharmacy";
import PatientTreatment from "./PatientTreatment/PatientTreatment";
import PatientWard from "./PatientWard/PatientWard";
import PatientPatientDetails from "./PatientPatientDetails/PatientPatientDetails";
import PatientBookings from "./PatientBookings/PatientBookings";
import PatientDashboardHome from "./PatientDashboardHome";

const PatientDashboard = () => {
  return (
    <div className="flex h-screen">
      <Patient_Sidebar />
      <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          {/* Default overview when visiting /patient */}
          <Route index element={<PatientDashboardHome />} />

          {/* Detailed sections */}
          <Route path="Staff" element={<PatientStaff />} />
          <Route path="Treatment" element={<PatientTreatment />} />
          <Route path="Lab" element={<PatientLab />} />
          <Route path="Pharmacy" element={<PatientPharmacy />} />
          <Route path="Ward" element={<PatientWard />} />
          <Route path="Profile" element={<PatientPatientDetails />} />
          <Route path="Bookings" element={<PatientBookings />} />
        </Routes>
        <div className='h-15'></div>
      </main>
    </div>
  );
};

export default PatientDashboard;
