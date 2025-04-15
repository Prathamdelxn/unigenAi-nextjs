'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [userData, setUser] = useState(null); // You can store user data or just a token
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser({ token, ...JSON.parse(userData) });
    }

    setLoading(false);
  }, []);

  // Login function
   const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ token, ...userData });
    console.log(userData)
     router.push('/mainpage');
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/auth/login');
  };
  return (
    <AuthContext.Provider value={{ userData, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
