// src/PrivateRoute.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/auth/me');
        setIsAuthenticated(true);
      } catch (error) {
        // Redirect to login if not authenticated
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
