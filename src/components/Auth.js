import {getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import { useEffect } from 'react';

export const AuthContext = React.createContext();

export default function Auth({ children }) {
  const auth = getAuth();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(auth,setCurrentUser);
    },[]);

  return (
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
  )
}
