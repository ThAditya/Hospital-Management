import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorTreatment = () => {
  const [treatments, setTreatments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    treatmentName: '',
    description: '',
    diagnosis: '',
    medications: '',
    procedures: '',
    notes: '',
    startDate: '',
    endDate: '',
    status: 'ongoing',
    followUpDate: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTreatments();
    fetchPatients();
  }, []);

  const fetchTreatments = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4200/treatments');
      setTreatments(response.data);
    } catch {
      toast.error('Failed to fetch treatments');
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:4200/patients');
      setPatients(response.data);
    } catch {
      toast.error('Failed to fetch patients');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const treatmentData = {
        ...formData,
        medications: formData.medications.split(',').map(med => med.trim()).filter(Boolean),
        procedures: formData.procedures.split(',').map(proc => proc.trim()).filter(Boolean),
        doctorId: '507f1f77bcf86cd799439011' // Example doctorId
      };

      if (editingId) {
        await axios.patch(`http://localhost:4200/treatments/${editingId}`, treatmentData);
        toast.success('Treatment updated successfully');
      } else {
        await axios.post('http://localhost:4200/treatments', treatmentData);
        toast.success('Treatment created successfully');
      }

      setFormData({
        patientId: '',
        treatmentName: '',
        description: '',
        diagnosis: '',
        medications: '',
        procedures: '',
        notes: '',
        startDate: '',
        endDate: '',
        status: 'ongoing',
        followUpDate: ''
      });
      setEditingId(null);
      fetchTreatments();
    } catch {
      toast.error('Failed to save treatment');
    }
  };

  const handleEdit = (treatment) => {
    setFormData({
      patientId: treatment.patientId?._id || treatment.patientId || '',
      treatmentName: treatment.treatmentName || '',
      description: treatment.description || '',
      diagnosis: treatment.diagnosis || '',
      medications: treatment.medications?.join(', ') || '',
      procedures: treatment.procedures?.join(', ') || '',
      notes: treatment.notes || '',
      startDate: treatment.startDate ? treatment.startDate.split('T')[0] : '',
      endDate: treatment.endDate ? treatment.endDate.split('T')[0] : '',
      status: treatment.status || 'ongoing',
      followUpDate: treatment.followUpDate ? treatment.followUpDate.split('T')[0] : ''
    });
    setEditingId(treatment._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this treatment?')) return;
    try {
      await axios.delete(`http://localhost:4200/treatments/${id}`);
      toast.success('Treatment deleted successfully');
      fetchTreatments();
    } catch {
      toast.error('Failed to delete treatment');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 border-b-4 border-blue-500 pb-2 inline-block">
        🏥 Treatment Management
      </h2>

      {/* --- Treatment Form --- */}
      <form
        onSubmit={handleSubmit}
        className="mb-10 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <select
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.firstName} {patient.lastName}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="treatmentName"
            placeholder="Treatment Name"
            value={formData.treatmentName}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            name="diagnosis"
            placeholder="Diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="date"
            name="followUpDate"
            value={formData.followUpDate}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            name="medications"
            placeholder="Medications (comma separated)"
            value={formData.medications}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none col-span-2 md:col-span-1"
          />

          <input
            type="text"
            name="procedures"
            placeholder="Procedures (comma separated)"
            value={formData.procedures}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none col-span-2 md:col-span-1"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none col-span-3"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none col-span-3"
          />
        </div>

        <button
          type="submit"
          className={`mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
            editingId
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {editingId ? 'Update Treatment' : 'Create Treatment'}
        </button>
      </form>

      {/* --- Treatment Table --- */}
      {loading ? (
        <p className="text-gray-600">Loading treatments...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="w-full text-sm text-gray-700 border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Treatment</th>
                <th className="p-3">Diagnosis</th>
                <th className="p-3">Status</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {treatments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No treatments found.
                  </td>
                </tr>
              ) : (
                treatments.map((treatment) => (
                  <tr
                    key={treatment._id}
                    className="border-b hover:bg-blue-50 transition-all duration-200"
                  >
                    <td className="p-3">
                      {treatment.patientId?.firstName} {treatment.patientId?.lastName}
                    </td>
                    <td className="p-3">{treatment.treatmentName}</td>
                    <td className="p-3">{treatment.diagnosis}</td>
                    <td className="p-3 capitalize">{treatment.status}</td>
                    <td className="p-3">
                      {treatment.startDate
                        ? new Date(treatment.startDate).toLocaleDateString()
                        : ''}
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(treatment)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md"
                      >
                        Edit
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

export default DoctorTreatment;
