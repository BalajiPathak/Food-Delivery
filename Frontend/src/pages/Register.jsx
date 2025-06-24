import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) return setError('All fields are required');
    if (password.length < 6) return setError('Password must be at least 6 characters');

    try {
      await axios.post('http://localhost:5000/auth/register', { name, email, password });
      alert('Registered! Please login.');
      navigate('/login');
    } catch {
      setError('Email already exists or error occurred');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          className="border w-full mb-3 p-2 rounded"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
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
        <button onClick={handleRegister} className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600">Register</button>
      </div>
    </div>
  );
};

export default Register;