import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import ViewProfiles from './ViewProfiles';
import ViewWorkshops from './ViewWorkshops';
import ViewLeaves from './ViewLeaves';

function AdminHome() {
  const navigate = useNavigate();
  const [showViewProfiles, setShowViewProfiles] = useState(false);
  const [showViewWorkshops, setShowViewWorkshops] = useState(false);
  const [showViewLeaves, setShowViewLeaves] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleViewProfilesClick = () => {
    setShowViewProfiles(true);
    setShowViewWorkshops(false);
    setShowViewLeaves(false);
  };

  const handleViewWorkshopsClick = () => {
    setShowViewWorkshops(true);
    setShowViewProfiles(false);
    setShowViewLeaves(false);
  };

  const handleViewLeavesClick = () => {
    setShowViewLeaves(true);
    setShowViewProfiles(false);
    setShowViewWorkshops(false);
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar
        onViewProfilesClick={handleViewProfilesClick}
        onViewWorkshopsClick={handleViewWorkshopsClick}
        onViewLeavesClick={handleViewLeavesClick}
      />
      <div className="flex-grow ml-64 p-8 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Admin Home Page!</h2>
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>

        {showViewProfiles && <ViewProfiles />}
        {showViewWorkshops && <ViewWorkshops />}
        {showViewLeaves && <ViewLeaves />}
      </div>
    </div>
  );
}

export default AdminHome;
