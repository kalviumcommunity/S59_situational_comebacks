import React from 'react'
import {Link } from 'react-router-dom'

function Home() {
  return (
    <div className=' bg-black w-full h-screen'>
        <div className="flex flex-col items-center justify-center text-center text-gray-900 dark:text-white  font-semibold">
       <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-5xl p-2 lg:text-8xl  sm:text-6xl ">Situational ComeBacks</h1> 
        <h4 className='text-sxl p-2 text-white  font-normal sm:p-10  '>"Do you want to have some good ComeBacks during random moments in front of your family, friend or lover"</h4>
        <h2 className='  text-gray-500 text-2xl p-2 font-semibold dark:text-gray-400 sm:text-3xl lg:text-4xl '>Then you are at right place</h2>
        <h1 className='text-3xl sm:text-4xl text-cyan-300 p-10 lg:text-5xl'>Choose your situation</h1>
        </div>


        <div className='flex justify-center items-center flex-col lg:flex-row'>
            <Link to='/familys'>
            <div className=' hover:scale-110 transform transition bg-gradient-to-l from-cyan-100 to-cyan-600  rounded-xl flex items-center justify-around flex-col m-10 lg:w-96  shadow-lg '>
                <h1 className='text-3xl text-blue-900 font-bold p-2'>&#128153;Family&#128153;</h1>
                <h4 className='text-xl text-cyan-900 font-semibold p-8 text-center'>Crack Jokes which make your whole family laugh</h4>
            </div>
            </Link>

            <Link to='/standups'>
            <div className='bg-gradient-to-l hover:scale-110 transform transition from-gray-200 via-fuchsia-200 to-stone-400 m-10 rounded-xl flex items-center flex-col justify-around bg-cyan-500 shadow-lg lg:w-96'>
                <h1 className='text-3xl text-blue-900 font-bold p-2'>&#129293;Friends&#129293;</h1>
                <h4 className='text-xl text-cyan-800 font-semibold p-8 text-center'>If you want to Roast or do standup in front of friends </h4>
            </div>
            </Link>

            <Link to='/pickups'>
            <div className='bg-gradient-to-l hover:scale-110 transform transition rounded-xl flex flex-col lg:w-96 items-center justify-between from-red-700 via-rose-600 to-pink-500 m-10 bg-cyan-500 shadow-lg '>
                <h1 className='text-3xl  font-bold p-2'>&#10084;Lover&#10084;</h1>
                <h4 className='text-xl text-cyan-100 font-semibold p-8 text-center'>Pickup lines , which make them mine</h4>
            </div>
            </Link>
        </div>


    </div>
  )
}

export default Home