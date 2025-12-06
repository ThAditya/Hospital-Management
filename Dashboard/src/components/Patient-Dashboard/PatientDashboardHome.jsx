import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaClipboardList, FaNotesMedical, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const PatientDashboardHome = () => {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No authentication token found");
          return;
        }

        const authHeaders = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const profilePromise = axios.get(
          "https://hospital-management-1-09zh.onrender.com/api/user/profile",
          authHeaders
        );

        const appointmentsPromise = axios.get(
          "https://hospital-management-1-09zh.onrender.com/api/appointments/my",
          authHeaders
        );

        // Decode token to get patient ID for treatments
        let treatmentsPromise = Promise.resolve({ data: [] });
        try {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const patientId = decodedToken.id;
          treatmentsPromise = axios.get(
            `https://hospital-management-1-09zh.onrender.com/treatments/patient/${patientId}`,
            authHeaders
          );
        } catch {
          // if token cannot be decoded, just skip treatments
        }

        const [profileRes, appointmentsRes, treatmentsRes] =
          await Promise.all([profilePromise, appointmentsPromise, treatmentsPromise]);

        setPatient(profileRes.data);
        setAppointments(appointmentsRes.data || []);

        const ongoingTreatments = (treatmentsRes.data || []).filter(
          (t) => t.status?.toLowerCase() === "ongoing"
        );
        setTreatments(ongoingTreatments);
      } catch (error) {
        console.error("Failed to load patient dashboard data", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        search.trim().length === 0 ||
        [
          appointment.department,
          appointment.notes,
          appointment.status,
          appointment.appointmentTime,
          appointment.doctorId
            ? `${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`
            : "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, statusFilter]);

  const upcomingAppointment = useMemo(() => {
    const now = new Date();
    const future = appointments
      .map((a) => ({
        ...a,
        date: new Date(a.appointmentDate),
      }))
      .filter((a) => a.date >= now)
      .sort((a, b) => a.date - b.date);
    return future[0] || null;
  }, [appointments]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center space-x-3 text-gray-600">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          <span>Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-4">
        <p className="text-gray-600">
          Patient details not available. Please log in again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Welcome, {patient.firstName}</h2>
          <p className="text-gray-600">
            Here is a quick overview of your profile, appointments, and ongoing treatments.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/patient/Profile"
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              View full profile
            </Link>
            <Link
              to="/patient/Bookings"
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              View all bookings
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md px-4 py-3 flex items-center space-x-3">
          <FaUser className="text-blue-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Patient ID</p>
            <p className="text-sm font-semibold text-gray-800">{patient.NIC}</p>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Appointments</p>
            <p className="text-2xl font-bold text-gray-800">{appointments.length}</p>
          </div>
          <FaClipboardList className="text-blue-500 text-3xl" />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Ongoing Treatments</p>
            <p className="text-2xl font-bold text-gray-800">{treatments.length}</p>
          </div>
          <FaNotesMedical className="text-green-500 text-3xl" />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Next Appointment</p>
            <p className="text-md font-semibold text-gray-800">
              {upcomingAppointment
                ? new Date(
                    upcomingAppointment.appointmentDate
                  ).toLocaleDateString()
                : "None"}
            </p>
          </div>
          <FaCalendarAlt className="text-indigo-500 text-3xl" />
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Profile + Treatments */}
        <div className="space-y-6 lg:col-span-1">
          {/* Profile card */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              My Profile
            </h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p className="font-medium text-gray-900">
                  {patient.firstName} {patient.lastName}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{patient.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{patient.mobNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Address</p>
                <p className="font-medium text-gray-900">{patient.address}</p>
              </div>
            </div>
          </div>

          {/* Ongoing treatments list */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <FaNotesMedical className="text-green-600" />
              Current Treatments
            </h3>
            {treatments.length === 0 ? (
              <p className="text-sm text-gray-500">No ongoing treatments.</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {treatments.map((treatment) => (
                  <div
                    key={treatment._id}
                    className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                  >
                    <p className="font-semibold text-gray-800">
                      {treatment.treatmentName}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {treatment.diagnosis}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Doctor: {" "}
                      {treatment.doctorId
                        ? `${treatment.doctorId.firstName} ${treatment.doctorId.lastName}`
                        : "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Appointments table */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">My Appointments</h3>
              <p className="text-sm text-gray-500">
                Search and filter your appointments.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by doctor, department, status..."
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No appointments match your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Doctor
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAppointments.map((appointment, index) => (
                    <tr
                      key={appointment._id || index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {appointment.appointmentTime}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {appointment.department}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {appointment.doctorId
                          ? `${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`
                          : "Not assigned"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 capitalize">
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardHome;
