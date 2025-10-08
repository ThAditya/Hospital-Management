import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminTreatment = () => {
  const [treatments, setTreatments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");

  useEffect(() => {
    fetchAllTreatments();
  }, []);

  const fetchAllTreatments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4200/treatments");
      setTreatments(response.data);
      setFiltered(response.data);
    // eslint-disable-next-line no-unused-vars
    } catch ( error) {
      toast.error("Failed to fetch treatments");
    } finally {
      setLoading(false);
    }
  };

  // --- Delete a treatment ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this treatment?")) return;
    try {
      await axios.delete(`http://localhost:4200/treatments/${id}`);
      toast.success("Treatment deleted successfully");
      fetchAllTreatments();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to delete treatment");
    }
  };

  // --- Handle Search & Filter ---
  useEffect(() => {
    let data = [...treatments];

    // Filter by search text
    if (search.trim()) {
      const lower = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.patientId?.firstName?.toLowerCase().includes(lower) ||
          t.patientId?.lastName?.toLowerCase().includes(lower) ||
          t.doctorId?.firstName?.toLowerCase().includes(lower) ||
          t.doctorId?.lastName?.toLowerCase().includes(lower) ||
          t.treatmentName?.toLowerCase().includes(lower)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      data = data.filter((t) => t.status === statusFilter);
    }

    // Filter by doctor
    if (doctorFilter !== "all") {
      data = data.filter((t) => t.doctorId?._id === doctorFilter);
    }

    setFiltered(data);
  }, [search, statusFilter, doctorFilter, treatments]);

  // --- Extract unique doctor list for dropdown ---
  const doctorList = [
    ...new Map(
      treatments
        .filter((t) => t.doctorId)
        .map((t) => [t.doctorId._id, t.doctorId])
    ).values(),
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 border-b-4 border-blue-500 pb-2 inline-block">
        🏥 Treatment Dashboard (Admin)
      </h2>

      {/* --- Controls --- */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
        <input
          type="text"
          placeholder="🔍 Search by patient, doctor, or treatment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <div className="flex gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="all">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="all">All Doctors</option>
            {doctorList.map((doc) => (
              <option key={doc._id} value={doc._id}>
                Dr. {doc.firstName} {doc.lastName}
              </option>
            ))}
          </select>

          <button
            onClick={fetchAllTreatments}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* --- Treatments Table --- */}
      {loading ? (
        <p className="text-gray-600">Loading treatments...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="w-full text-sm text-gray-700 border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Treatment</th>
                <th className="p-3">Diagnosis</th>
                <th className="p-3">Status</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">End Date</th>
                <th className="p-3">Follow-Up</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center p-4 text-gray-500">
                    No treatments found.
                  </td>
                </tr>
              ) : (
                filtered.map((treatment) => (
                  <tr
                    key={treatment._id}
                    className="border-b hover:bg-blue-50 transition-all duration-200"
                  >
                    <td className="p-3">
                      {treatment.patientId?.firstName} {treatment.patientId?.lastName}
                    </td>
                    <td className="p-3">
                      Dr. {treatment.doctorId?.firstName} {treatment.doctorId?.lastName}
                    </td>
                    <td className="p-3">{treatment.treatmentName}</td>
                    <td className="p-3">{treatment.diagnosis}</td>
                    <td
                      className={`p-3 font-semibold ${
                        treatment.status === "completed"
                          ? "text-green-600"
                          : treatment.status === "ongoing"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {treatment.status}
                    </td>
                    <td className="p-3">
                      {treatment.startDate
                        ? new Date(treatment.startDate).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="p-3">
                      {treatment.endDate
                        ? new Date(treatment.endDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3">
                      {treatment.followUpDate
                        ? new Date(treatment.followUpDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() =>
                          toast.info(
                            `Viewing treatment by Dr. ${treatment.doctorId?.firstName || "Unknown"}`
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(treatment._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTreatment;
