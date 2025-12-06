import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get("https://hospital-management-1-09zh.onrender.com/api/appointments", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.patch(`https://hospital-management-1-09zh.onrender.com/api/appointments/${id}/status`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(`Appointment ${newStatus} successfully`);
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment status");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-gray-100 text-gray-700"
  };

  if (loading) {
    return <div className="text-center py-4">Loading appointments...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Patient Name</th>
              <th className="p-2">Department</th>
              <th className="p-2">Date & Time</th>
              <th className="p-2">Doctor</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id} className="border-b">
                <td className="p-2">
                  {appointment.firstName} {appointment.lastName}
                </td>
                <td className="p-2">{appointment.department}</td>
                <td className="p-2">
                  {formatDate(appointment.appointmentDate)} {appointment.appointmentTime}
                </td>
                <td className="p-2">
                  {appointment.doctorId ?
                    `Dr. ${appointment.doctorId.firstName} ${appointment.doctorId.lastName}` :
                    'Not Assigned'
                  }
                </td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium capitalize ${statusColor[appointment.status]}`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="p-2 flex gap-2">
                  {appointment.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(appointment._id, "accepted")}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(appointment._id, "rejected")}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {appointment.status === 'accepted' && (
                    <button
                      onClick={() => handleStatusUpdate(appointment._id, "completed")}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointments;
