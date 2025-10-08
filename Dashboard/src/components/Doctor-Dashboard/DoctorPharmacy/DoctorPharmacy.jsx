import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    fetchMedicines();
  }, []);

  // ✅ Fetch all medicines
  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4200/pharmacy');
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
      if (editingId) {
        // ✅ Make sure backend accepts PATCH (if not, replace with PUT)
        const response = await axios.put(
          `http://localhost:4200/pharmacy/${editingId}`,
          payload
        );
        if (response.status === 200 || response.status === 204) {
          toast.success('Medicine updated successfully');
        } else {
          toast.warn('Unexpected response while updating');
        }
      } else {
        await axios.post('http://localhost:4200/pharmacy', payload);
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
      await axios.delete(`http://localhost:4200/pharmacy/${id}`);
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-blue-700 mb-8 text-center">
          💊 Pharmacy Management
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mb-10 bg-blue-50 p-6 rounded-xl shadow-inner border border-blue-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="medicineName"
              placeholder="Medicine Name"
              value={formData.medicineName}
              onChange={handleChange}
              required
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="genericName"
              placeholder="Generic Name"
              value={formData.genericName}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="dosage"
              placeholder="Dosage"
              value={formData.dosage}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="form"
              placeholder="Form (Tablet, Syrup, etc.)"
              value={formData.form}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="manufacturer"
              placeholder="Manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="stockQuantity"
              placeholder="Stock Quantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              required
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="expiryDate"
              placeholder="Expiry Date"
              value={formData.expiryDate}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-2 md:col-span-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
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

          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200"
            >
              {editingId ? 'Update Medicine' : 'Add Medicine'}
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

        {/* TABLE */}
        {loading ? (
          <p className="text-center text-gray-600">Loading medicines...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-xl overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">Medicine Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Stock</th>
                  <th className="p-3 text-left">Active</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine, index) => (
                  <tr
                    key={medicine._id}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="p-3 border-t">{medicine.medicineName}</td>
                    <td className="p-3 border-t">{medicine.category}</td>
                    <td className="p-3 border-t text-green-700 font-medium">
                      ₹{medicine.price}
                    </td>
                    <td className="p-3 border-t">{medicine.stockQuantity}</td>
                    <td className="p-3 border-t">
                      {medicine.isActive ? (
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
                        onClick={() => handleEdit(medicine)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(medicine._id)}
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

export default DoctorPharmacy;
