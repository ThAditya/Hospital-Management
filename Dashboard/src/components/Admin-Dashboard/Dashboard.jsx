import React from "react";
import { FaUserInjured } from "react-icons/fa";
import { FaUserDoctor, FaBed } from "react-icons/fa6";
import { ImLab } from "react-icons/im";
import Chart from "./chart";
import DoctorDetails from "./DoctorDetails";
import Medicine from "./Medicine";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
    
      <div className="boxes mx-auto w-full justify-evenly p-5 flex gap-20">
        <div className="box1 text-2xl font-bold text-center flex hover:shadow-2xl hover:rounded-2xl p-2 cursor-pointer  border-r-gray-400 border-r-2 pr-8  items-center">
        <FaUserInjured className="text-5xl" />
          <h1 className="" >Total Patients</h1>
          <p className="">20</p>
        </div>
        <div className="box2 text-2xl font-bold text-center flex hover:shadow-2xl hover:rounded-2xl p-2 cursor-pointer border-r-gray-400 border-r-2 pr-8  items-center">
            <FaUserDoctor className="text-5xl"/>
          <h1>Total Doctors</h1>
          <p>20</p>
        </div>
        <div className="box3 text-2xl font-bold text-center flex hover:shadow-2xl hover:rounded-2xl p-2 cursor-pointer border-r-gray-400 border-r-2 pr-8  items-center ">
            <FaBed className="text-5xl" />
          <h1>Total Wards</h1>
          <p>20</p>
        </div>
        <div className="box4 text-2xl font-bold hover:shadow-2xl hover:rounded-2xl p-2 cursor-pointer text-center flex  items-center ">
            <ImLab className="text-5xl" />
          <h1>Total Labs</h1>
          <p>20</p>
        </div>
      </div>
      <div className="p-5">
      <Chart/>
        <DoctorDetails/>
        <Medicine/>
      </div>
    </div>
    
  );
};

export default Dashboard;
