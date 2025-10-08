import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PatientStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4200/staff");
      setStaffList(response.data);
    } catch {
      toast.error("Failed to fetch staff list");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          👩‍⚕️ Hospital Staff Directory
        </h2>

        {loading ? (
          <p className="text-center text-indigo-600 font-medium animate-pulse">
            Loading staff...
          </p>
        ) : staffList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-xl overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff) => (
                  <tr
                    key={staff._id}
                    className="hover:bg-indigo-50 transition-all duration-200"
                  >
                    <td className="border-t p-3 font-semibold text-gray-700">
                      {staff.firstName} {staff.lastName}
                    </td>
                    <td className="border-t p-3 text-gray-600">{staff.email}</td>
                    <td className="border-t p-3 text-gray-600">
                      {staff.department}
                    </td>
                    <td className="border-t p-3 text-gray-700 font-medium">
                      {staff.role}
                    </td>
                    <td className="border-t p-3 text-gray-600">
                      {staff.mobNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No staff data available.</p>
        )}
      </div>
    </div>
  );
};

export default PatientStaff;
