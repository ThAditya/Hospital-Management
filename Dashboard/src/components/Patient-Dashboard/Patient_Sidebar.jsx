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
const Patient_Sidebar = () => {
  return (
    <div>
      <div>
        <div className=" w-[18%] pt-10 bg-green-300">
          {/* <RxHamburgerMenu className="font-bold text-4xl ml-5 h-30" /> */}
          <ul className="pl-8 gap-10 text-2xl font-bold h-screen flex flex-col">
            <li className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center  ">
              {" "}
              <MdDashboardCustomize className="" /> Dashboard
            </li>
            <li className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center ">
              {" "}
              <MdPeopleAlt /> Staff
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
      </div>
    </div>
  );
};

export default Patient_Sidebar;
