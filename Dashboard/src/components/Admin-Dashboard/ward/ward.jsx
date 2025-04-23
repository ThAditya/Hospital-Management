import React from 'react'

const Ward = () => {
  return (
    <div>
      <div className="heading font-bold text-gray-500 mb-13 text-6xl">
        <h1>Appointment</h1>
      </div>

      <div className="Name mb-6">
        <input className='border-4 border-gray-500 rounded-lg p-2 w-158 mr-4' type="text" placeholder="First Name" />
        <input className='border-4 border-gray-500 rounded-lg p-2 w-158' type="text" placeholder="Last Name" />
      </div>

      <div className="Name mb-3">
        <input className='border-4 border-gray-500 rounded-lg p-2 w-158 mr-4' type="number" placeholder="Mobile Number" />
        <input className='border-4 border-gray-500 rounded-lg p-2 w-158' type="email" placeholder="Email" />
      </div>

      <div className="Name mb-3">
        <select className='border-4 border-gray-500 rounded-lg p-2 w-158 text-gray-500 mr-4'>
          <option value="">Department Name</option>
        </select>
        <input className='border-4 border-gray-500 rounded-lg p-2 text-gray-500 w-158' type="text" placeholder="Doctor Name" />
      </div>

      <div className="message items-center flex flex-col">
        <input className='border-4 border-gray-500 rounded-lg w-full h-30 mb-5' type="text" placeholder="Address" />
        <a className='p-2 w-55 text-center font-bold bg-purple-800 text-amber-50 rounded-xl'>Register</a>
      </div>
    </div>
  )
}

export default Ward
