import { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => navigate('/login')); // if token invalid
  }, []);

  const handleLogout = async () => {
    await axios.post('/auth/logout'); // clear cookie
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <>
          <p className="text-lg">Welcome, {user.name}</p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
