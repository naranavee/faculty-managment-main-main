import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import ViewProfiles from './ViewProfiles';
import ViewUsers from './ViewUsers';
import ViewWorkshops from './ViewWorkshops';
import ViewLeaves from './ViewLeaves';

function AdminHome() {
  const navigate = useNavigate();
  const [showViewProfiles, setShowViewProfiles] = useState(false);
  const [showViewUsers, setShowViewUsers] = useState(false);
  const [showViewWorkshops, setShowViewWorkshops] = useState(false);
  const [showViewLeaves, setShowViewLeaves] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleViewProfilesClick = () => {
    setShowViewProfiles(true);
    setShowViewUsers(false);
    setShowViewWorkshops(false);
    setShowViewLeaves(false);
  };

  const handleViewUsersClick = () => {
    setShowViewUsers(true);
    setShowViewProfiles(false);
    setShowViewWorkshops(false);
    setShowViewLeaves(false);
  };

  const handleViewWorkshopsClick = () => {
    setShowViewWorkshops(true);
    setShowViewProfiles(false);
    setShowViewUsers(false);
    setShowViewLeaves(false);
  };

  const handleViewLeavesClick = () => {
    setShowViewLeaves(true);
    setShowViewProfiles(false);
    setShowViewUsers(false);
    setShowViewWorkshops(false);
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
            Welcome to the Admin Home Page!
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
        <AdminSidebar
          onViewProfilesClick={handleViewProfilesClick}
          onViewUsersClick={handleViewUsersClick}
          onViewWorkshopsClick={handleViewWorkshopsClick}
          onViewLeavesClick={handleViewLeavesClick}
        />
        <div className="flex-grow ml-64 p-8 bg-gray-100"> 
          {showViewProfiles && <ViewProfiles />}
          {showViewUsers && <ViewUsers />}
          {showViewWorkshops && <ViewWorkshops />}
          {showViewLeaves && <ViewLeaves />}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
