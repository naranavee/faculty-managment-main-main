import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function FacultySignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false); 

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/faculty/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/faculty/login');
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  const imageUrl = "https://www.dhyanvimalinstitute.com/wp-content/uploads/2016/03/workshop-banner1.jpg";

  return (
    <div className="flex min-h-screen">
      {/* Left side with image */}
      <div className="w-1/2 bg-gray-100">
        {imageLoading && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div> 
          </div>
        )}
        {imageError && !imageLoading && (
          <div className="text-center text-red-500">Image failed to load</div>
        )}
        <img 
          src={imageUrl} 
          alt="Login Illustration"
          className={`object-cover h-full w-full ${imageLoading ? 'hidden' : (imageError ? 'hidden' : 'block')}`} 
          onLoad={() => setImageLoading(false)} 
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }} 
        />
      </div>

      {/* Right side with form */}
      <div className="w-1/2 flex items-center justify-center bg-green-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Faculty Signup</h2>

          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-500"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-800 text-white font-bold rounded-md transition duration-300"
            >
              Sign up
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            Already have an account?{' '}
            <Link to="/faculty/login" className="text-green-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FacultySignup;
