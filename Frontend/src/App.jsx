import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Dashboard route (duplicate for clarity) */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        {/* 🔐 Root path shows Dashboard if authenticated */}
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        {/* Optional fallback: redirect to login or 404 page */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
