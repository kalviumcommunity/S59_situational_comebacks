import React, {useEffect, useState} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Img from '../assets/RegLogo.png';

export default function LogoutPage(props){

    const [loading, setLoading] = useState(false);
    const [done, setdone] = useState(false);
    const [counter, setCounter] = useState(3);


    const handleLogout = async() => {
        console.log("done")
        setLoading(true);
        document.cookie = 'token=; expires=Thu, 01 Jan 1900 00:00:00 UTC; path=/;';
        document.cookie = 'userId=; expires=Thu, 01 Jan 1900 00:00:00 UTC; path=/;';
        document.cookie = 'userName=; expires=Thu, 01 Jan 1900 00:00:00 UTC; path=/;';
        toast.success('Logged out successfully');
        setLoading(false);
        setdone(true);
    }

    useEffect(() => {
        if (done) {
          const timer = setInterval(() => {
            setCounter((prev) => prev - 1);
          }, 1000);
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
          return () => clearInterval(timer);
        }
      }, [done])

      


    return(
        <div className='flex h-screen text-center flex-col w-full justify-center items-center '>
            <Link to='/'>
            <img src={Img} className='w-36 mb-8'/>
            </Link>
            {done?<div className='text-2xl lg:text-3xl text-white bg-slate-800  py-10 px-1 mx-1 font bold mb-12 overflow-auto lg:px-12 rounded-3xl '>Your Will Be Redirected to Home Page In <span className='text-3xl lg:text-4xl text-green-200'> {counter}</span></div>
            :<div>
            <div className='text-4xl text-white bg-slate-800  py-10 px-1 mx-1 font bold mb-12 overflow-auto lg:px-12 rounded-3xl  '
            >
                Logout from {props.pro}<br/>
            <Link to='/register'>
                <div className='text-sm mt-8  text-blue-400 hover:text-blue-500  hover:scale-110'>
                Register with another account?
                </div>
            </Link>
            </div>
            <button 
            className=' p-3 text-2xl font-semibold rounded-lg hover:scale-105  text-white bg-red-700   text-center'
            type="submit" 
            value='Logout' 
            onClick={handleLogout}>Logout</button>
            </div>}
            <ToastContainer />
        </div>
    )
}