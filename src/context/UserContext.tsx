"use client";

import { createContext, useEffect, useState } from "react";

interface ContextProps {
  children: React.ReactNode;
}

interface User {
  user:
    | {
      id: number;
      nome: string;
      email: string;
      userImg: string;
    }
    | undefined;
  setUser: (newState: any) => void;
}

const initialValue = {
  user: undefined,
  setUser: () => {},
};

export const UserContext = createContext<User>(initialValue);

export const UserContextProvider = ({children}: ContextProps) => {
  const [user, setUser] = useState(initialValue.user);
  useEffect(() => {
    let UserJSON = localStorage.getItem('portariacolegio:user');
    setUser(UserJSON && JSON.parse(UserJSON));
  }, []);
  
  return(
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  )
}