import React from 'react';

function Sidebar({ onProfileClick, onWorkshopClick, onApplyForLeaveClick }) {
  return (
    <div className="w-64 h-screen bg-blue-800 text-white p-6 fixed"> 
      <ul>
        <li 
          className="cursor-pointer py-2 px-4 hover:bg-blue-700 rounded transition duration-300" 
          onClick={onProfileClick}
        >
          Profile
        </li>
        <li 
          className="cursor-pointer py-2 px-4 hover:bg-blue-700 rounded transition duration-300" 
          onClick={onWorkshopClick}
        >
          Workshop
        </li>
        <li 
          className="cursor-pointer py-2 px-4 hover:bg-blue-700 rounded transition duration-300" 
          onClick={onApplyForLeaveClick}
        >
          Apply for Leave
        </li>
        {/* Add more sidebar links here if needed */}
      </ul>
    </div>
  );
}

export default Sidebar;