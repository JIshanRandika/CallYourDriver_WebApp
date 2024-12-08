import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { login } from '../services/api';

function RegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => setScreenHeight(window.innerHeight);
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setPopupMessage('Passwords do not match. Please try again.');
      setPopupType('error');
      setShowPopup(true);
      return;
    }
    setLoading(true);
    try {
      const response = await register(name, username, password, contactNumber);
      await login(username, password);
      setPopupMessage(response.data.message);
      setPopupType('success');
      setShowPopup(true);
      navigate('/Home');
    } catch (error) {
      // Handle both server errors and unexpected issues
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setPopupMessage(errorMessage);
      setPopupType('error');
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: `${screenHeight}px`,
        backgroundColor: '#1E1E2C',
        color: '#FFF',
      }}
    >
      <h1 style={styles.title}>Register</h1>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <div style={styles.passwordContainer}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.inputPassword}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          {showPassword ? '😯' : '😵'}
        </span>
      </div>
      <div style={styles.passwordContainer}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.inputPassword}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          {showPassword ? '😯' : '😵'}
        </span>
      </div>
      <input
        type="number"
        placeholder="Contact Number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        style={styles.input}
      />
      <p style={styles.warn}>
        Please remember your username. <br /> You cannot change it after your
        registration.
      </p>
      <button onClick={handleRegister} style={styles.button}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <p style={styles.link} onClick={() => navigate('/')}>
        Already have an account? <span style={styles.linkText}>Login</span>
      </p>
       {/* Popup Modal */}
       {showPopup && (
        <div style={popupStyles.overlay}>
          <div style={{ ...popupStyles.popup, backgroundColor: popupType === 'success' ? '#ffffff' : '#ff0051' }}>
            <p style={popupStyles.message}>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)} style={popupStyles.button}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
}

const popupStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#FFF',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
    maxWidth: '300px',
    width: '80%',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
  },
  message: {
    marginBottom: '20px',
    color: '#FFF',
  },
  button: {
    backgroundColor: '#4F63AC',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

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
    boxSizing: 'border-box',
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '300px',
    marginBottom: '15px',
  },
  inputPassword: {
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #3A3A4B',
    boxSizing: 'border-box',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    cursor: 'pointer',
    color: '#3A3A4B',
    fontSize: '22px',
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
  warn: {
    marginTop: '10px',
    color: 'red',
    textAlign: 'center',
  },
  linkText: { color: '#4F63AC' },
};

export default RegisterPage;
