import React from "react";
import "./App.css";
import AdminDashboard from "./components/Admin-Dashboard/AdminDashboard";
import Doctor_Sidebar from "./components/Doctor-Dashboard/Doctor_Sidebar";
import Dashboard from "./components/Patient-Dashboard/Dashboard";  // updated import
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/doctor" element={<Doctor_Sidebar />} />
        <Route path="/patient" element={<Dashboard />} />  {/* updated route */}
      </Routes>
    </>
  );
}

export default App;
