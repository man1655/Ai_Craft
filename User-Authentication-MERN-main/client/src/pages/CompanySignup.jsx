import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const { backendUrl, setIsLoggedIn, getCompanyData } = useContext(AuthContext);

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        companyName,
        email,
        passwordHash: password, // backend will hash
        contactPerson,
        website,
        logo,
      };
      const { data } = await axios.post(`${backendUrl}/api/auth/register`, payload);
      if (data.success) {
        setIsLoggedIn(true);
        await getCompanyData();
        toast.success("Account created successfully");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 border rounded space-y-4">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Contact Person"
        value={contactPerson}
        onChange={(e) => setContactPerson(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="url"
        placeholder="Website (optional)"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Logo URL (optional)"
        value={logo}
        onChange={(e) => setLogo(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
