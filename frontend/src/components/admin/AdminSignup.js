import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminSignup() {
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    password: '', 
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/admin/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/admin/login');
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-cover bg-center p-12 relative" style={{ backgroundImage: 'url("https://th.bing.com/th/id/OIP.lAl-RY-7IhhJQb5XqqssjwHaFj?w=261&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7")' }}> 
        <div className="absolute inset-0 bg-black opacity-50"></div> 
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white"> 
          <h1 className="text-5xl font-bold mb-4">Welcome to the Admin</h1>
          
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
            Getting Started
          </button>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Register</h2>
          <p className="text-gray-600 text-center mb-6">Create your account. It's just takes only a minute</p>

          <form className="w-full" onSubmit={onSubmit}>
            <div className="mb-4"> 
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
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
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="******************"
                required
              />
            </div>

            <div className="flex items-center mb-4">
              <input 
                id="terms" 
                type="checkbox" 
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
                className="form-checkbox h-4 w-4 text-blue-600" 
              />
              <label htmlFor="terms" className="ml-2 text-sm">
                I accept the Terms of Use &amp; Privacy Policy
              </label>
            </div>

            <div className="flex items-center justify-between">
              <button 
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
                type="submit"
                disabled={!agreedToTerms} 
              >
                Register Now
              </button>
            </div>
          </form>
        </div> 
      </div>
    </div>
  );
}

export default AdminSignup;