import React, { useState, useEffect } from "react";
import axios from 'axios';

const DoctorDetails = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get('http://localhost:4200/doctors', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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
    <div className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
      {/* <div className="overflow-x-auto"> */}
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-300">ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-300">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-300">Specialization</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-300">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-300">Phone</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <tr key={doctor.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{doctor.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{doctor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{doctor.specialization}</td>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{doctor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{doctor.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-center" colSpan="5">
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    // </div>
  );
};

export default DoctorDetails;