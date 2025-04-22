import React from 'react'
import { Link } from 'react-router-dom'

const Signupnav = () => {
  return (
    <div className='flex w-[58%] bg-green border-red-500 rounded-2xl justify-center items-center gap-20 px-20'>
      <Link className='hover:bg-green-300 rounded-2xl px-4' to="/Register/Doctor"><h1>Doctor</h1></Link>
      <Link className='hover:bg-green-300 rounded-2xl  px-4' to="/Register/Patient"><h1>Patient</h1></Link>
    </div>
  )
}

export default Signupnav
