import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUserMd, FaFlask, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const DoctorLab = () => {
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    testName: '',
    description: '',
    category: '',
    price: '',
    preparationInstructions: '',
    estimatedDuration: '',
    isActive: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchLabTests();
  }, []);

  const fetchLabTests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get('https://hospital-management-1-09zh.onrender.com/labs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLabTests(response.data);
    } catch {
      toast.error('Failed to fetch lab tests');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
        await axios.patch(`https://hospital-management-1-09zh.onrender.com/labs/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('✅ Lab test updated successfully');
      } else {
        await axios.post('https://hospital-management-1-09zh.onrender.com/labs', formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('✅ Lab test added successfully');
      }
      setFormData({
        testName: '',
        description: '',
        category: '',
        price: '',
        preparationInstructions: '',
        estimatedDuration: '',
        isActive: true,
      });
      setEditingId(null);
      fetchLabTests();
    } catch {
      toast.error('❌ Failed to save lab test');
    }
  };

  const handleEdit = (test) => {
    setFormData({
      testName: test.testName,
      description: test.description,
      category: test.category,
      price: test.price,
      preparationInstructions: test.preparationInstructions,
      estimatedDuration: test.estimatedDuration,
      isActive: test.isActive,
    });
    setEditingId(test._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lab test?')) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.delete(`https://hospital-management-1-09zh.onrender.com/labs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('🗑️ Lab test deleted successfully');
      fetchLabTests();
    } catch {
      toast.error('❌ Failed to delete lab test');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      testName: '',
      description: '',
      category: '',
      price: '',
      preparationInstructions: '',
      estimatedDuration: '',
      isActive: true,
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          <FaFlask className="text-blue-600" />
          Laboratory Test Management
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
        >
          <FaPlus />
          {showForm ? 'Cancel' : 'Add Lab Test'}
        </button>
      </div>

      {/* Lab Test Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-blue-200"
        >
          <h3 className="text-xl font-semibold mb-4 text-blue-700">
            {editingId ? 'Edit Lab Test' : 'Create New Lab Test'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
              <input
                type="text"
                name="testName"
                placeholder="e.g., Blood Test"
                value={formData.testName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g., Hematology"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                name="price"
                placeholder="e.g., 500"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Duration</label>
              <input
                type="text"
                name="estimatedDuration"
                placeholder="e.g., 2 hours"
                value={formData.estimatedDuration}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Detailed description of the lab test"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Instructions</label>
              <textarea
                name="preparationInstructions"
                placeholder="Instructions for patient preparation"
                value={formData.preparationInstructions}
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
              {editingId ? 'Update Lab Test' : 'Create Lab Test'}
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

      {/* Lab Tests List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-600 text-white">
          <h3 className="text-lg font-semibold">Your Lab Tests</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2">Loading lab tests...</p>
          </div>
        ) : labTests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FaFlask className="text-4xl mx-auto mb-4 text-gray-300" />
            <p>No lab tests found. Create your first lab test!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Test Name</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Duration</th>
                  <th className="p-4 text-left">Active</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {labTests.map((test) => (
                  <tr key={test._id} className="border-b hover:bg-blue-50 transition-all duration-200">
                    <td className="p-4 font-medium">{test.testName}</td>
                    <td className="p-4">{test.category}</td>
                    <td className="p-4 text-green-700 font-medium">₹{test.price}</td>
                    <td className="p-4">{test.estimatedDuration}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        test.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {test.isActive ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => {
                          handleEdit(test);
                          setShowForm(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md flex items-center gap-1 transition-all duration-300"
                      >
                        <FaEdit className="text-xs" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(test._id)}
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

export default DoctorLab;
