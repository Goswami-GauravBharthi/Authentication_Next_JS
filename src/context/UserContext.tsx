"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

type userContextType = {
  user: userType | null;
  setUser: (user: userType) => void;
};

type userType = {
  name: string;
  image?: string;
  email: string;
  id: string;
};

const userDataContext = createContext<userContextType | undefined>(undefined);

function UserContext({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<userType | null>(null);
  const session=useSession();

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get("/api/user");

        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, [session]);

  const data = {
    user,
    setUser,
  };
  return (
    <userDataContext.Provider value={data}>{children}</userDataContext.Provider>
  );
}

export default UserContext;

export const useUserContext = () => {
  const context = useContext(userDataContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContext");
  }
  return context;
};
