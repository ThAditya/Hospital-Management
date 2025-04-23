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
        <div className=" pt-10 bg-green-300">

          <ul className="pl-8 gap-10 text-2xl font-bold h-screen flex flex-col">
            <li>
              <Link className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center" to="/patient">
              <MdDashboardCustomize className="" /> Dashboard
              </Link>
            </li>
            <li>
              <Link className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center" to="/patient/Staff" >
              <MdPeopleAlt /> Staff
              </Link>
            </li>
            
            <li>
              <Link className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center" to="/patient/Treatment">
              <BiSolidInjection /> Treatment
              </Link>
            </li>
            <li>
              <Link className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center" to="/patient/Lab">
              <FaHospitalUser /> Lab
              </Link>
            </li>
            <li>
              <Link className="flex flex-row gap-3 hover:border-t-2 hover:border-b-2 hover:border-blue-400 cursor-pointer items-center" to="/patient/Pharmacy">
              <MdLocalPharmacy /> Pharmacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Patient_Sidebar;
