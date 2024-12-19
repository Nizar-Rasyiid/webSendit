import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validate form
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://192.168.1.5:8000/api/login', {
                email: formData.email,
                password: formData.password,
            });
            setSuccess('Login successful!');
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
        } catch (err) {
            if (err.response?.status === 422) {
                // Validation errors from server
                setError('Invalid credentials. Please check your email and password.');
            } else if (err.response?.status === 429) {
                // Too many attempts
                setError('Too many login attempts. Please try again later.');
            } else {
                setError(err.response?.data?.error || 'Network error. Please check your connection.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md mx-4 bg-white rounded-lg shadow-xl p-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-center text-indigo-800">Admin Panel Sendit</h2>
                    <p className="text-center text-gray-600 mt-2">Welcome back! Please login to your account.</p>
                </div>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
                        {success}
                    </div>
                )}
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} 
                                rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} 
                                rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`w-full p-3 bg-indigo-800 text-white rounded-lg transition duration-200 font-medium
                            ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                
                <p className="mt-8 text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="text-indigo-600 hover:underline font-medium">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;