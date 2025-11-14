import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="bg-gradient-to-r from-green-200 to-blue-200 shadow-lg p-2 flex justify-around items-center">
        <div>
          <Link className="flex gap-4 items-center" to="/">
            <img
              src="assets/logo.jpeg"
              className="rounded-full transform hover:scale-110 transition-transform duration-300"
              style={{ width: "60px" }}
              alt="logo"
            />
            <span className="text-gray-800 text-lg font-bold hover:text-gray-600 transition-colors duration-300">
              MediSphere Hospital
            </span>
          </Link>
        </div>
        <ul className="flex gap-6 text-gray-800">
          <li>
            <Link
              className="hover:bg-white hover:text-green-600 p-2 rounded-xl transition-colors duration-300"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:bg-white hover:text-green-600 p-2 rounded-xl transition-colors duration-300"
              to="/AboutUs"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              className="hover:bg-white hover:text-green-600 p-2 rounded-xl transition-colors duration-300"
              to="/Appointment"
            >
              Appointment
            </Link>
          </li>
          <li>
            <Link
              className="hover:bg-white hover:text-green-600 p-2 rounded-xl transition-colors duration-300"
              to="/ContactUs"
            >
              Contact Us
            </Link>
          </li>
          
        </ul>
        <div className="register flex gap-5">
          <Link
            className="p-2 w-25 text-center font-bold bg-white text-green-600 rounded-2xl hover:bg-gray-100 transition-colors duration-300"
            to="/login"
          >
            Sign In
          </Link>
          <Link
            className="p-2 w-25 text-center text-white bg-green-600 font-bold rounded-2xl hover:bg-green-500 transition-colors duration-300"
            to="/Register/Patient"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;