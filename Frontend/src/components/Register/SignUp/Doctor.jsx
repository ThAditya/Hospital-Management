import React, { useState } from "react";
import axios from "axios";
import Signupnav from "./Signupnav";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaCalendar,
  FaVenusMars,
  FaLock,
  FaBook,
} from "react-icons/fa";


const Doctor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobNumber: "",
    nic: "",
    gender: "",
    DOB: "",
    specialty: "",
    experience: "",
    role: "doctor",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.mobNumber.trim()) newErrors.mobNumber = "Mobile number is required";
    if (!formData.nic.trim()) newErrors.nic = "NIC is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.DOB) newErrors.DOB = "Date of birth is required";
    if (!formData.specialty.trim()) newErrors.specialty = "Specialty is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('https://hospital-management-1-09zh.onrender.com/api/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true // If using cookies/sessions
      });
  
      console.log("Registration successful:", response.data);
      setRegistrationSuccess(true);
      
      // Reset form after successful registration
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobNumber: "",
        nic: "",
        gender: "",
        DOB: "",
        specialty: "",
        experience: "",
        role: "doctor",
        password: "",
      });


      
      navigate("../Login");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        alert(error.response.data.message || "Registration failed");
      } else if (error.request) {
        // The request was made but no response was received
        alert("No response from server");
      } else {
        // Something happened in setting up the request
        alert("Request error: " + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <img
        className="absolute w-full h-full object-cover opacity-30 z-0"
        src="/assets/bg.jpg"
        alt="Background"
      />
      <div className="flex flex-col items-center relative z-10 justify-center">
        <Signupnav />

        <div className="bg-white bg-opacity-90 rounded-lg shadow-2xl p-6 w-full max-w-4xl transform transition-all duration-500 hover:shadow-3xl">
          <div className="heading text-center mb-8">
            <h1 className="font-bold text-4xl text-blue-900">Doctor SignUp</h1>
            <p className="text-gray-600">
              Join our healthcare community today!
            </p>
          </div>

          {registrationSuccess && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
              Registration successful! Doctor account has been created.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="Name relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`border-2 ${errors.firstName ? 'border-red-500' : 'border-blue-200'} rounded-lg p-4 pl-10 w-full focus:border-blue-500 focus:outline-none transition-all duration-300`}
                  placeholder="First Name"
                />
                {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
              </div>

              {/* Last Name */}
              <div className="Name relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`border-2 ${errors.lastName ? 'border-red-500' : 'border-blue-200'} rounded-lg p-4 pl-10 w-full focus:border-blue-500 focus:outline-none transition-all duration-300`}
                  placeholder="Last Name"
                />
                {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
              </div>

              {/* Email */}
              <div className="details relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`border-2 ${errors.email ? 'border-red-500' : 'border-blue-200'} rounded-lg p-4 pl-10 w-full focus:border-blue-500 focus:outline-none transition-all duration-300`}
                  placeholder="Email"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>

              {/* Mobile Number */}
              <div className="details relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  type="tel"
                  name="mobNumber"
                  value={formData.mobNumber}
                  onChange={handleChange}
                  className={`border-2 ${errors.mobNumber ? 'border-red-500' : 'border-blue-200'} rounded-lg p-4 pl-10 w-full focus:border-blue-500 focus:outline-none transition-all duration-300`}
                  placeholder="Mobile Number"
                />
                {errors.mobNumber && <span className="text-red-500 text-sm">{errors.mobNumber}</span>}
              </div>

              {/* NIC */}
              <div className="NIC relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  className={`border-2 ${errors.nic ? 'border-red-500' : 'border-blue-200'} rounded-lg p-4 pl-10 w-full focus:border-blue-500 focus:outline-none transition-all duration-300`}
                  placeholder="NIC"
                />
                {errors.nic && <span className="text-red-500 text-sm">{errors.nic}</span>}
              </div>

              {/* Date of Birth */}
              <div className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  className={`border-2 ${errors.DOB ? 'border-red-500' : 'border-blue-200'} text-gray-500 rounded-lg p-4 pl-10 w-full appearance-none focus:border-blue-500 focus:outline-none transition-all duration-300`}
                  type="date"
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleChange}
                  placeholder="Date of Birth"
                />
                {!formData.DOB && (
                  <span className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none bg-white px-2">
                    {/* Date of Birth */}
                  </span>
                )}
                {errors.DOB && <span className="text-red-500 text-sm">{errors.DOB}</span>}
              </div>

              {/* Specialty */}
              <div className="details relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <FaBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className={`border-2 ${errors.specialty ? 'border-red-500' : 'border-blue-200'} rounded-lg p-4 pl-10 w-full focus:border-blue-500 focus:outline-none transition-all duration-300`}
                  placeholder="Specialty"
                />
                {errors.specialty && <span className="text-red-500 text-sm">{errors.specialty}</span>}
              </div>

              {/* Experience */}
              <div className="Experience relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <FaBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`border-2 ${errors.experience ? 'border-red-500' : 'border-blue-200'} rounded-lg p-4 pl-10 w-full focus:border-blue-500 focus:outline-none transition-all duration-300`}
                  placeholder="Experience"
                />
                {errors.experience && <span className="text-red-500 text-sm">{errors.experience}</span>}
              </div>

              {/* Gender */}
              <div className="password relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`border-2 ${errors.gender ? 'border-red-500' : 'border-blue-200'} rounded-lg p-4 pl-10 w-full focus:border-blue-500 focus:outline-none transition-all duration-300`}
                >
                  <option value="" disabled>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
              </div>

              {/* Password */}
              <div className="password relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`border-2 ${errors.password ? 'border-red-500' : 'border-blue-200'} rounded-lg p-4 pl-10 w-full focus:border-blue-500 focus:outline-none transition-all duration-300`}
                  placeholder="Password"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>
            </div>

            <div className="message items-center flex mb-5 flex-col">
              <button
                type="submit"
                className="p-3 w-55 text-center font-bold bg-blue-600 text-white rounded-lg mt-6 hover:bg-blue-700 transition duration-300 transform hover:scale-105 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Doctor;