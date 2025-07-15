// src/pages/CompanyDashboard.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const CompanyDashboard = () => {
  const { userData, backendUrl, setIsLoggedIn, setUserData } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        window.location.href = "/company/login";
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!userData) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userData.companyName}</h1>
      <div className="space-y-2">
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Contact Person:</strong> {userData.contactPerson}</p>
        <p><strong>Website:</strong> {userData.website || "N/A"}</p>
        <p><strong>Role:</strong> {userData.role}</p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default CompanyDashboard;
