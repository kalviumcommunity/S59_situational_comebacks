import React from 'react'
import { Link } from 'react-router-dom'
import Img from '../assets/logo.png'


function Navebar() {
  return (
    <div className='bg-black'>
        <nav className="flex justify-between p-1 items-center">
        <div className="flex justify-center flex-col items-center md:flex-row">
          <Link to='/'>
            <img src={Img} alt="logo" className="m-3 hover:scale-110 transform transition w-12 sm:w-44 lg:w-32 rounded-xl"/>
        </Link>

        </div>
        <div className='text-white flex items-center justify-between font-serif font-thin text-xs lg:text-2xl lg:p-6 sm:text-xl sm:p-2 '>
            <h3 className='p-1 sm:p-2 hover:scale-110 transform transition '>About</h3>
            <Link to='/register'>
            <h3 className='p-1 sm:p-2 hover:scale-110 transform transition '>Register</h3>
            </Link>
            <h3 className='p-1 sm:p-2 hover:scale-110 transform transition '>Fav&#129293;</h3>
        </div>
        </nav>
    </div>
  )
}

export default Navebar