import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("token=")
    );

    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];
      setToken(token);
    }
    
    const userIdCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("userId=")
    );

    if (userIdCookie) {
      const userId = userIdCookie.split("=")[1];
      setUserId(userId);
    }
  }, []);

  const login = (token, userId) => {
    setToken(token);
    setUserId(userId);
    document.cookie = `token=${token}; max-age=3600; path=/`;
    document.cookie = `userId=${userId}; max-age=3600;path=/`;
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    document.cookie = 'token=; max-age=0; path=/';
    document.cookie = 'userId=; max-age=0; path=/'; 
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
