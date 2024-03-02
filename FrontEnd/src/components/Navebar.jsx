import React from 'react'

function Navebar() {
  return (
    <div>
        <nav className="flex justify-between p-1 items-center">
        <div className="flex justify-center flex-col items-center md:flex-row">
            <img src=".\src\assets\logo.png" alt="logo" className="p-1 w-24 sm:w-44 lg:w-48 rounded-xl"/>
        </div>
        <div className='text-white flex items-center justify-between font-serif font-thin text-xs lg:text-2xl lg:p-6 sm:text-xl sm:p-2 '>
            <h3 className='p-1 sm:p-2 '>About</h3>
            <h3 className='p-1 sm:p-2 '>Contact</h3>
            <h3 className='p-1 sm:p-2 '>Fav&#129293;</h3>
        </div>
        </nav>
    </div>
  )
}

export default Navebar