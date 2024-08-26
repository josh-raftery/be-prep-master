"use client"
import { createContext, useContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    "_id": {
      "$oid": "66c4936bd5a3daa8eb7568b6"
    },
    "user_id": 1,
    "username": "samsoy",
    "name": "Samantha",
    "avatar_url": "https://api.dicebear.com/9.x/personas/svg?seed=Sammy&backgroundColor=b6e3f4",
    "ingredients_used": [],
    "favourite_recipes": [],
    "basketId": 1 // Ensure basketId is part of user data
  });

  const signIn = (username) => {
    setUser({ username });
  };

  const signOut = () => {
    setUser({});
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

