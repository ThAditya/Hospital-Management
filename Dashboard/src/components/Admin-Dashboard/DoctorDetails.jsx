import React, { useState, useEffect } from "react";
import axios from 'axios';

const DoctorDetails = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4200/doctorController', { 
        headers: { 
          'Content-Type': 'application/json' 
        } 
      });
      setDoctors(response.data); // axios puts the response data in .data property
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error fetching doctors:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="m-6 p-4">Loading doctors...</div>;
  if (error) return <div className="m-6 p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="m-6 shadow-md p-2 h-50 bg-amber-200 rounded-2xl">
      <div className="heading">
        <h1 className="font-bold">Recent Doctors</h1>
      </div>

      <div className="details border-2 w-[95%] ml-6 mt-2 h-[80%] p-2 overflow-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Specialization</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor.id} className="odd:bg-white even:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{doctor.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{doctor.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{doctor.specialization}</td>
                  <td className="border border-gray-300 px-4 py-2">{doctor.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{doctor.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center" colSpan="5">
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorDetails;