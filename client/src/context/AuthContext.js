import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContextValue = createContext();

const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, admin: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({ token, admin: decoded });
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setAuth({ token, admin: decoded });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, admin: null });
  };

  return (
    <AuthContextValue.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContextValue.Provider>
  );
};

export default AuthContext;