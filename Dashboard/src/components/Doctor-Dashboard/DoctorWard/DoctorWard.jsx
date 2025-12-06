import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUserMd, FaBed, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const DoctorWard = () => {
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    wardName: '',
    wardType: '',
    totalBeds: '',
    availableBeds: '',
    floor: '',
    description: '',
    isActive: true
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get('https://hospital-management-1-09zh.onrender.com/api/wards', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWards(response.data);
    } catch {
      toast.error('Failed to fetch wards');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      if (editingId) {
        await axios.patch(`https://hospital-management-1-09zh.onrender.com/api/wards/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Ward updated successfully');
      } else {
        await axios.post('https://hospital-management-1-09zh.onrender.com/api/wards', formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Ward added successfully');
      }
      setFormData({
        wardName: '',
        wardType: '',
        totalBeds: '',
        availableBeds: '',
        floor: '',
        description: '',
        isActive: true
      });
      setEditingId(null);
      fetchWards();
    } catch {
      toast.error('Failed to save ward');
    }
  };

  const handleEdit = (ward) => {
    setFormData({
      wardName: ward.wardName || '',
      wardType: ward.wardType || '',
      totalBeds: ward.totalBeds || '',
      availableBeds: ward.availableBeds || '',
      floor: ward.floor || '',
      description: ward.description || '',
      isActive: ward.isActive || false
    });
    setEditingId(ward._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ward?')) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.delete(`https://hospital-management-1-09zh.onrender.com/api/wards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Ward deleted successfully');
      fetchWards();
    } catch {
      toast.error('Failed to delete ward');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      wardName: '',
      wardType: '',
      totalBeds: '',
      availableBeds: '',
      floor: '',
      description: '',
      isActive: true,
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          <FaBed className="text-blue-600" />
          Ward Management
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
        >
          <FaPlus />
          {showForm ? 'Cancel' : 'Add Ward'}
        </button>
      </div>

      {/* Ward Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-blue-200"
        >
          <h3 className="text-xl font-semibold mb-4 text-blue-700">
            {editingId ? 'Edit Ward' : 'Create New Ward'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ward Name</label>
              <input
                type="text"
                name="wardName"
                placeholder="e.g., General Ward A"
                value={formData.wardName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ward Type</label>
              <input
                type="text"
                name="wardType"
                placeholder="e.g., General, ICU, Emergency"
                value={formData.wardType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Beds</label>
              <input
                type="number"
                name="totalBeds"
                placeholder="e.g., 20"
                value={formData.totalBeds}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Beds</label>
              <input
                type="number"
                name="availableBeds"
                placeholder="e.g., 15"
                value={formData.availableBeds}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
              <input
                type="number"
                name="floor"
                placeholder="e.g., 1"
                value={formData.floor}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Detailed description of the ward"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-4">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="mr-2"
              />
              Active
            </label>
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
              {editingId ? 'Update Ward' : 'Create Ward'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                handleCancelEdit();
              }}
              className="px-6 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Wards List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-600 text-white">
          <h3 className="text-lg font-semibold">Your Wards</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2">Loading wards...</p>
          </div>
        ) : wards.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FaBed className="text-4xl mx-auto mb-4 text-gray-300" />
            <p>No wards found. Create your first ward!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Ward Name</th>
                  <th className="p-4 text-left">Type</th>
                  <th className="p-4 text-left">Total Beds</th>
                  <th className="p-4 text-left">Available Beds</th>
                  <th className="p-4 text-left">Floor</th>
                  <th className="p-4 text-left">Active</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wards.map((ward) => (
                  <tr key={ward._id} className="border-b hover:bg-blue-50 transition-all duration-200">
                    <td className="p-4 font-medium">{ward.wardName}</td>
                    <td className="p-4">{ward.wardType}</td>
                    <td className="p-4 text-blue-700 font-medium">{ward.totalBeds}</td>
                    <td className="p-4 text-green-700 font-medium">{ward.availableBeds}</td>
                    <td className="p-4">{ward.floor}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ward.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {ward.isActive ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => {
                          handleEdit(ward);
                          setShowForm(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md flex items-center gap-1 transition-all duration-300"
                      >
                        <FaEdit className="text-xs" />
                        Edit
                      </button>
                      <br/>
                      <button
                        onClick={() => handleDelete(ward._id)}
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

export default DoctorWard;
