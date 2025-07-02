import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';

const LandingPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await axios.get('/auth/me');
                    setUser(response.data.user);
                } catch (error) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear user data from localStorage (tokens are cleared by server via HttpOnly cookies)
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    if (loading) {
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

                        {/* Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">
                                Features
                            </a>
                            <a href="#restaurants" className="text-gray-700 hover:text-green-600 transition-colors">
                                Restaurants
                            </a>
                            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">
                                About
                            </a>
                            <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">
                                Contact
                            </a>
                        </nav>

                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-4">
                            {user ? (
                                <>
                                    <span className="text-gray-700">Welcome, {user.name}</span>
                                    <button
                                        onClick={() => navigate('/dashboard')}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Dashboard
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-700 hover:text-red-600 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-green-600 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main>
                <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Delicious Food Delivered to Your Door
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Order from your favorite restaurants and get fresh, hot food delivered right to your doorstep.
                            Fast, reliable, and delicious!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
                                Order Now
                            </button>
                            <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 hover:text-white transition-colors">
                                Browse Restaurants
                            </button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Why Choose Us?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🚚</div>
                                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                                <p className="text-gray-600">Get your food delivered in 30 minutes or less</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">🍽️</div>
                                <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
                                <p className="text-gray-600">Fresh ingredients from the best restaurants</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">💳</div>
                                <h3 className="text-xl font-semibold mb-2">Easy Payment</h3>
                                <p className="text-gray-600">Secure payment options for your convenience</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-green-600">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Order?
                        </h2>
                        <p className="text-green-100 mb-8 text-lg">
                            Join thousands of satisfied customers who trust us for their food delivery needs.
                        </p>
                        {!user && (
                            <Link
                                to="/register"
                                className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Get Started Today
                            </Link>
                        )}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <span className="text-2xl mr-2">🍔</span>
                                <span className="text-xl font-bold">FoodDelivery</span>
                            </div>
                            <p className="text-gray-400">
                                Bringing delicious food to your doorstep since 2024.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Restaurants</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Connect</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 FoodDelivery. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage; 