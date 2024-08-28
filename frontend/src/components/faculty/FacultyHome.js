import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Profile from './Profile';
import Workshop from './Workshop'; // Import the Workshop component

function FacultyHome() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showWorkshop, setShowWorkshop] = useState(false); // State to show/hide Workshop

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/faculty/login');
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowWorkshop(false); // Hide Workshop if Profile is clicked
  };

  const handleWorkshopClick = () => {
    setShowWorkshop(true);
    setShowProfile(false); // Hide Profile if Workshop is clicked
  };

  return (
    <div>
      <Sidebar 
        onProfileClick={handleProfileClick}
        onWorkshopClick={handleWorkshopClick} // Pass the Workshop click handler to Sidebar
      />
      <div style={{ marginLeft: '220px', padding: '20px' }}>
        <h2>Welcome to the Faculty Home Page!</h2>
        <button onClick={handleLogout}>Logout</button>
        {showProfile && <Profile />}
        {showWorkshop && <Workshop />} {/* Render Workshop if showWorkshop is true */}
      </div>
    </div>
  );
}

export default FacultyHome;
