import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

function RegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(name, username, password, contactNumber);
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
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
          {showPassword ? '👁️' : '🙈'}
        </span>
      </div>
      <input
        type="text"
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
        Register
      </button>
      <p style={styles.link} onClick={() => navigate('/')}>
        Already have an account? <span style={styles.linkText}>Login</span>
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
    boxSizing: 'border-box', // Ensures padding doesn't shrink the input width
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '300px', // Matches the width of other inputs
    marginBottom: '15px',
  },
  inputPassword: {
    padding: '10px',
    width: '100%', // Fills the container's width
    borderRadius: '5px',
    border: '1px solid #3A3A4B',
    boxSizing: 'border-box', // Ensures consistent width with padding
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    cursor: 'pointer',
    color: '#3A3A4B',
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
