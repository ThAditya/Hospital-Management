import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PatientTreatment = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatientTreatments();
  }, []);

  const fetchPatientTreatments = async () => {
    setLoading(true);
    try {
      // Example patient ID (replace with real one from auth)
      const patientId = "507f1f77bcf86cd799439011";
      const response = await axios.get(
        `http://localhost:4200/treatments/patient/${patientId}`
      );

      // Filter only past (completed/ended) treatments
      const today = new Date();
      const pastTreatments = response.data.filter(
        (treatment) =>
          (treatment.endDate && new Date(treatment.endDate) < today) ||
          treatment.status?.toLowerCase() === "completed"
      );

      setTreatments(pastTreatments);
    } catch {
      toast.error("Failed to fetch treatments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          🩺 My Past Treatments
        </h2>

        {loading ? (
          <p className="text-center text-indigo-600 font-medium animate-pulse">
            Loading treatments...
          </p>
        ) : treatments.length === 0 ? (
          <p className="text-center text-gray-500">
            No past treatments found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-xl overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left">Treatment Name</th>
                  <th className="p-3 text-left">Diagnosis</th>
                  <th className="p-3 text-left">Doctor</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Start Date</th>
                  <th className="p-3 text-left">End Date</th>
                </tr>
              </thead>
              <tbody>
                {treatments.map((treatment) => (
                  <tr
                    key={treatment._id}
                    className="hover:bg-indigo-50 transition-all duration-200"
                  >
                    <td className="border-t p-3 font-semibold text-gray-700">
                      {treatment.treatmentName}
                    </td>
                    <td className="border-t p-3 text-gray-600">
                      {treatment.diagnosis}
                    </td>
                    <td className="border-t p-3 text-gray-700">
                      {treatment.doctorId?.firstName}{" "}
                      {treatment.doctorId?.lastName}
                    </td>
                    <td
                      className={`border-t p-3 font-medium ${
                        treatment.status?.toLowerCase() === "completed"
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {treatment.status}
                    </td>
                    <td className="border-t p-3 text-gray-600">
                      {treatment.startDate
                        ? new Date(
                            treatment.startDate
                          ).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="border-t p-3 text-gray-600">
                      {treatment.endDate
                        ? new Date(treatment.endDate).toLocaleDateString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientTreatment;
