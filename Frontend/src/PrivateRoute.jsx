import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  try {
    jwtDecode(token);
    return children;
  } catch {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;