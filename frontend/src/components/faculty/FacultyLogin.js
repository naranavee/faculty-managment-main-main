import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function FacultyLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/faculty/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/faculty/home');
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-blue-500"> 
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"> 
        <h2 className="text-2xl font-bold mb-4 text-center">Sign in</h2>
        <p className="text-center mb-6">
          Don't have an account? <Link to="/faculty/signup" className="text-blue-500 hover:underline">Sign up here</Link>
        </p>

        <form className="form" onSubmit={onSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4"> 
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          

          <div className="flex items-center justify-center"> 
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-10 rounded w-full  items-center justify-between"
            >
              Sign in
              
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default FacultyLogin;