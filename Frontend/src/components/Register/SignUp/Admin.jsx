// import React, { useState } from "react";
// import Signupnav from "./Signupnav";
// import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaCalendar, FaVenusMars, FaLock, FaMapMarker } from "react-icons/fa";
// // import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // import { useNavigate } from "react-router-dom";

// const Admin = () => {
//   // const navigate = useNavigate();
//   const [date, setDate] = useState("");
//   // const [formData, setFormData] = useState({
//   //   firstName: "",
//   //   lastName: "",
//   //   email: "",
//   //   mobNumber: "",
//   //   AdharCard: "",
//   //   DOB: "",
//   //   Gender: "Gender",
//   //   password: "",
//   //   confirmPassword: "",
//   //   Address: ""
//   // });

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Frontend validation
//     // if (formData.Gender === "Gender") {
//     //   toast.error("Please select a gender");
//     //   return;
//     // }
    
//     // if (formData.password !== formData.confirmPassword) {
//     //   toast.error("Passwords don't match!");
//     //   return;
//     // }

//     // if (formData.password.length < 8) {
//     //   toast.error("Password must be at least 8 characters long");
//     //   return;
//     // }

//     // try {
//       // const client = await MongoClient.connect('mongodb://localhost:27017');
//       // const db = client.db('your-database-name');
      
//       // Check if user already exists
//       // const existingUser = await db.collection('users').findOne({ 
//       //   $or: [
//       //     { email: formData.email },
//       //     { mobNumber: formData.mobNumber },
//       //     { AdharCard: formData.AdharCard }
//       //   ]
//       // });

//       // if (existingUser) {
//       //   client.close();
//       //   toast.error("User with this email, mobile, or Aadhar already exists");
//       //   return;
//       // }

//       // Create new user document
//       // const newUser = {
//       //   firstName: formData.firstName,
//       //   lastName: formData.lastName,
//       //   email: formData.email,
//       //   mobNumber: formData.mobNumber,
//       //   AdharCard: formData.AdharCard,
//       //   DOB: new Date(formData.DOB),
//       //   Gender: formData.Gender,
//       //   password: formData.password, // Note: In production, you should hash this!
//       //   Address: formData.Address,
//       //   role: "admin",
//       //   createdAt: new Date()
//       // };

//       // Insert into MongoDB
//       // const result = await db.collection('users').insertOne(newUser);
//       // client.close();

//       // if (result.insertedId) {
//       //   toast.success("Admin registration successful!");
//       //   navigate("/admin/login");
//       // } else {
//       //   throw new Error("Registration failed");
//       // }
//     // } catch (error) {
//     //   console.error("Registration error:", error);
//     //   toast.error(error.message || "Registration failed. Please try again.");
//     // }
//   };

//   return (
//     <>
//       <img 
//         className="absolute w-full h-[100%] object-cover opacity-30 z-0" 
//         src="/assets/bg.jpg"
//         alt="Background" 
//       />

//       <div className="flex flex-col items-center relative z-10 justify-center">
//         <Signupnav />

//         <div className="bg-white bg-opacity-90 rounded-lg shadow-2xl p-6 w-full max-w-4xl transform transition-all duration-500 hover:shadow-3xl">
//           <div className="heading text-center mb-8">
//             <h1 className="font-bold text-4xl text-blue-900">Admin SignUp</h1>
//             <p className="text-gray-600">Join our healthcare community today!</p>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* First Name */}
//               <div className="Name relative">
//                 <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                 <input
//                   type="text"
//                   className="border-2 border-blue-200 rounded-lg p-3 pl-10 w-full focus:border-blue-500 focus:outline-none"
//                   placeholder="First Name"
//                   required
//                 />
//               </div>

//               {/* Last Name */}
//               <div className="Name relative">
//                 <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                 <input
//                   type="text"
//                   className="border-2 border-blue-200 rounded-lg p-3 pl-10 w-full focus:border-blue-500 focus:outline-none"
//                   placeholder="Last Name"
//                   required
//                 />
//               </div>

//               {/* Email */}
//               <div className="details relative">
//                 <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                 <input
//                   type="email"
//                   className="border-2 border-blue-200 rounded-lg p-3 pl-10 w-full focus:border-blue-500 focus:outline-none"
//                   placeholder="Email"
//                   required
//                   pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
//                 />
//               </div>

//               {/* Mobile Number */}
//               <div className="details relative">
//                 <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                 <input
//                   type="text" 
//                   className="border-2 border-blue-200 rounded-lg p-3 pl-10 w-full focus:border-blue-500 focus:outline-none"
//                   placeholder="Mobile Number"
//                   required
//                   pattern="[0-9]{10}"
//                 />
//               </div>

//               {/* Aadhar Card */}
//               <div className="NIC relative">
//                 <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                 <input
//                   type="text" 
//                   className="border-2 border-blue-200 rounded-lg p-3 pl-10 w-full focus:border-blue-500 focus:outline-none"
//                   placeholder="NIC"
//                   required
//                   pattern="[0-9]{12}"
//                 />
//               </div>

//               {/* Date of Birth */}
//               <div className="relative">
//                 <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                 <input
//                   className="border-2 border-blue-200 text-gray-500 rounded-lg p-3 pl-10 w-full appearance-none focus:border-blue-500 focus:outline-none"
//                   type="date"
//                   name="DOB"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   required
//                   max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
//                 />
//                 {!date && (
//                   <span className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none bg-white px-2">
//                     Date of Birth (18+ years)
//                   </span>
//                 )}
//               </div>

//               {/* Gender */}
//               <div className="password relative">
//                 <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                 <select 
//                   name="Gender"
//                   className="border-2 border-blue-200 rounded-lg p-3 pl-10 w-full focus:border-blue-500 focus:outline-none"
//                   required
//                 >
//                   <option value="Gender">Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               {/* Password */}
//               <div className="password relative">
//                 <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                 <input
//                   type="password"
//                   className="border-2 border-blue-200 rounded-lg p-3 pl-10 w-full focus:border-blue-500 focus:outline-none"
//                   placeholder="Password (min 8 chars)"
//                   required
//                   minLength="8"
//                 />
//               </div>

//               {/* Confirm Password */}
//               {/* <div className="password relative">
//                 <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                 <input
//                   type="password"
//                   className="border-2 border-blue-200 rounded-lg p-3 pl-10 w-full focus:border-blue-500 focus:outline-none"
//                   placeholder="Confirm Password"
//                   required
//                   minLength="8"
//                 />
//               </div> */}

//               {/* Address */}
//               <div className="details relative md:col-span-2">
//                 <FaMapMarker className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                 <input
//                   type="text"
//                   className="border-2 border-blue-200 rounded-lg p-3 pl-10 w-full focus:border-blue-500 focus:outline-none"
//                   placeholder="Address"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="message items-center flex flex-col mt-6">
//               <button
//                 type="submit"
//                 className="p-3 w-55 text-center font-bold bg-blue-600 text-white rounded-lg mt-6 hover:bg-blue-700 transition duration-300 transform hover:scale-105"
//               >
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Admin;