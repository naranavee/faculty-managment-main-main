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

  
  const logoUrl = 'http://ts1.mm.bing.net/th?id=OIP.fQeA69zTW0ljn5rNIiqb4AAAAA&pid=15.1'; 

  return (
    <div className="flex flex-col min-h-screen">
      <header 
        className="text-white py-6 px-8 flex items-center sticky top-0 z-50" 
        style={{ 
          backgroundImage: 'url("https://img.freepik.com/premium-photo/dark-green-glowing-grainy-gradient-background-noise-texture-webpage-header-banner-design_954352-6490.jpg?w=1060")',
          backgroundSize: 'cover',
        }}
      >
        <img src={logoUrl} alt="Your Logo" className="h-16 mr-4" />
        <div className="flex-grow text-center"> 
          <h2 className="text-4xl text-black-200 font-semibold">
            Welcome to the Faculty Home Page!
          </h2> 
        </div>
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <div className="flex flex-grow"> 
        <Sidebar
          onProfileClick={handleProfileClick}
          onApplyForLeaveClick={handleApplyForLeaveClick}
          onWorkshopClick={handleWorkshopClick}
          className="mt-12" 
        />
        <div className="flex-grow ml-64 p-8 bg-gray-100"> 
          {showProfile && <Profile />}
          {showApplyForLeave && <ApplyForLeave />}
          {showWorkshop && <Workshop />}
        </div>
      </div>
    </div>
  );
}

export default FacultyHome;