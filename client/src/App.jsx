import Navebar from './components/Navebar'
import Home from './components/Home'
import Footer from './components/Footer'
import './App.css'

import { Route,Link,Routes } from 'react-router-dom'
import DataCenter from './components/DataCenter'


function App() {

  return (
    <div>
      <Navebar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/pickups' element={<DataCenter stack={{code : 'pickups'}}/>} />
        <Route path='/standups' element={<DataCenter stack={{code : 'standups'}}/>} />
        <Route path='/familys' element={<DataCenter stack={{code : 'familys'}}/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
