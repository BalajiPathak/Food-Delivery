import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return setError('All fields are required');

    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          className="border w-full mb-3 p-2 rounded"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border w-full mb-3 p-2 rounded"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">Login</button>
        <a href="http://localhost:5000/auth/google" className="text-blue-600 block text-center mt-3 hover:underline">
          Login with Google
        </a>
      </div>
    </div>
  );
};

export default Login;