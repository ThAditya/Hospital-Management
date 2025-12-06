import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaUserCircle, FaSignOutAlt, FaChevronDown, FaUser, FaClipboardList, FaUsers, FaCalendarCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // Check URL parameters first
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get('token');
      const roleFromUrl = urlParams.get('role');

      let token = localStorage.getItem('token') || tokenFromUrl;
      let role = localStorage.getItem('role') || roleFromUrl;

      console.log("Token from localStorage:", localStorage.getItem('token'));
      console.log("Role from localStorage:", localStorage.getItem('role'));
      console.log("Token from URL:", tokenFromUrl);
      console.log("Role from URL:", roleFromUrl);

      if (tokenFromUrl && roleFromUrl) {
        localStorage.setItem('token', tokenFromUrl);
        localStorage.setItem('role', roleFromUrl);
        token = tokenFromUrl;
        role = roleFromUrl;
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      if (!token || !role) {
        navigate('/login');
        return;
      }

      // try {
      //   const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
      //     headers: { Authorization: `Bearer ${token}` },
      //   });

        try {
          // Use the new dedicated profile endpoint
          const response = await axios.get('https://hospital-management-1-09zh.onrender.com/api/user/profile', { headers: { Authorization: `Bearer ${token}` }, });

        setUser(response.data);
        console.log("Fetched user data:", response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        handleLogout(); 
      }
    };

    fetchUserData();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = 'https://hospital-management-zc8g-kimqukg4r.vercel.app/login';  
  };

  const goTo = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const renderMenuItems = () => {
    if (!user) return null;

    switch (user.role) {
      case 'admin':
        return (
          <>
            <button onClick={() => goTo('/admin/dashboard')} className="menu-item">
              <FaUser /> Admin Dashboard
            </button>
            <button onClick={() => goTo('/admin/manage-users')} className="menu-item">
              <FaUsers /> Manage Users
            </button>
          </>
        );

      case 'doctor':
        return (
          <>
            <button onClick={() => goTo('/doctor/appointments')} className="menu-item">
              <FaCalendarCheck /> My Appointments
            </button>
            <button onClick={() => goTo('/doctor/patients')} className="menu-item">
              <FaUsers /> My Patients
            </button>
          </>
        );

      case 'patient':
      default:
        return (
          <>
            <button onClick={() => goTo('/patient/Profile')} className="menu-item">
              <FaUser /> My Profile
            </button>
      <button onClick={() => goTo('/patient/Bookings')} className="menu-item">
        <FaClipboardList /> My Bookings
      </button>
          </>
        );
    }
  };

  if (!user) return <div className="text-gray-800">Loading profile...</div>;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-300 transition-colors duration-200"
      >
        <FaUserCircle className="w-8 h-8 text-gray-700" />
        <span className="font-semibold text-gray-800 hidden md:block">
          {user.firstName} {user.lastName}
        </span>
        <FaChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-20">
          <div className="p-4 border-b border-gray-200">
            <p className="font-bold text-gray-800">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs mt-1 px-2 py-1 inline-block bg-green-200 rounded text-green-700 font-semibold uppercase">
              {user.role}
            </p>
          </div>

          {/* Role-based menu */}
          <div className="p-2 space-y-1">
            {renderMenuItems()}
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors duration-200 border-t"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
