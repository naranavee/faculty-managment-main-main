import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AdminLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/admin/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/admin/home');
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 bg-cover bg-center p-12 relative" style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp9764081.jpg")' }}> 
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="text-4xl font-bold mb-4">
                        <h1 className="text-5xl">Hello! welcome</h1> 
                        <h1 className="text-5xl">to our</h1>
                        <h1 className="text-5xl">community</h1>
                    </div>
                    <p className="text-lg mb-8">Make your dream comes true and achieve your success</p> 
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                        Getting Started
                    </button>
                </div>
            </div>

            <div className="w-1/2 flex flex-col justify-center items-center p-8"> 
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
                    <h2 className="text-3xl font-bold mb-4 text-center">Login to your account</h2>
                    <form className="w-full" onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                type="submit"
                            >
                                LOGIN
                            </button>
                           
                        </div>

                        <p className="text-center text-gray-500 text-xs">
                            Need an account? <Link to="/admin/signup" className="font-bold text-blue-500 hover:underline">Create an account</Link>
                        </p>
                    </form>
                </div> {/* Close the bg-white div here */}
            </div>
        </div>
    );
}

export default AdminLogin;