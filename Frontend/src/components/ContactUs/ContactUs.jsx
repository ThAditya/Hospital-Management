import React, { useState } from "react";
import { MdEmail } from 'react-icons/md';
import { FaLinkedin, FaGithub, FaQuoteLeft } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ContactUs = () => {
  const employees = [
    {
      id: 1,
      name: "Bhakti Sharma",
      role: "Product Manager",
      image: "assets/bhakti.webp",
      email: "mailto:bhaktisharma100@gmail.com",
      github: "https://github.com/bhaktisharma2004",
      linkedIn: "https://linkedin.com/in/bhakti",
      quote: "Building products that users love"
    },
    {
      id: 2,
      name: "Pratiksha Pathak",
      role: "Full Stack Developer",
      image: "assets/Pratiksha1.png",
      email: "mailto:pratikshapathak430@gmail.com",
      github: "https://github.com/pratiksha-pathak2005",
      linkedIn: "https://www.linkedin.com/in/pratiksha-pathak-b0053b24b",
      quote: "Coding the future one line at a time"
    },
    {
      id: 3,
      name: "Radhika Jadaun",
      role: "UI/UX Designer",
      image: "assets/radhika.webp",
      email: "mailto:radhikajadaun36@gmail.com",
      github: "https://github.com/radhika",
      linkedIn: "https://www.linkedin.com/in/radhika-jadaun-9a7113312",
      quote: "Design is where science and art break even"
    },
    {
      id: 4,
      name: "Akash Agarwal",
      role: "Data Scientist",
      image: "assets/Akash1.png",
      email: "mailto:honeyagarwal043@gmail.com",
      github: "https://github.com/itsakashagrawal",
      linkedIn: "https://www.linkedin.com/in/akash-agarwal-a280692a0",
      quote: "Transforming data into actionable insights"
    },
    {
      id: 5,
      name: "Aditya Vashishth",
      role: "Data Scientist",
      image: "assets/Aditya.png",
      email: "mailto:aditya.vashishth95@gmail.com",
      github: "https://github.com/ThAditya",
      linkedIn: "https://www.linkedin.com/in/aditya-vashishth-9547182a9",
      quote: "Numbers tell stories, I just translate them"
    },
  ];

  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-green-50 py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-indigo-600 mb-4">
          Meet Our Team
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The creative minds behind our success. Get to know us and reach out - we'd love to connect!
        </p>
      </motion.div>

      <div className="flex flex-wrap  justify-center gap-8 max-w-6xl mx-auto">
        {employees.map((e) => (
          <motion.div 
            key={e.id}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setHovered(e.id)}
            onMouseLeave={() => setHovered(null)}
            className="relative w-80 h-96 rounded-xl overflow-hidden shadow-lg"
          >
            {/* Team member image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <img 
              src={e.image} 
              alt={e.name}
              className="w-full h-full object-cover"
            />
            
            {/* Always visible info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-white text-xl font-bold">{e.name}</h3>
              <p className="text-green-200">{e.role}</p>
            </div>
            
            {/* Hover overlay */}
            {hovered === e.id && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center p-6 z-30"
              >
                <FaQuoteLeft className="text-green-400 mb-4 text-2xl" />
                <p className="text-white italic text-center mb-6">{e.quote}</p>
                
                <div className="flex gap-4">
                  <motion.a 
                    whileHover={{ scale: 1.2 }}
                    href={e.email}
                    className="text-white hover:text-green-300 transition-colors"
                    aria-label="Email"
                  >
                    <MdEmail className="h-6 w-6" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.2 }}
                    href={e.linkedIn}
                    className="text-white hover:text-blue-400 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="h-6 w-6" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.2 }}
                    href={e.github}
                    className="text-white hover:text-gray-300 transition-colors"
                    aria-label="GitHub"
                  >
                    <FaGithub className="h-6 w-6" />
                  </motion.a>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium"
                >
                  View Profile
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Contact form section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-24 max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:w-1/2 bg-gradient-to-br from-green-600 to-indigo-600 p-10 text-white">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="mb-6">Have a project in mind or want to collaborate? We'd love to hear from you!</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <MdEmail className="mr-3 text-xl" />
                <span>team@example.com</span>
              </div>
              <div className="flex items-center">
                <FaLinkedin className="mr-3 text-xl" />
                <span>linkedin.com/company</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-10">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;