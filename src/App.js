import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import DriverDetailsPage from './pages/DriverDetailsPage';

function App() {
  return (
    <Router>
      {/* Storage event listener inside a child component */}
      <StorageListener />
      <Routes>
      <Route
          path="/"
          element={localStorage.getItem('token') ? <Navigate to="/home" replace /> : <LoginPage />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/driver-details"
          element={<DriverDetailsPage />}
        />
      </Routes>
    </Router>
  );
}

function StorageListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageEvent = (event) => {
      if (event.key === 'logout-event') {
        console.log('Logout event detected in another tab.');
        navigate('/'); // Redirect to login page
        window.location.reload();
      }
      if (event.key === 'home-event') {
        console.log('Home event detected in another tab.');
        navigate('/home'); // Redirect to login page
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [navigate]);

  return null; // This component is only for handling events
}

export default App;
