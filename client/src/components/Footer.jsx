import React from 'react'

function Footer() {
  return (
    <div className='text-white bg-opacity-70 flex items-center justify-between fixed bottom-0 w-full bg-black'>
        <div className='pl-1 text-xs sm:text-xl'>
            Made By :- Satyam
        </div>
        <div className='flex justify-center items-center'>
            <img className='w-10 sm:w-10' src=".\src\assets\githunLogo1.png" alt="" />
            <img className='w-10 sm:w-10' src=".\src\assets\linkedIn.png" alt="" />
        </div>
    </div>
  )
}

export default Footer