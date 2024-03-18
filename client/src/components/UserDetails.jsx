import React from 'react'
import UserPhote from '../assets/user.png'
import { useAuth } from './Authcontext';
import { Link } from 'react-router-dom';

export default function UserDetails(propes) {
  const { userId } = useAuth();
  return (
    <div className='bg-black  text-white text-3xl flex items-center h-screen justify-center'>

    {propes.pro=="Login"?<div>
    <div className='text-4xl text-white bg-slate-800 flex text-center items-center justify-center flex-col  sm:py-10 sm:px-1 py-8 mx-1 font bold mb-12 overflow-auto lg:px-12 rounded-3xl'>
      <div className='mb-12'>Login for User Details</div>
            <Link to='/login'>
            <button 
            className=' p-3 text-2xl font-semibold rounded-lg hover:scale-105  text-white bg-red-700   text-center'>Login
            </button>
            </Link>
            <Link to='/register'>
                <div className='text-sm mt-8  text-blue-400 hover:text-blue-500  hover:scale-110'>
                Register an account?
                </div>
            </Link>
            </div>
    </div> :
      <div className='flex items-center bg-slate-800 px-2 py-2 justify-center text-center hover:scale-105 rounded-2xl sm:p-5 flex-col mb-24'>
        <img src={UserPhote} alt="logo" className="m-3 hover:scale-110 transform transition mb-14 w-16 sm:w-44  rounded-xl"/>
        <div className='mb-6 text-2xl font-semibold hover:scale-105 hover:bg-black p-2 rounded-lg'>Name : {propes.pro}</div>
        <div className='mb-6 text-2xl font-semibold hover:scale-105 hover:bg-black p-2 rounded-lg'>User Id : {userId}</div>
      </div>
}
    </div>
  )
}
