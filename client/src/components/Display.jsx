import React from 'react'

function Display(propes) {
  return (
    <div className='text-white flex items-center justify-center flex-col m-14 text-center'>
        {propes.pro.map((e)=>{
            return (
                <div className='m-5' key={e.id}>
                    <h2 className='text-5xl font-semibold p-5'>{e.effectiveness}</h2>
                    <br/>
                    <h1 className='text-2xl'>{e.line}</h1>
                    <br/>
                    <h2> {e.context}
                    </h2>
                </div>
            )
        })}
    </div>
  )
}

export default Display