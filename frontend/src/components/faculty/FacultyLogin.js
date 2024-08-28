import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './FacultyLogin.css';  // Import the CSS file

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
    <div className="container">
      <form className="form" onSubmit={onSubmit}>
        <h2>Faculty Login</h2>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="link">
        Don't have an account? <Link to="/faculty/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export default FacultyLogin;
