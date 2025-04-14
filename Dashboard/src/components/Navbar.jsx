import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <ul className='flex gap-10 bg-green-300'>
        <li>
            <Link to='/'>Admin</Link>
        </li>
        <li>
            <Link to='/doctor'>Doctor</Link>
        </li>
        <li>
            <Link to='/patient'>Patient</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
