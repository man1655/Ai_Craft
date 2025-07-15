// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
