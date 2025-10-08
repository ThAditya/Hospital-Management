import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    fetchLabTests();
  }, []);

  const fetchLabTests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4200/lab');
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
      if (editingId) {
        await axios.patch(`http://localhost:4200/lab/${editingId}`, formData);
        toast.success('✅ Lab test updated successfully');
      } else {
        await axios.post('http://localhost:4200/lab', formData);
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
      await axios.delete(`http://localhost:4200/lab/${id}`);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <h2 className="text-3xl font-semibold text-blue-700 mb-8 text-center">
          🧪 Laboratory Test Management
        </h2>

        {/* FORM SECTION */}
        <form
          onSubmit={handleSubmit}
          className="mb-10 bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-inner"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="testName"
              placeholder="Test Name"
              value={formData.testName}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="estimatedDuration"
              placeholder="Estimated Duration (e.g. 2 hours)"
              value={formData.estimatedDuration}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="preparationInstructions"
              placeholder="Preparation Instructions"
              value={formData.preparationInstructions}
              onChange={handleChange}
              className="col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
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

          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200"
            >
              {editingId ? 'Update Test' : 'Add Test'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* TABLE SECTION */}
        {loading ? (
          <p className="text-center text-gray-600">Loading lab tests...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">Test Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Duration</th>
                  <th className="p-3 text-left">Active</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {labTests.map((test, index) => (
                  <tr
                    key={test._id}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="p-3 border-t">{test.testName}</td>
                    <td className="p-3 border-t">{test.category}</td>
                    <td className="p-3 border-t text-green-700 font-medium">
                      ₹{test.price}
                    </td>
                    <td className="p-3 border-t">{test.estimatedDuration}</td>
                    <td className="p-3 border-t">
                      {test.isActive ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                          No
                        </span>
                      )}
                    </td>
                    <td className="p-3 border-t text-center space-x-2">
                      <button
                        onClick={() => handleEdit(test)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(test._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-sm transition"
                      >
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
