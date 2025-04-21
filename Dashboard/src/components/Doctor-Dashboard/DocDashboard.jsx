import React from "react";
import { FaUserInjured, FaBed } from "react-icons/fa";
import { ImLab } from "react-icons/im";

const Dashboard = () => {
  return (
    <div className="">
      <div className="boxes mx-auto w-full justify-evenly p-5 flex gap-20">
        <div className="box1 text-2xl font-bold text-center flex  border-r-gray-400 border-r-2 pr-10  items-center">
          <FaUserInjured className="text-5xl" />
          <h1 className="">Total Patients</h1>
          <p className="">20</p>
        </div>
        <div className="box3 text-2xl font-bold text-center flex border-r-gray-400 border-r-2 pr-10  items-center ">
          <FaBed className="text-5xl" />
          <h1>Total Wards</h1>
          <p>20</p>
        </div>
        <div className="box4 text-2xl font-bold text-center flex  items-center ">
          <ImLab className="text-5xl" />
          <h1>Total Labs</h1>
          <p>20</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
