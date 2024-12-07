import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQuestion } from 'react-icons/fa';

function Header() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigates to the previous screen
  };

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('token');
  };

  const openWhatsApp = () => {
    const phoneNumber = '+94715757700';
    const message = 'Hello, I need support with the app';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const downloadApp = () => {
    const appUrl = 'https://download-callyourdriver.web.app/'; // Replace with your app download link
    window.open(appUrl, '_blank');
  };

  return (
    <header style={styles.header}>
      <button onClick={handleBack} style={styles.backButton}>
        Back
      </button>
      <div style={styles.actionButtons}>
      <button onClick={openWhatsApp} style={styles.supportButton}>
          <FaQuestion size={24} color="#25D366" />
        </button>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
        
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#1E1E2C',
    color: '#FFF',
  },
  backButton: {
    backgroundColor: 'gray',
    color: '#FFF',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // Adds space between buttons
  },
  supportButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  logoutButton: {
    backgroundColor: '#4F63AC',
    color: '#FFF',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Header;
