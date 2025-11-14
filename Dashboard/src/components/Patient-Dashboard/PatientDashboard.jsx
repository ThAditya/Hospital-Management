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

const PatientDashboard = () => {
  return (
    <div className="flex h-screen">
      <Patient_Sidebar />
      <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          {/* <Route path="/" element={
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Patient Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="font-semibold mb-4 text-gray-700">Patient Details</h3>
                  <PatientPatientDetails />
                </div>
                <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="font-semibold mb-4 text-gray-700">Treatments</h3>
                  <PatientTreatment />
                </div>
                <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="font-semibold mb-4 text-gray-700">Lab Reports</h3>
                  <PatientLab />
                </div>
                <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="font-semibold mb-4 text-gray-700">Pharmacy</h3>
                  <PatientPharmacy />
                </div>
                <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="font-semibold mb-4 text-gray-700">Ward Info</h3>
                  <PatientWard />
                </div>
                <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="font-semibold mb-4 text-gray-700">Staff</h3>
                  <PatientStaff />
                </div>
              </div>
            </div>
          } /> */}
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
