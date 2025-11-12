import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUserMd, FaCalendarAlt, FaNotesMedical, FaPills, FaProcedures, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const DoctorPharmacy = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    medicineName: '',
    genericName: '',
    category: '',
    dosage: '',
    form: '',
    manufacturer: '',
    price: '',
    stockQuantity: '',
    expiryDate: '',
    prescriptionRequired: false,
    description: '',
    isActive: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, []);

  // ✅ Fetch all medicines
  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get('http://localhost:4200/pharmacy', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMedicines(response.data);
    } catch (error) {
      toast.error('Failed to fetch medicines');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Form input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // ✅ Edit existing medicine
  const handleEdit = (medicine) => {
    setFormData({
      medicineName: medicine.medicineName || '',
      genericName: medicine.genericName || '',
      category: medicine.category || '',
      dosage: medicine.dosage || '',
      form: medicine.form || '',
      manufacturer: medicine.manufacturer || '',
      price: medicine.price || '',
      stockQuantity: medicine.stockQuantity || '',
      expiryDate: medicine.expiryDate
        ? medicine.expiryDate.split('T')[0]
        : '',
      prescriptionRequired: medicine.prescriptionRequired || false,
      description: medicine.description || '',
      isActive: medicine.isActive ?? true,
    });
    setEditingId(medicine._id);
  };

  // ✅ Add or Update Medicine
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      if (editingId) {
        // ✅ Make sure backend accepts PATCH (if not, replace with PUT)
        const response = await axios.put(
          `http://localhost:4200/pharmacy/${editingId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status === 200 || response.status === 204) {
          toast.success('Medicine updated successfully');
        } else {
          toast.warn('Unexpected response while updating');
        }
      } else {
        await axios.post('http://localhost:4200/pharmacy', payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Medicine added successfully');
      }

      // ✅ Reset form
      setFormData({
        medicineName: '',
        genericName: '',
        category: '',
        dosage: '',
        form: '',
        manufacturer: '',
        price: '',
        stockQuantity: '',
        expiryDate: '',
        prescriptionRequired: false,
        description: '',
        isActive: true,
      });
      setEditingId(null);
      fetchMedicines();
    } catch (error) {
      console.error('Error while saving/updating:', error);
      toast.error('Failed to save or update medicine');
    }
  };

  // ✅ Delete medicine
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this medicine?'))
      return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.delete(`http://localhost:4200/pharmacy/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Medicine deleted successfully');
      fetchMedicines();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete medicine');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      medicineName: '',
      genericName: '',
      category: '',
      dosage: '',
      form: '',
      manufacturer: '',
      price: '',
      stockQuantity: '',
      expiryDate: '',
      prescriptionRequired: false,
      description: '',
      isActive: true,
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          <FaUserMd className="text-blue-600" />
          Pharmacy Management
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
        >
          <FaPlus />
          {showForm ? 'Cancel' : 'Add Medicine'}
        </button>
      </div>

      {/* Medicine Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-blue-200"
        >
          <h3 className="text-xl font-semibold mb-4 text-blue-700">
            {editingId ? 'Edit Medicine' : 'Create New Medicine'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
              <input
                type="text"
                name="medicineName"
                placeholder="e.g., Paracetamol"
                value={formData.medicineName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Generic Name</label>
              <input
                type="text"
                name="genericName"
                placeholder="e.g., Acetaminophen"
                value={formData.genericName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g., Pain Relief"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
              <input
                type="text"
                name="dosage"
                placeholder="e.g., 500mg"
                value={formData.dosage}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Form</label>
              <input
                type="text"
                name="form"
                placeholder="e.g., Tablet, Syrup"
                value={formData.form}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                placeholder="e.g., Pfizer"
                value={formData.manufacturer}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                name="price"
                placeholder="e.g., 50"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                placeholder="e.g., 100"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <FaCalendarAlt className="text-gray-500" />
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Detailed description of the medicine"
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
                name="prescriptionRequired"
                checked={formData.prescriptionRequired}
                onChange={handleChange}
                className="mr-2"
              />
              Prescription Required
            </label>
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
              {editingId ? 'Update Medicine' : 'Create Medicine'}
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

      {/* Medicines List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-600 text-white">
          <h3 className="text-lg font-semibold">Your Medicines</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2">Loading medicines...</p>
          </div>
        ) : medicines.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FaPills className="text-4xl mx-auto mb-4 text-gray-300" />
            <p>No medicines found. Create your first medicine!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Medicine Name</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Stock</th>
                  <th className="p-4 text-left">Active</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine) => (
                  <tr key={medicine._id} className="border-b hover:bg-blue-50 transition-all duration-200">
                    <td className="p-4 font-medium">{medicine.medicineName}</td>
                    <td className="p-4">{medicine.category}</td>
                    <td className="p-4 text-green-700 font-medium">₹{medicine.price}</td>
                    <td className="p-4">{medicine.stockQuantity}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        medicine.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {medicine.isActive ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => {
                          handleEdit(medicine);
                          setShowForm(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md flex items-center gap-1 transition-all duration-300"
                      >
                        <FaEdit className="text-xs" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(medicine._id)}
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

export default DoctorPharmacy;
