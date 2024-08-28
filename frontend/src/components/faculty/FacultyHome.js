import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Profile from './Profile';

function FacultyHome() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/faculty/login');
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  return (
    <div>
      <Sidebar onProfileClick={handleProfileClick} />
      <div style={{ marginLeft: '220px', padding: '20px' }}>
        <h2>Welcome to the Faculty Home Page!</h2>
        <button onClick={handleLogout}>Logout</button>
        {showProfile && <Profile />}
      </div>
    </div>
  );
}

export default FacultyHome;