import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from '../axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) setEmail(location.state.email);
  }, [location]);

  const validate = () => {
    const errors = {};
    if (!email) errors.email = 'Email is required';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) errors.email = 'Invalid email format';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const handleLogin = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) return setFormErrors(errors);

    setLoading(true);
    try {
      await axios.post('/auth/login', { email, password }); // ✅ cookie-based auth
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          className="border w-full mb-2 p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

        <input
          type="password"
          className="border w-full mb-2 p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 mt-2 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <a
          href={`${import.meta.env.VITE_BACKEND_URL}/auth/google`}
          className="text-blue-600 block text-center mt-3 hover:underline"
        >
          Login with Google
        </a>

        <p className="mt-4 text-center text-sm">
          New here?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
