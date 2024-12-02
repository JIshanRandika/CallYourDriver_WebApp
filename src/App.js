// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import DriverDetailsPage from './pages/DriverDetailsPage';

// Function to check if the user is logged in
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Check if token exists
};

function App() {
  return (
    <Router>
      <Routes>
      <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/home" replace /> : <LoginPage />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/driver-details" element={<DriverDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
