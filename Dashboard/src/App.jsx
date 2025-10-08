import React from "react";
import "./App.css";
import AdminDashboard from "./components/Admin-Dashboard/AdminDashboard";
import DoctorDashboard from "./components/Doctor-Dashboard/DoctorDashboard";
import PatientDashboard from "./components/Patient-Dashboard/PatientDashboard";  // updated import
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/Admin/*" element={<AdminDashboard />} />
        <Route path="/doctor/*" element={<DoctorDashboard />} />
        <Route path="/patient/*" element={<PatientDashboard />} />  {/* updated route */}
      </Routes>
    </>
  );
}

export default App;
