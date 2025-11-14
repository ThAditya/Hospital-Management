import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserMd, FaPills, FaNotesMedical, FaCalendarAlt, FaClock } from 'react-icons/fa';

const PatientTreatment = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatientTreatments();
  }, []);

  const fetchPatientTreatments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      // Decode token to get patient ID
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const patientId = decodedToken.id;

      const response = await axios.get(
        `http://localhost:4200/treatments/patient/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTreatments(response.data);
    } catch {
      toast.error("Failed to fetch treatments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center flex items-center justify-center gap-2">
          <FaUserMd className="text-indigo-600" />
          My Treatments
        </h2>

        {loading ? (
          <p className="text-center text-indigo-600 font-medium animate-pulse">
            Loading treatments...
          </p>
        ) : treatments.length === 0 ? (
          <p className="text-center text-gray-500">
            No treatments found.
          </p>
        ) : (
          <div className="space-y-6">
            {treatments.map((treatment) => (
              <div key={treatment._id} className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{treatment.treatmentName}</h3>
                    <p className="text-sm text-gray-600 mt-1">{treatment.diagnosis}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-2">
                      <FaCalendarAlt className="text-gray-500" />
                      Started: {treatment.startDate ? new Date(treatment.startDate).toLocaleDateString() : 'N/A'}
                    </p>
                    {treatment.endDate && (
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <FaClock className="text-gray-500" />
                        Ended: {new Date(treatment.endDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>Doctor:</strong> {treatment.doctorId?.firstName} {treatment.doctorId?.lastName}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Status:</strong>
                      <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                        treatment.status?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800' :
                        treatment.status?.toLowerCase() === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {treatment.status}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Medications */}
                {treatment.medications && treatment.medications.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 flex items-center gap-1 mb-2">
                      <FaPills className="text-blue-600" />
                      Prescribed Medicines
                    </h4>
                    <div className="bg-white p-3 rounded border">
                      <ul className="list-disc list-inside space-y-1">
                        {treatment.medications.map((med, index) => (
                          <li key={index} className="text-sm text-gray-700">{med}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Procedures */}
                {treatment.procedures && treatment.procedures.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Procedures</h4>
                    <div className="bg-white p-3 rounded border">
                      <ul className="list-disc list-inside space-y-1">
                        {treatment.procedures.map((proc, index) => (
                          <li key={index} className="text-sm text-gray-700">{proc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Description */}
                {treatment.description && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Treatment Description</h4>
                    <p className="text-sm text-gray-600 bg-white p-3 rounded border">{treatment.description}</p>
                  </div>
                )}

                {/* Notes */}
                {treatment.notes && (
                  <div>
                    <h4 className="font-medium text-gray-700 flex items-center gap-1 mb-2">
                      <FaNotesMedical className="text-green-600" />
                      Additional Notes
                    </h4>
                    <p className="text-sm text-gray-600 bg-white p-3 rounded border">{treatment.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientTreatment;
