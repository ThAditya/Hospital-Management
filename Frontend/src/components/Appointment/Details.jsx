import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Details = ({ heading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobNumber: '',
    email: '',
    NIC: '',
    dob: '',
    gender: '',
    department: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    address: '',
    notes: ''
  });

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const filteredDoctors = formData.department
    ? doctors.filter(doctor => doctor.specialty.toLowerCase() === formData.department.toLowerCase())
    : doctors;

  const today = new Date().toISOString().split('T')[0];

  const departments = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'Radiology',
    'Emergency',
    'General Medicine'
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:4200/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to load doctors list');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // If department changes, reset doctor selection
    if (name === 'department') {
      setFormData(prev => ({
        ...prev,
        doctorId: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirmation before submitting
    if (!window.confirm('Are you sure you want to book this appointment with the provided details?')) {
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:4200/api/appointments', formData);
      toast.success('Appointment booked successfully!');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        mobNumber: '',
        email: '',
        NIC: '',
        dob: '',
        gender: '',
        department: '',
        doctorId: '',
        appointmentDate: '',
        appointmentTime: '',
        address: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto w-full flex flex-col mb-20'>
      <div className="heading font-bold text-gray-500 mb-13 text-6xl">
        <h1>{heading}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="mobNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
              type="tel"
              id="mobNumber"
              name="mobNumber"
              placeholder="Enter your mobile number"
              pattern="[0-9]{10}"
              value={formData.mobNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="NIC" className="block text-sm font-medium text-gray-700 mb-1">NIC (National Identity Card)</label>
            <input
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
              type="text"
              id="NIC"
              name="NIC"
              placeholder="Enter your NIC number"
              value={formData.NIC}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              max={today}
              required
            />
          </div>
        </div>

        {/* Appointment Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              className="border border-gray-300 text-gray-700 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
            <input
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              min={today}
              required
            />
          </div>
          <div>
            <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700 mb-1">Appointment Time</label>
            <input
              className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              className='border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-1">Preferred Doctor</label>
            <select
              className='border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
            >
              <option value="">Select Doctor (Optional)</option>
              {filteredDoctors.map(doctor => (
                <option key={doctor._id} value={doctor._id}>
                  Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              className='border border-gray-300 rounded-lg w-full h-24 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
              id="address"
              name="address"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea
              className='border border-gray-300 rounded-lg w-full h-20 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
              id="notes"
              name="notes"
              placeholder="Any additional information or notes (optional)"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className='px-6 py-3 text-center font-bold bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-400 transition duration-200'
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Details;