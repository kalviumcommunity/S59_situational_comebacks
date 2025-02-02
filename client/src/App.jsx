import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navebar from './components/Navebar';
import Home from './components/Home';
import Footer from './components/Footer';
import Register from './components/Register';
import DataCenter from './components/DataCenter';
import Login from './components/Login';
import { AuthProvider } from './components/Authcontext';
import UserDetails from './components/UserDetails';

function App() {
  const [userId, setuserId] = useState("LOGIN");
  const [auth, setAuth] = useState(false);
  const [userName, setusername] = useState("Login");

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const userIdCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("userId=")
    );

    const userNameCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("userName=")
    );

    
    if (userIdCookie) {
      const userIdValue = userIdCookie.split("=")[1];
      setuserId(userIdValue);

      const userIdName = userNameCookie.split("=")[1];
      setusername(userIdName);
      setAuth(true);
    }
  }, []);

  return (
    <div className='bg-black'>
      <Navebar pro={userName} />
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<UserDetails pro={userName} />}/>
        <Route path='/login' element={<Login pro={userName} />} />
        <Route path='/pickups' element={<DataCenter stack={{ code: 'pickups' }} />} />
        <Route path='/standups' element={<DataCenter stack={{ code: 'standups' }} />} />
        <Route path='/familys' element={<DataCenter stack={{ code: 'familys' }} />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      </AuthProvider>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
