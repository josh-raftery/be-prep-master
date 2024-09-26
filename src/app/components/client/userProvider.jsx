"use client";
import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(typeof window !== 'undefined' ? window.localStorage.getItem('user') : null);


  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? window.localStorage.getItem('user') : null;
    
    if (storedUser) {
      console.log(storedUser)
      setUser(JSON.parse(storedUser)); // Initialize user state with data from localStorage
    }
  }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('user', JSON.stringify(user));
  // }, [user]);

  const signIn = async (userData) => {
    if(typeof window !== 'undefined') window.localStorage.setItem('user',JSON.stringify(userData))
    setUser(userData);
  };

  const signOut = () => {
    setUser(null); 
    if(typeof window !== 'undefined') window.localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
