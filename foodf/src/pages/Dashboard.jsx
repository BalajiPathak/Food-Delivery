import { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => navigate('/login'));
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear user data from localStorage (tokens are cleared by server via HttpOnly cookies)
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  // Navigation tabs based on user role
  const getNavigationTabs = () => {
    const baseTabs = [
      { id: 'home', label: 'Home', icon: '🏠' },
      { id: 'orders', label: 'Orders', icon: '🛒' },
      { id: 'restaurants', label: 'Restaurants', icon: '🍽️' },
      { id: 'profile', label: 'Profile', icon: '👤' },
    ];

    // Add admin-specific tabs
    if (user?.role === 'ADMIN') {
      baseTabs.splice(3, 0,
        { id: 'customers', label: 'Customers', icon: '👥' },
        { id: 'delivery', label: 'Delivery Partners', icon: '🚴' },
        { id: 'analytics', label: 'Analytics', icon: '📊' },
        { id: 'settings', label: 'Settings', icon: '⚙️' }
      );
    }

    return baseTabs;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Welcome back, {user?.name}!</h2>
              <p className="text-gray-600">Here's what's happening with your food delivery service.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">📦</div>
                  <div>
                    <h3 className="text-lg font-semibold">Active Orders</h3>
                    <p className="text-2xl font-bold text-green-600">3</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">🍽️</div>
                  <div>
                    <h3 className="text-lg font-semibold">Restaurants</h3>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">⭐</div>
                  <div>
                    <h3 className="text-lg font-semibold">Rating</h3>
                    <p className="text-2xl font-bold text-yellow-600">4.8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Pizza from Domino's</h3>
                    <p className="text-gray-600">Order #12345</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Delivered</span>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Burger from McDonald's</h3>
                    <p className="text-gray-600">Order #12344</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">In Transit</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'restaurants':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Available Restaurants</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Domino\'s', 'McDonald\'s', 'KFC', 'Subway', 'Pizza Hut', 'Burger King'].map((restaurant) => (
                <div key={restaurant} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="font-semibold">{restaurant}</h3>
                  <p className="text-gray-600 text-sm">⭐ 4.5 • 20-30 min</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Customer Management</h2>
            <p className="text-gray-600">Admin-only feature: Manage customer accounts and data.</p>
          </div>
        );

      case 'delivery':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Delivery Partners</h2>
            <p className="text-gray-600">Admin-only feature: Manage delivery partner accounts and assignments.</p>
          </div>
        );

      case 'analytics':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
            <p className="text-gray-600">Admin-only feature: View business analytics and reports.</p>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">System Settings</h2>
            <p className="text-gray-600">Admin-only feature: Configure system settings and preferences.</p>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  defaultValue={user?.role}
                  disabled
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                />
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab to view content</div>;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl mr-2">🍔</span>
              <span className="text-xl font-bold text-green-600">FoodDelivery</span>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                {user.role}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {getNavigationTabs().map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Dashboard;
