import React from "react";
import { Link } from 'react-router-dom'

const AdminProfile = () => {
  return (
    <div className=" w-15 h-15 rounded-full ">
      <div className="image">
        <Link className=" items-center">
          <img
            src="assets/logo.jpeg"
            className="rounded-full transform hover:scale-110 transition-transform duration-300"
            style={{ width: "60px" }}
            alt="Profile Image"
          />
        </Link>
      </div>
    </div>
  );
};

export default AdminProfile;
