import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    if (!username || !password) {
      setError('Both username and password are required.');
      setLoading(false);
      return;
    }

    try {
      await login(username, password);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>
      {error && <p style={styles.error}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <div style={styles.input}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.passwordInput}
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          {showPassword ? '👁️' : '🙈'}
        </span>
      </div>
      <button onClick={handleLogin} style={styles.button} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p style={styles.link} onClick={() => navigate('/register')}>
        Don’t have an account? <span style={styles.linkText}>Register</span>
      </p>
      <p style={styles.link} onClick={() => navigate('/forgot-password')}>
        <span style={styles.linkText}>Forgot Password?</span>
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
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '10px',
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #3A3A4B',
    position: 'relative',
    backgroundColor: '#FFF',
    color: '#000',
  },
  passwordInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    backgroundColor: 'transparent',
  },
  eyeIcon: {
    position: 'absolute',
    right: '11px',
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
  linkText: { color: '#4F63AC' },
  error: {
    color: 'red',
    marginBottom: '15px',
    fontSize: '0.9rem',
  },
};

export default LoginPage;
