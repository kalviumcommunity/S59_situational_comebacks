import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import LogoutPage from './LogOut';

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [counter, setCounter] = useState(3);
  const API_URI = `${import.meta.env.VITE_URL}/auth/login`;

  useEffect(() => {
    if (submitted) {
      const timer = setInterval(() => {
        setCounter((prev) => prev - 1); 
      }, 1000);
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);  
      return () => clearInterval(timer);
    }
  }, [submitted, navigate]);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log(JSON.stringify({
      "emailId" : email,
       "password": password,
     }))
    e.preventDefault();
    try {
      const response = await fetch(API_URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         "emailId" : email,
          "password": password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to authenticate. Please check your credentials.');
      }
      
      const { token,userName,userId,Id } = await response.json();
      console.log('Authentication successful:', token,userName,  userId ,Id);
      toast.success('Authentication successful');
      setSubmitted(true);

      if (token&&userId) {
        document.cookie = `token=${token}; max-age=3600; path=/`;
        document.cookie = `userId=${userId}; max-age=3600;path=/`;
        document.cookie = `userName=${userName}; max-age=3600;path=/`
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(error.message || 'An unexpected error occurred during authentication');
    }
  };

  return (

    <div className='bg-black h-full'>
<ToastContainer/>


{(props.pro!="Login")?
<LogoutPage pro={props.pro}/>
:<div>
<div className='text-5xl text-white w-full flex justify-center items-center'>
  Login
</div>


<section className="h-screen text-white bg-black">
  <div className="container h-full px-6">
    <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="w-full"
          alt="Phone image"
        />
      </div>
      <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
        <div className="flex items-center justify-center">
          {submitted ? (
            <div className='p-1 bg-blue-700  lg:py-8 lg:px-5 fixed top-64 rounded-2xl px-2 py-3 z-20'>
            <h1 className="text-4xl lg:text-5xl mb-5 font-semibold  text-center text-white">
              Login Successful <br />
              <span className="text-center  text-sm">You will be redirected to Home page in <span className='text-xl text-blue-200'>{counter}</span> </span>  
            </h1>
            </div>
          ) : null}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <input
              type="email"
              className="peer block min-h-[auto] text-center w-full rounded border-2 border-white  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput3"
              placeholder="Email address"
              onChange={handleEmailChange}
              value={email}
            />
            <label
              htmlFor="exampleFormControlInput3"
              className="pointer-events-none  text-sm  absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
            >
              Email address
            </label>
          </div>
          <div className="relative text-center mb-6">
            <input
              type="password"
              className="peer text-center border-2 border-white block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput33"
              onChange={handlePassChange}
              value={password}
              placeholder="Password"
            />
            <label
              htmlFor="exampleFormControlInput33"
              className="pointer-events-none text-center absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="inline-block w-full rounded bg-slate-500 hover:scale-105 hover:bg-slate-700 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          >
            Sign in
          </button>
          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
            <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
              OR
            </p>
          </div>
          <Link to="/register">
            <button className="mb-3 flex w-full items-center justify-center hover:scale-105 hover:bg-blue-700 rounded bg-info bg-blue-500 px-7 pb-2.5 pt-3 text-center  text-sm font-medium uppercase leading-normal text-white shadow-info-3 transition duration-150 ease-in-out hover:bg-info-accent-300 hover:shadow-info-2 focus:bg-info-accent-300 focus:shadow-info-2 focus:outline-none focus:ring-0 active:bg-info-600 active:shadow-info-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
              Create Account
            </button>
          </Link>
        </form>
      </div>
    </div>
  </div>

</section>
</div>}       
    </div>
                
  );
};

export default LoginForm;


