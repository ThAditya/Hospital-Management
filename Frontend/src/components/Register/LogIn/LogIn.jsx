import React, { useState } from "react";
import axios from "axios";


const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempt started");

    try {
      const response = await axios.post("http://localhost:4200/api/login", {
        email,
        password
      });

      const { role, token } = response.data;

      // Store token and role for later use
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      console.log("Token:", token);

      // Redirect user based on their role with token and role in URL
      const encodedToken = encodeURIComponent(token);
      const encodedRole = encodeURIComponent(role);
      if (role === "admin") {
        window.location.href=`http://localhost:5173/Admin?token=${encodedToken}&role=${encodedRole}`;
      }
       else if (role === "doctor") {
        window.location.href=`http://localhost:5173/doctor?token=${encodedToken}&role=${encodedRole}`;
      }
       else if (role === "patient") {
        window.location.href=`http://localhost:5173/patient?token=${encodedToken}&role=${encodedRole}`;
      }
      else {
        alert("Unknown role, access denied.");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <img
        className="absolute w-full h-[100%] object-cover opacity-30 z-0"
        src="/assets/bg.jpg"
        alt="Background"
      />
      <div className="flex flex-col items-center relative z-10 justify-center min-h-screen">
        <div className="z-10 bg-white bg-opacity-90 rounded-lg shadow-2xl p-6 w-full max-w-md transform transition-all duration-500 hover:shadow-3xl">
          <h1 className="font-bold text-4xl text-blue-900 mb-8 text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="border-2 border-blue-200 rounded-lg p-4 w-full focus:border-blue-500 focus:outline-none transition-all duration-300"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="border-2 border-blue-200 rounded-lg p-4 w-full focus:border-blue-500 focus:outline-none transition-all duration-300"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="p-3 w-55 text-center font-bold bg-blue-600 text-white rounded-lg mt-6 hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default LogIn;