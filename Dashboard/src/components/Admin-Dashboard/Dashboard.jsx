import React, { useState, useEffect } from "react";
import { FaUserInjured } from "react-icons/fa";
import { FaUserDoctor, FaBed } from "react-icons/fa6";
import { ImLab } from "react-icons/im";
import Chart from "./Chart";
import DoctorDetails from "./DoctorDetails";
import Medicine from "./Medicine";
import Appointments from "./Appointments";
import axios from "axios";
import Pharmacy from "./pharmacy/Pharmacy";

const Dashboard = () => {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    totalAppointments: 0,
    pendingAppointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get("https://hospital-management-1-09zh.onrender.com/api/dashboard-stats", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { totalPatients, totalDoctors, totalAppointments, pendingAppointments } = response.data;
      setStats({ patients: totalPatients, doctors: totalDoctors, totalAppointments, pendingAppointments });
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Fallback to zero values
      setStats({
        patients: 0,
        doctors: 0,
        totalAppointments: 0,
        pendingAppointments: 0
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  return (
    <div className="flex flex-col p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your hospital management system.</p>
      </div>

      {/* Top Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-white">
          <FaUserInjured className="text-5xl mb-3 opacity-90" />
          <h1 className="text-lg font-semibold mb-1">Total Patients</h1>
          <p className="text-3xl font-bold">{stats.patients}</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-green-500 to-green-600 p-6 shadow-lg rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-white">
          <FaUserDoctor className="text-5xl mb-3 opacity-90" />
          <h1 className="text-lg font-semibold mb-1">Total Doctors</h1>
          <p className="text-3xl font-bold">{stats.doctors}</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-white">
          <FaBed className="text-5xl mb-3 opacity-90" />
          <h1 className="text-lg font-semibold mb-1">Total Appointments</h1>
          <p className="text-3xl font-bold">{stats.totalAppointments}</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-red-500 to-red-600 p-6 shadow-lg rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-white">
          <ImLab className="text-5xl mb-3 opacity-90" />
          <h1 className="text-lg font-semibold mb-1">Pending Appointments</h1>
          <p className="text-3xl font-bold">{stats.pendingAppointments}</p>
        </div>
      </div>

      {/* Chart + Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics Overview</h2>
          <Chart />
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Appointments</h2>
          <Appointments />
        </div>
      </div>

      {/* Doctor + Medicine */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Doctor Directory</h2>
          <DoctorDetails />
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Medicine Inventory</h2>
          <Medicine />
          {/* <Pharmacy /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
