import React from 'react'

function Display(propes) {
  return (
    <div className='text-white flex items-center justify-center  flex-wrap m-14 text-center'>
        {propes.pro.map((e)=>{
            return (
                <div className='m-5 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-110 transform transition duration-y bg-opacity-10' key={e.id}>
                    <h2 className='text-5xl mb-2 tracking-tight  text-white font-semibold p-5'>{e.effectiveness}</h2>
                    <br/>
                    <h1 className='text-2xl mb-3 font-normal text-gray-200'>{e.line}</h1>
                    <br/>
                    <h2 className='p-1 font-semibold'> {e.context}
                    </h2>
                    <button className='inline-flex items-center m-5 p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                        Add to Fav
                    </button>
                </div>
            )
        })}
    </div>
  )
}

export default Display