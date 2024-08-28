import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    navigate('/admin/login'); // Redirect to the login page
  };

  return (
    <div>
      <h2>Welcome to the AdminHome Page!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminHome;
