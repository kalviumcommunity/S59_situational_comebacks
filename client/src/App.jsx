import Navebar from './components/Navebar'
import Home from './components/Home'
import Footer from './components/Footer'
import './App.css'
import { useEffect, useState } from 'react'
import Pickup from './components/Pickup'
import { Route,Link,Routes } from 'react-router-dom'

function App() {

  const [data,setData]= useState([]);

  useEffect(()=>{
    fetch('https://s59-situational-comebacks.onrender.com/api')
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      setData(res)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])


  return (
    <div>
      <Navebar/>
      <Home  />
      <Pickup />
      <Footer/>
    </div>
  )
}

export default App
