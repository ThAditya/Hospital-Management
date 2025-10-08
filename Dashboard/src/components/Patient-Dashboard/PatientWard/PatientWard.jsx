import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PatientWard = () => {
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4200/ward');
      setWards(response.data);
    } catch {
      toast.error('Failed to fetch wards');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Hospital Wards</h2>

      {loading ? (
        <p>Loading wards...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Ward Name</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Total Beds</th>
              <th className="border border-gray-300 p-2">Available Beds</th>
              <th className="border border-gray-300 p-2">Floor</th>
              <th className="border border-gray-300 p-2">Active</th>
            </tr>
          </thead>
          <tbody>
            {wards.map(ward => (
              <tr key={ward._id}>
                <td className="border border-gray-300 p-2">{ward.wardName}</td>
                <td className="border border-gray-300 p-2">{ward.wardType}</td>
                <td className="border border-gray-300 p-2">{ward.totalBeds}</td>
                <td className="border border-gray-300 p-2">{ward.availableBeds}</td>
                <td className="border border-gray-300 p-2">{ward.floor}</td>
                <td className="border border-gray-300 p-2">{ward.isActive ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientWard;
