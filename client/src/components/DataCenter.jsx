import React from 'react'
import { useEffect, useState } from 'react'
import { Route,Link,Routes } from 'react-router-dom'
import Display from './Display';


function DataCenter({stack}) {

    const [data,setData]= useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        fetch(`https://s59-situational-comebacks.onrender.com/api/${stack.code}`)
        .then(res=>res.json())
        .then(res=>{
          setData(res)
          setLoading(false)
        })
        .catch(err=>{
          console.log(err)
        })
      },[])

  return (
    <div>
        {loading ? <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
 	<span className='sr-only'>Loading...</span>
  	<div className='h-4 w-4 md:w-8 md:h-8  bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-4 w-4 md:w-8 md:h-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-4 w-4 md:w-8 md:h-8 bg-black rounded-full animate-bounce'></div>
</div> : <Display pro={data} /> }
    </div>
  )
}

export default DataCenter