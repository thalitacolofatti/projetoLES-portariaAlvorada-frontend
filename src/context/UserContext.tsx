'use client';

import React, { createContext, useEffect, useState } from 'react';

interface User {
  user:
    | {
      id: number;
      nome: string;
      email: string;
      userImg: string;
    }
    | undefined;
    // eslint-disable-next-line no-unused-vars
  setUser: (newState: any) => void;
}

interface ContextProps {
  children: React.ReactNode;
}

const initialValue = {
  user: undefined,
  setUser: () => {},
};

export const UserContext = createContext<User>(initialValue);

export const UserContextProvider = ({children}: ContextProps) => {
  const [user, setUser] = useState(initialValue.user);
  useEffect(() => {
    const UserJSON = localStorage.getItem('portariacolegio:user');
    setUser(UserJSON && JSON.parse(UserJSON));
  }, []);
  
  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  );
};