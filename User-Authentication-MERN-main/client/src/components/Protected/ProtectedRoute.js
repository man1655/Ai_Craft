import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading) {
    return null; // or loading spinner
  }

  if (!isLoggedIn) {
    return null; // don't render children if redirecting
  }

  return children;
};

export default ProtectedRoute;
