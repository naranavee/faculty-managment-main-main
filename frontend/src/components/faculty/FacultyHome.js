import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Profile from './Profile';
import ApplyForLeave from './ApplyForLeave';
import Workshop from './Workshop';

function FacultyHome() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showApplyForLeave, setShowApplyForLeave] = useState(false);
  const [showWorkshop, setShowWorkshop] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/faculty/login');
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowApplyForLeave(false);
    setShowWorkshop(false);
  };

  const handleApplyForLeaveClick = () => {
    setShowApplyForLeave(true);
    setShowProfile(false);
    setShowWorkshop(false);
  };

  const handleWorkshopClick = () => {
    setShowWorkshop(true);
    setShowProfile(false);
    setShowApplyForLeave(false);
  };

  return (
    <div>
      <Sidebar 
        onProfileClick={handleProfileClick} 
        onApplyForLeaveClick={handleApplyForLeaveClick}
        onWorkshopClick={handleWorkshopClick}
      />
      <div style={{ marginLeft: '220px', padding: '20px' }}>
        <h2>Welcome to the Faculty Home Page!</h2>
        <button onClick={handleLogout}>Logout</button>
        {showProfile && <Profile />}
        {showApplyForLeave && <ApplyForLeave />}
        {showWorkshop && <Workshop />}
      </div>
    </div>
  );
}

export default FacultyHome;
