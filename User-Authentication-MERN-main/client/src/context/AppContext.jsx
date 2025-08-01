import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Define and export the context
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      if (data.success) setUserData(data.userData);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAuthState = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoggedIn(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    loading,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
