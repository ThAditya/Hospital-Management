import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4200/ward');
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
      if (editingId) {
        await axios.patch(`http://localhost:4200/ward/${editingId}`, formData);
        toast.success('Ward updated successfully');
      } else {
        await axios.post('http://localhost:4200/ward', formData);
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
      await axios.delete(`http://localhost:4200/ward/${id}`);
      toast.success('Ward deleted successfully');
      fetchWards();
    } catch {
      toast.error('Failed to delete ward');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 border-b-4 border-blue-500 pb-2 inline-block">
        🏥 Ward Management
      </h2>

      {/* --- Ward Form --- */}
      <form
        onSubmit={handleSubmit}
        className="mb-10 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="wardName"
            placeholder="Ward Name"
            value={formData.wardName}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            name="wardType"
            placeholder="Ward Type (General, ICU, etc.)"
            value={formData.wardType}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="number"
            name="totalBeds"
            placeholder="Total Beds"
            value={formData.totalBeds}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="number"
            name="availableBeds"
            placeholder="Available Beds"
            value={formData.availableBeds}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="number"
            name="floor"
            placeholder="Floor"
            value={formData.floor}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <label className="flex items-center space-x-2 col-span-2 md:col-span-1">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-5 w-5 accent-blue-600"
            />
            <span className="font-medium text-gray-700">Active</span>
          </label>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
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
          {editingId ? 'Update Ward' : 'Add Ward'}
        </button>
      </form>

      {/* --- Ward Table --- */}
      {loading ? (
        <p className="text-gray-600">Loading wards...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="w-full text-sm text-gray-700 border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Ward Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Total Beds</th>
                <th className="p-3">Available</th>
                <th className="p-3">Floor</th>
                <th className="p-3">Active</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wards.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No wards found.
                  </td>
                </tr>
              ) : (
                wards.map((ward) => (
                  <tr
                    key={ward._id}
                    className="border-b hover:bg-blue-50 transition-all duration-200"
                  >
                    <td className="p-3 font-medium">{ward.wardName}</td>
                    <td className="p-3">{ward.wardType}</td>
                    <td className="p-3">{ward.totalBeds}</td>
                    <td className="p-3">{ward.availableBeds}</td>
                    <td className="p-3">{ward.floor}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          ward.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {ward.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(ward)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ward._id)}
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

export default DoctorWard;
