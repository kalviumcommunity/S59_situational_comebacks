import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Img from '../assets/logo.png'
import UserPhote from '../assets/user.png'

function Navebar(props) {

  return (
    <div className='bg-black'>
        <nav className="flex justify-between p-1 items-center">
        <div className="flex justify-center flex-col items-center md:flex-row">
          <Link to='/'>
            <img src={Img} alt="logo" className="m-3 hover:scale-110 transform transition w-12 sm:w-44 lg:w-32 sm:rounded-xl rounded-sm"/>
        </Link>
        </div>
        <div className='text-white flex items-center justify-between font-serif font-thin text-xs lg:text-2xl lg:p-6 sm:text-xl sm:p-2 '>
            <h3 className='p-1 sm:p-2 hover:scale-110 transform transition '>About</h3>
            <Link to='/login'>
            <h3 className='p-1 sm:p-2 hover:scale-110 transform transition '>{props.pro}</h3>
            </Link>
            <Link to='/user'>
            <img src={UserPhote} alt="user" className="m-1 hover:scale-110 transform transition w-6 sm:w-12 rounded-xl"/>
            </Link>
        </div>
        </nav>
    </div>
  )
}

export default Navebar