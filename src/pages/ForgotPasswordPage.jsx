import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/api';

function ForgotPasswordPage() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  useEffect(() => {
    const updateHeight = () => setScreenHeight(window.innerHeight);
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await resetPassword(username, newPassword);
      alert('Password reset successful! Please log in.');
      navigate('/');
    } catch (error) {
      alert('Failed to reset password. Please try again.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: `${screenHeight}px`,
      backgroundColor: '#1E1E2C',
      color: '#FFF',
    }}>
      <h1 style={styles.title}>Forgot Password</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handlePasswordReset} style={styles.button}>
        Reset Password
      </button>
      <p style={styles.link} onClick={() => navigate('/')}>
        Back to <span style={styles.linkText}>Login</span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#1E1E2C',
    color: '#FFF',
  },
  title: { fontSize: '2rem', marginBottom: '20px' },
  input: {
    marginBottom: '15px',
    padding: '10px',
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #3A3A4B',
  },
  button: {
    backgroundColor: '#4F63AC',
    color: '#FFF',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  link: { marginTop: '10px', cursor: 'pointer' },
  linkText: { color: '#4F63AC' },
};

export default ForgotPasswordPage;
