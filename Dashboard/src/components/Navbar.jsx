import React from 'react'
import { Link } from 'react-router-dom'
import Notifications from './Admin-Dashboard/Notifications'
import ProfileDropdown from './ProfileDropdown'

const Navbar = () => {
  return (
    <div className='h-20 bg-green-200  flex justify-evenly gap-100 items-center '>
      <div className=''>
          <Link className="flex gap-4 items-center" >
            <img
              src="assets/logo.jpeg"
              className="rounded-full transform hover:scale-110 transition-transform duration-300"
              style={{ width: "60px" }}
              alt="logo"
            />
            <span className="text-gray-800 text-lg font-bold hover:text-gray-600 transition-colors duration-300">
              MediSphere Hospital
            </span>
          </Link>
        </div>
        <div className="btns flex items-center gap-20">

        <div className="notification">
          <Notifications/>
        </div>
        <div className="profile">
          <ProfileDropdown />
        </div>
        </div>

      {/* <ul className='flex gap-10 '>
        <li>
            <Link to='/'>Admin</Link>
        </li>
        <li>
            <Link to='/doctor'>Doctor</Link>
        </li>
        <li>
            <Link to='/patient'>Patient</Link>
        </li>
      </ul> */}
    </div>
  )
}

export default Navbar
