import React from 'react';

function Sidebar({ onProfileClick, onWorkshopClick }) {
  return (
    <div style={styles.sidebar}>
      <ul>
        <li onClick={onProfileClick}>Profile</li>
        <li onClick={onWorkshopClick}>Workshop</li>
        {/* Add more sidebar links here if needed */}
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '200px',
    height: '100vh',
    background: '#f4f4f4',
    padding: '20px',
    position: 'fixed',
  },
};

export default Sidebar;
