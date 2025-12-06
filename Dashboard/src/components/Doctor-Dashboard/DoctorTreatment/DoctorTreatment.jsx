import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUserMd, FaCalendarAlt, FaNotesMedical, FaPills, FaProcedures, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const DoctorTreatment = () => {
  const [treatments, setTreatments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doctorId, setDoctorId] = useState(null);
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
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchDoctorProfile();
    fetchPatients();
  }, []);

  useEffect(() => {
    if (doctorId) {
      fetchTreatments();
    }
  }, [doctorId]);

  const fetchDoctorProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get('https://hospital-management-1-09zh.onrender.com/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDoctorId(response.data._id);
    } catch {
      toast.error('Failed to fetch doctor profile');
    }
  };

  const fetchTreatments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get(`https://hospital-management-1-09zh.onrender.com/api/treatments/doctor/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTreatments(response.data);
    } catch {
      toast.error('Failed to fetch treatments');
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get('https://hospital-management-1-09zh.onrender.com/api/patients', {
        headers: { Authorization: `Bearer ${token}` }
      });
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
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const treatmentData = {
        ...formData,
        medications: formData.medications.split(',').map(med => med.trim()).filter(Boolean),
        procedures: formData.procedures.split(',').map(proc => proc.trim()).filter(Boolean),
        doctorId
      };

      if (editingId) {
        await axios.patch(`https://hospital-management-1-09zh.onrender.com/api/treatments/${editingId}`, treatmentData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Treatment updated successfully');
      } else {
        await axios.post('https://hospital-management-1-09zh.onrender.com/api/treatments', treatmentData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Treatment created successfully');
      }

      resetForm();
      fetchTreatments();
    } catch {
      toast.error('Failed to save treatment');
    }
  };

  const resetForm = () => {
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
    setShowForm(false);
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
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this treatment?')) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.delete(`https://hospital-management-1-09zh.onrender.com/api/treatments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Treatment deleted successfully');
      fetchTreatments();
    } catch {
      toast.error('Failed to delete treatment');
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          <FaUserMd className="text-blue-600" />
          Treatment Management
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
        >
          <FaPlus />
          {showForm ? 'Cancel' : 'Add Treatment'}
        </button>
      </div>

      {/* Treatment Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-blue-200"
        >
          <h3 className="text-xl font-semibold mb-4 text-blue-700">
            {editingId ? 'Edit Treatment' : 'Create New Treatment'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Name</label>
              <input
                type="text"
                name="treatmentName"
                placeholder="e.g., Physical Therapy"
                value={formData.treatmentName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
              <input
                type="text"
                name="diagnosis"
                placeholder="e.g., Sprained Ankle"
                value={formData.diagnosis}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <FaCalendarAlt className="text-gray-500" />
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <FaPills className="text-gray-500" />
                Medications
              </label>
              <input
                type="text"
                name="medications"
                placeholder="e.g., Ibuprofen, Paracetamol (comma separated)"
                value={formData.medications}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <FaProcedures className="text-gray-500" />
                Procedures
              </label>
              <input
                type="text"
                name="procedures"
                placeholder="e.g., X-ray, Physiotherapy (comma separated)"
                value={formData.procedures}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Detailed description of the treatment plan"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <FaNotesMedical className="text-gray-500" />
                Notes
              </label>
              <textarea
                name="notes"
                placeholder="Additional notes or observations"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
                editingId
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {editingId ? 'Update Treatment' : 'Create Treatment'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Treatments List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-600 text-white">
          <h3 className="text-lg font-semibold">Your Treatments</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2">Loading treatments...</p>
          </div>
        ) : treatments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FaNotesMedical className="text-4xl mx-auto mb-4 text-gray-300" />
            <p>No treatments found. Create your first treatment!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Patient</th>
                  <th className="p-4 text-left">Treatment</th>
                  <th className="p-4 text-left">Diagnosis</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Start Date</th>
                  <th className="p-4 text-left">End Date</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {treatments.map((treatment) => (
                  <tr key={treatment._id} className="border-b hover:bg-blue-50 transition-all duration-200">
                    <td className="p-4">
                      <div className="font-medium">
                        {treatment.patientId?.firstName} {treatment.patientId?.lastName}
                      </div>
                      <div className="text-xs text-gray-500">{treatment.patientId?.email}</div>
                    </td>
                    <td className="p-4 font-medium">{treatment.treatmentName}</td>
                    <td className="p-4">{treatment.diagnosis}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        treatment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        treatment.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {treatment.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {treatment.startDate ? new Date(treatment.startDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4">
                      {treatment.endDate ? new Date(treatment.endDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleEdit(treatment)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md flex items-center gap-1 transition-all duration-300"
                      >
                        <FaEdit className="text-xs" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(treatment._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1 transition-all duration-300"
                      >
                        <FaTrash className="text-xs" />
                        Delete
                      </button>
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

export default DoctorTreatment;
