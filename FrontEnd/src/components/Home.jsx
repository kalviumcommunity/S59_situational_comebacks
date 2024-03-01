import React from 'react'

function Home() {
  return (
    <div className=' bg-black w-full h-screen'>
        <div className="text-3xl flex-1 items-center justify-start text-center text-gray-900 dark:text-white md:text-5xl lg:text-6xl font-semibold p-3">
       <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 md:text-7xl lg:text-7xl p-8">Situational ComeBacks</h1> 
        <h4 className='text-lg font-normal text-gray-500  dark:text-gray-400'>"Do you want to have some good ComeBacks during random moments in front of your family, friend or lover"</h4>
        <h2 className='  text-gray-500 text-2xl p-2 font-bold dark:text-gray-400'>Then you are at right place</h2>
        <h1 className='text-5xl p-10'>Choose your situation</h1>
        </div>
        <div className='flex text-white justify-center items-center h-4/6 flex-row'>
            <div className='w-1/3 h-4/6 bg-zinc-200 rounded-xl flex items-center justify-center flex-col m-2 '>
                <h1 className='text-3xl text-blue-700 font-bold m-5'>Family</h1>
                <h4 className='text-xl text-cyan-800 font-semibold p-12 text-center'>Crack Jokes which make your whole family laugh</h4>
            </div>
            <div className='w-1/3 h-4/6 bg-slate-400 rounded-xl flex items-center justify-center flex-col m-2  '>
                <h1 className='text-3xl text-blue-700 font-bold m-5'>Friends</h1>
                <h4 className='text-xl text-cyan-800 font-semibold p-12 text-center'>If you want to Rost or do standup in front of friends </h4>
            </div>
            <div className='w-1/3 h-4/6 bg-zinc-200 rounded-xl flex items-center justify-center flex-col m-2 '>
                <h1 className='text-3xl text-blue-700 font-bold m-5'>Lover</h1>
                <h4 className='text-xl text-cyan-800 font-semibold p-12 text-center'>Pickup lines , which make them mine</h4>
            </div>
            
        </div>


    </div>
  )
}

export default Home