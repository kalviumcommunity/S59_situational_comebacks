import Navebar from './components/Navebar'
import Home from './components/Home'
import Footer from './components/Footer'
import './App.css'
import { useEffect } from 'react'

function App() {

  useEffect(()=>{
    fetch('https://s59-situational-comebacks.onrender.com/api')
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
    })
  },[])


  return (
    <div>
      <Navebar/>
      <Home  />

      <Footer/>
    </div>
  )
}

export default App
