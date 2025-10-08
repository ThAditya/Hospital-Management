import React, { useState, useEffect } from "react";
import { FaUserInjured, FaBed, FaCalendarCheck, FaBell, FaUserMd, FaPills } from "react-icons/fa";
import { ImLab } from "react-icons/im";
import Chart from "../Admin-Dashboard/Chart";
import axios from "axios";

const DocDashboard = () => {
  const [stats, setStats] = useState({
    patients: 0,
    wards: 0,
    labs: 0,
    appointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Replace with actual API endpoints for doctor dashboard stats
      const [patientsRes, wardsRes, labsRes, appointmentsRes] = await Promise.all([
        axios.get("http://localhost:4200/patients"),
        axios.get("http://localhost:4200/wards"),
        axios.get("http://localhost:4200/labs"),
        axios.get("http://localhost:4200/appointments"),
      ]);

      setStats({
        patients: patientsRes.data.length,
        wards: wardsRes.data.length,
        labs: labsRes.data.length,
        appointments: appointmentsRes.data.length,
      });
    } catch (error) {
      console.error("Error fetching doctor dashboard stats:", error);
      setStats({
        patients: 0,
        wards: 0,
        labs: 0,
        appointments: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading doctor dashboard...</div>;
  }

  return (
    <div className="flex flex-col p-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-white">
          <FaUserInjured className="text-5xl mb-3 opacity-90" />
          <h1 className="text-lg font-semibold mb-1">Total Patients</h1>
          <p className="text-3xl font-bold">{stats.patients}</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-green-500 to-green-600 p-6 shadow-lg rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-white">
          <FaBed className="text-5xl mb-3 opacity-90" />
          <h1 className="text-lg font-semibold mb-1">Total Wards</h1>
          <p className="text-3xl font-bold">{stats.wards}</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-white">
          <ImLab className="text-5xl mb-3 opacity-90" />
          <h1 className="text-lg font-semibold mb-1">Total Labs</h1>
          <p className="text-3xl font-bold">{stats.labs}</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-red-500 to-red-600 p-6 shadow-lg rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-white">
          <FaCalendarCheck className="text-5xl mb-3 opacity-90" />
          <h1 className="text-lg font-semibold mb-1">Total Appointments</h1>
          <p className="text-3xl font-bold">{stats.appointments}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaUserMd /> Analytics Overview
          </h2>
          <Chart />
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaCalendarCheck /> Recent Appointments
          </h2>
          <p className="text-gray-600">No appointments found.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaUserMd /> Doctor Directory
          </h2>
          <p className="text-gray-600">List of doctors with details can be shown here.</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaPills /> Medicine Inventory
          </h2>
          <p className="text-gray-600">Medicine stock and details can be shown here.</p>
        </div>
      </div>
    </div>
  );
};

export default DocDashboard;