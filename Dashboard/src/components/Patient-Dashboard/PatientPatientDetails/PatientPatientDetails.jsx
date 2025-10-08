import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PatientPatientDetails = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    setLoading(true);
    try {
      // This should use the logged-in patient's ID
      const patientId = '507f1f77bcf86cd799439011'; // Placeholder - should be from authentication
      const response = await axios.get(`http://localhost:4200/patients/${patientId}`);
      setPatient(response.data);
    } catch {
      toast.error('Failed to fetch patient details');
    } finally {
      setLoading(false);
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
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Profile</h2>
      <div className="bg-white shadow-lg rounded-2xl p-6">
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
    </div>
  );
};

export default PatientPatientDetails;
