import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobNumber: '',
    gender: '',
    NIC: '',
    dob: '',
    role: '',
    department: '',
    salary: '',
    hireDate: '',
    address: '',
    password: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4200/staff');
      setStaffList(response.data);
    } catch {
      toast.error('Failed to fetch staff list');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.patch(`http://localhost:4200/staff/${editingId}`, formData);
        toast.success('Staff updated successfully');
      } else {
        await axios.post('http://localhost:4200/staff', formData);
        toast.success('Staff added successfully');
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobNumber: '',
        gender: '',
        NIC: '',
        dob: '',
        role: '',
        department: '',
        salary: '',
        hireDate: '',
        address: '',
        password: ''
      });
      setEditingId(null);
      fetchStaff();
    } catch {
      toast.error('Failed to save staff');
    }
  };

  const handleEdit = (staff) => {
    setFormData({ ...staff, password: '' });
    setEditingId(staff._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;
    try {
      await axios.delete(`http://localhost:4200/staff/${id}`);
      toast.success('Staff deleted successfully');
      fetchStaff();
    } catch {
      toast.error('Failed to delete staff');
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Staff Management</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" name="mobNumber" placeholder="Mobile Number" value={formData.mobNumber} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" name="NIC" placeholder="NIC" value={formData.NIC} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob ? formData.dob.split('T')[0] : ''} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="date" name="hireDate" placeholder="Hire Date" value={formData.hireDate ? formData.hireDate.split('T')[0] : ''} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required={!editingId} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition-colors duration-300">
          {editingId ? 'Update Staff' : 'Add Staff'}
        </button>
      </form>

      {loading ? (
        <p>Loading staff...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="border border-gray-300 p-3 text-left">Name</th>
              <th className="border border-gray-300 p-3 text-left">Email</th>
              <th className="border border-gray-300 p-3 text-left">Department</th>
              <th className="border border-gray-300 p-3 text-left">Role</th>
              <th className="border border-gray-300 p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map(staff => (
              <tr key={staff._id} className="hover:bg-green-50 transition-colors duration-200">
                <td className="border border-gray-300 p-3">{staff.firstName} {staff.lastName}</td>
                <td className="border border-gray-300 p-3">{staff.email}</td>
                <td className="border border-gray-300 p-3">{staff.department}</td>
                <td className="border border-gray-300 p-3">{staff.role}</td>
                <td className="border border-gray-300 p-3 space-x-2">
                  <button onClick={() => handleEdit(staff)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-colors duration-300">Edit</button>
                  <button onClick={() => handleDelete(staff._id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors duration-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorStaff;
