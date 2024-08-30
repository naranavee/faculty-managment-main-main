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
    <div className="flex min-h-screen">
      {/* Left side with image */}
      <div className="w-1/2 bg-gray-100">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-online-tutor-illustration_23-2150939211.jpg" // Image URL
          alt="Login Illustration"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right side with form */}
      <div className="w-1/2 flex items-center justify-center bg-purple-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">Faculty Login</h2>

          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
                required
              />
            </div>
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-purple-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-800 text-white font-bold rounded-md transition duration-300"
            >
              Log in
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            Don’t have an account?{' '}
            <Link to="/faculty/signup" className="text-purple-600 hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FacultyLogin;
