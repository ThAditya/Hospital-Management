import React from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  MdDashboardCustomize,
  MdPeopleAlt,
  MdLocalPharmacy,
  MdPersonalInjury,
} from "react-icons/md";
import { FaHouseChimneyMedical, FaHospitalUser } from "react-icons/fa6";
import { BiSolidInjection } from "react-icons/bi";
import DocDashboard from "./DocDashboard";


const Doctor_Sidebar = () => {
  return (
    <div className="flex">
        <div className=" w-[18%] pt-10 bg-green-300">
          {/* <RxHamburgerMenu className="font-bold text-4xl ml-5 h-30" /> */}
          <ul className="pl-8 gap-10 text-2xl font-bold flex flex-col h-screen">
            <li className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center  ">
              {" "}
              <MdDashboardCustomize className="" /> Dashboard
            </li>
            <li className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center">
              {" "}
              <MdPeopleAlt /> Assistants
            </li>
            <li className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center">
              {" "}
              <FaHouseChimneyMedical /> Ward
            </li>
            <li className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center">
              {" "}
              <BiSolidInjection /> Treatment
            </li>
            <li className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center">
              {" "}
              <FaHospitalUser /> Lab
            </li>
            <li className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center">
              {" "}
              <MdLocalPharmacy /> Pharmacy
            </li>
            <li className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center">
              {" "}
              <MdPersonalInjury /> Patient
            </li>
          </ul>
        </div>
      <div className="right w-[85%]" >
        <DocDashboard/>
      </div>
    </div>
  );
};

export default Doctor_Sidebar;
