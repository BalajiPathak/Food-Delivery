import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axios'; // ✅ custom axios instance
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email) errors.email = 'Email is required';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) errors.email = 'Invalid email format';
    if (!form.password) errors.password = 'Password is required';
    else if (form.password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const handleRegister = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) return setFormErrors(errors);

    setLoading(true);
    try {
      await axios.post('/auth/register', form); // ✅ relative path
      toast.success('Registration successful! Please login.');
      navigate('/login', { state: { email: form.email } });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Create an Account</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          className="border w-full mb-2 p-2 rounded"
          placeholder="Name"
          onChange={handleChange}
        />
        {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}

        <input
          type="email"
          name="email"
          value={form.email}
          className="border w-full mb-2 p-2 rounded"
          placeholder="Email"
          onChange={handleChange}
        />
        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

        <input
          type="password"
          name="password"
          value={form.password}
          className="border w-full mb-2 p-2 rounded"
          placeholder="Password"
          onChange={handleChange}
        />
        {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 mt-2 disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
