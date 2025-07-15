import React, { createContext, useState, useEffect } from 'react';

export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedCompany = localStorage.getItem('company');
    if (storedToken && storedCompany) {
      setToken(storedToken);
      setCompany(JSON.parse(storedCompany));
    }
  }, []);

  useEffect(() => {
    if (token && company) {
      localStorage.setItem('token', token);
      localStorage.setItem('company', JSON.stringify(company));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('company');
    }
  }, [token, company]);

  const login = (companyData, jwtToken) => {
    setCompany(companyData);
    setToken(jwtToken);
  };

  const logout = () => {
    setCompany(null);
    setToken(null);
  };

  return (
    <CompanyContext.Provider value={{ company, token, login, logout }}>
      {children}
    </CompanyContext.Provider>
  );
};
