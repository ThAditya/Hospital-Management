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



const Admin_Sidebar = () => {
  return (
    <div >
      <div className="pt-10 h-screen  bg-green-300 ">

        <ul className="pl-8 gap-10 text-2xl font-bold flex flex-col">
          <li>
            
            <Link className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center" to="/Admin">
            <MdDashboardCustomize className="" /> Dashboard 
            </Link>
          </li>
          <li >
            <Link className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center" to = "/Admin/staff">
            <MdPeopleAlt /> Staff
            </Link>
          </li>
          <li >
            <Link className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center" to= "/Admin/Ward">
            <FaHouseChimneyMedical /> Ward
            </Link>
          </li>
          <li >
            <Link className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center" to= "/Admin/treatment">
            <BiSolidInjection /> Treatment
            </Link>
          </li>
          <li >
            <Link className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center" to= "/Admin/lab">
            <FaHospitalUser /> Lab
            </Link>
          </li>
          <li >
            <Link className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center" to= "/Admin/pharmacy">
            <MdLocalPharmacy /> Pharmacy
            </Link>
          </li>
          <li >
            <Link className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center" to= "/Admin/patientDetails">
            <MdPersonalInjury /> Patient
            </Link>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default Admin_Sidebar;
