import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // List of pages where the Back button should be visible
  const pagesWithBackButton = ['/driver-details'];

  const handleBack = () => {
    navigate(-1); // Navigates to the previous screen
  };

  const handleLogout = () => {
    navigate('/');
    localStorage.setItem('logout-event', Date.now());
    localStorage.removeItem('token');
    window.location.reload();
  };

  const openWhatsApp = () => {
    const phoneNumber = '+94769994311';
    const message = 'Hello, I am a CallYourDriver user';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <header style={styles.header}>
      {pagesWithBackButton.includes(location.pathname) ? (
        <button onClick={handleBack} style={styles.backButton}>
          Back
        </button>
      ) : (
        // Placeholder to maintain layout when the Back button is hidden
        <div style={styles.backButtonPlaceholder}></div>
      )}
      <div style={styles.actionButtons}>
        <button onClick={openWhatsApp} style={styles.feedbackButton}>
          Feedback
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
  backButtonPlaceholder: {
    width: '75px', // Same width as the Back button to maintain alignment
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  feedbackButton: {
    backgroundColor: 'green',
    color: '#FFF',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
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
