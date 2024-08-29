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
    navigate('/');
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
    <div className="flex h-screen"> 
      <Sidebar
        onProfileClick={handleProfileClick}
        onApplyForLeaveClick={handleApplyForLeaveClick}
        onWorkshopClick={handleWorkshopClick}
      />
      <div className="flex-grow ml-64 p-8 bg-gray-100"> 
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Faculty Home Page!</h2>
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>

        {showProfile && <Profile />}
        {showApplyForLeave && <ApplyForLeave />}
        {showWorkshop && <Workshop />}
      </div>
    </div>
  );
}

export default FacultyHome;