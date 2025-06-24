import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user && <p className="text-lg">Welcome, {user.email}</p>}
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
