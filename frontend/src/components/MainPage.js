import React from 'react';
import { useNavigate } from 'react-router-dom'; // Update import

const MainPage = () => {
  const navigate = useNavigate(); // Update useHistory to useNavigate

  const navigateToAdminLogin = () => {
    navigate('/admin/login'); // Update history.push to navigate
  };

  const navigateToFacultyLogin = () => {
    navigate('/faculty/login'); // Update history.push to navigate
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to the Management System</h1>
      <button style={styles.button} onClick={navigateToAdminLogin}>
        Admin
      </button>
      <button style={styles.button} onClick={navigateToFacultyLogin}>
        Faculty
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default MainPage;
