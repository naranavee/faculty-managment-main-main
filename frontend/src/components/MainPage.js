import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const navigateToAdminLogin = () => {
    navigate('/admin/login');
  };

  const navigateToFacultyLogin = () => {
    navigate('/faculty/login');
  };

  return (
    <div>
      <header style={styles.header}>
        <button style={styles.headerButton} onClick={navigateToAdminLogin}>
          Admin
        </button>
        <button style={styles.headerButton} onClick={navigateToFacultyLogin}>
          Faculty
        </button>
      </header>

      <div style={styles.container}>
        <h1 style={styles.heading}>Welcome to the Management System</h1>
      </div>
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
    backgroundColor: '#f4f4f4',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: '#333',
  },
  header: {
    backgroundColor: '#333',
    color: 'white',
    padding: '15px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  headerButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    marginLeft: '10px',
    transition: 'background-color 0.3s',

    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
};

export default MainPage;