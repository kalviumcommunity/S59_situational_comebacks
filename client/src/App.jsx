// import Navebar from './components/Navebar'
// import Home from './components/Home'
// import Footer from './components/Footer'
// import './App.css'
// import Register from './components/Register'
// import AddDataForm from './components/Form'

// import { Route,Link,Routes } from 'react-router-dom'
// import DataCenter from './components/DataCenter'


// function App() {

//   return (
//     <div>
//       <Navebar/>
//       <Routes>
//         <Route path='/' element={<Home/>} />
//         <Route path='/pickups' element={<DataCenter stack={{code : 'pickups'}}/>} />
//         <Route path='/standups' element={<DataCenter stack={{code : 'standups'}}/>} />
//         <Route path='/familys' element={<DataCenter stack={{code : 'familys'}}/>} />
//         <Route path='/register'element={<Register/>} />
//         <Route path='/post' element={<AddDataForm/>} />
//       </Routes>
//       <Footer/>
//     </div>
//   )
// }

// export default App

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navebar from './components/Navebar';
import Home from './components/Home';
import Footer from './components/Footer';
import Register from './components/Register';
import AddDataForm from './components/Form';
import DataCenter from './components/DataCenter';

function App() {
  return (
    <div className='bg-black'>
      <Navebar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pickups' element={<DataCenter stack={{ code: 'pickups' }} />} />
        <Route path='/standups' element={<DataCenter stack={{ code: 'standups' }} />} />
        <Route path='/familys' element={<DataCenter stack={{ code: 'familys' }} />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
