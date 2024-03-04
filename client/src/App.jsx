import Navebar from './components/Navebar'
import Home from './components/Home'
import Footer from './components/Footer'
import './App.css'
import { useEffect, useState } from 'react'
import Display from './components/Display'
import { Route,Link,Routes } from 'react-router-dom'

function App() {

  const [data,setData]= useState([]);

  useEffect(()=>{
    fetch('https://s59-situational-comebacks.onrender.com/api/pickups')
    .then(res=>res.json())
    .then(res=>{
      setData(res)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])


  return (
    <div>
      <Navebar/>
      <Routes>
        <Route path='/' element={<Link to={'/pickups'}><Home  /></Link>} />
        <Route path='/pickups' element={<Display pro={data}/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
