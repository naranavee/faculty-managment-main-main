import React from 'react';

function AdminSidebar({ onViewProfilesClick, onViewWorkshopsClick, onViewLeavesClick, onViewUsersClick }) {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6 fixed">
      <ul>
        <li 
          className="cursor-pointer py-2 px-4 hover:bg-gray-700 rounded transition duration-300" 
          onClick={onViewProfilesClick}
        >
          View Profiles
        </li>
        <li 
          className="cursor-pointer py-2 px-4 hover:bg-gray-700 rounded transition duration-300" 
          onClick={onViewUsersClick}
        >
          View Users
        </li>
        <li 
          className="cursor-pointer py-2 px-4 hover:bg-gray-700 rounded transition duration-300" 
          onClick={onViewWorkshopsClick}
        >
          View Workshops
        </li>
        <li 
          className="cursor-pointer py-2 px-4 hover:bg-gray-700 rounded transition duration-300" 
          onClick={onViewLeavesClick}
        >
          View Leaves
        </li>
        {/* Add more sidebar links here if needed */}
      </ul>
    </div>
  );
}

export default AdminSidebar;
