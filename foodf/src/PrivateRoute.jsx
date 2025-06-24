// src/PrivateRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from './axios';

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios.get('/auth/me')
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return null; // Optional: show loading spinner here
  return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
  