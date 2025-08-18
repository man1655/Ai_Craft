import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

axios.defaults.withCredentials = true; // <- set globally once

export const AppContextProvider = (props) => {
  const backendUrl = "http://localhost:4000"; // or import.meta.env.VITE_BACKEND_URL
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const { data } = await axios.get("/api/user/data",  { withCredentials: true });
      if (data.success) setUserData(data.userData);
      else toast.error(data.message);
    } catch (error) {
      toast.error("Failed to fetch user data");
    }
  };

  const getAuthState = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth",  { withCredentials: true });
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        loading,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
