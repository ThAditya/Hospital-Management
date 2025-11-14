import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link className="flex gap-4 items-center mb-4" to="/">
              <img
                src="assets/logo.jpeg"
                className="rounded-full"
                style={{ width: "60px" }}
                alt="logo"
              />
              <span className="text-xl font-bold">MediSphere Hospital</span>
            </Link>
            <p className="text-gray-300 text-center md:text-left">
              Your trusted healthcare partner, providing quality medical services with compassion and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  to="/AboutUs"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  to="/Appointment"
                >
                  Appointment
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  to="/ContactUs"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-lg mb-4">Hours</h4>
            <ul className="text-gray-300 space-y-1">
              <li>Monday - Friday: 8:00 AM - 8:00 PM</li>
              <li>Saturday: 9:00 AM - 5:00 PM</li>
              <li>Sunday: Emergency Only</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="text-gray-300 space-y-2">
              <li>📞 +1 (555) 123-4567</li>
              <li>📧 info@medisphere.com</li>
              <li>📍 123 Health Street, Medical City</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-300">
            © 2024 MediSphere Hospital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
