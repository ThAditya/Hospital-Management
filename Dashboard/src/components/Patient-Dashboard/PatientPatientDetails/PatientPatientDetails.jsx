import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaPills, FaNotesMedical, FaCalendarAlt } from 'react-icons/fa';

const PatientPatientDetails = () => {
  const [patient, setPatient] = useState(null);
  const [currentTreatments, setCurrentTreatments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatientDetails();
    fetchCurrentTreatments();
  }, []);

  const fetchPatientDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No authentication token found');
        return;
      }
      const response = await axios.get('http://localhost:4200/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatient(response.data);
    } catch {
      toast.error('Failed to fetch patient details');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentTreatments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      // Decode token to get patient ID
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const patientId = decodedToken.id;

      const response = await axios.get(
        `http://localhost:4200/api/treatments/patient/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Filter only ongoing treatments
      const ongoingTreatments = response.data.filter(
        (treatment) => treatment.status?.toLowerCase() === "ongoing"
      );

      setCurrentTreatments(ongoingTreatments);
    } catch {
      // Silently handle error for treatments
    }
  };

  if (loading) {
    return <div className="p-4">Loading patient details...</div>;
  }

  if (!patient) {
    return <div className="p-4">Patient details not found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <FaUser className="text-blue-600" />
        My Profile
      </h2>

      {/* Patient Details */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Personal Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <p className="mt-1 text-sm text-gray-900">{patient.firstName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <p className="mt-1 text-sm text-gray-900">{patient.lastName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-sm text-gray-900">{patient.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <p className="mt-1 text-sm text-gray-900">{patient.mobNumber}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <p className="mt-1 text-sm text-gray-900">{patient.gender}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <p className="mt-1 text-sm text-gray-900">
              {patient.dob ? new Date(patient.dob).toLocaleDateString() : ''}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">NIC</label>
            <p className="mt-1 text-sm text-gray-900">{patient.NIC}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <p className="mt-1 text-sm text-gray-900">{patient.address}</p>
          </div>
        </div>
      </div>

      {/* Current Treatments */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <FaNotesMedical className="text-green-600" />
          Current Treatments
        </h3>

        {currentTreatments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No ongoing treatments.</p>
        ) : (
          <div className="space-y-4">
            {currentTreatments.map((treatment) => (
              <div key={treatment._id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">{treatment.treatmentName}</h4>
                    <p className="text-sm text-gray-600 mt-1">{treatment.diagnosis}</p>
                    <p className="text-sm text-gray-600">
                      <FaCalendarAlt className="inline mr-1" />
                      Started: {treatment.startDate ? new Date(treatment.startDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>Doctor:</strong> {treatment.doctorId?.firstName} {treatment.doctorId?.lastName}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Status:</strong>
                      <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {treatment.status}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Medications */}
                {treatment.medications && treatment.medications.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-700 flex items-center gap-1 mb-2">
                      <FaPills className="text-blue-600" />
                      Prescribed Medicines
                    </h5>
                    <div className="bg-white p-3 rounded border">
                      <ul className="list-disc list-inside space-y-1">
                        {treatment.medications.map((med, index) => (
                          <li key={index} className="text-sm text-gray-700">{med}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Description */}
                {treatment.description && (
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-700 mb-2">Treatment Description</h5>
                    <p className="text-sm text-gray-600 bg-white p-3 rounded border">{treatment.description}</p>
                  </div>
                )}

                {/* Notes */}
                {treatment.notes && (
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-700 mb-2">Additional Notes</h5>
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

export default PatientPatientDetails;
