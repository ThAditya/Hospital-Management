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

const Doctor_Sidebar = () => {
  return (
    <div className="flex">
      <div className=" pt-10 bg-green-300">
        <ul className="pl-8 pr-24 gap-10 text-2xl font-bold flex flex-col h-screen">
          <li className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center  ">
            <Link
              className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center"
              to="/doctor"
            >
              <MdDashboardCustomize className="" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center"
              to="/doctor/assistants"
            >
              <MdPeopleAlt /> Assistants
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center"
              to="/doctor/ward"
            >
              <FaHouseChimneyMedical /> Ward
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center"
              to="/doctor/treatment"
            >
              <BiSolidInjection /> Treatment
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center"
              to="/doctor/lab"
            >
              <FaHospitalUser /> Lab
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center"
              to="/doctor/pharmacy"
            >
              <MdLocalPharmacy /> Pharmacy
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center"
              to="/doctor/patient"
            >
              <MdPersonalInjury /> Patient
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Doctor_Sidebar;
