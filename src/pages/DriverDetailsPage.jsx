import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { suggestDriver, deductPoints } from '../services/api';
import Header from '../components/Header';
import ConfirmationModal from '../components/ConfirmationModal';

function DriverDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { parkName, category } = state || {};

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await suggestDriver(parkName, category);
        if (response.data && response.data.driver) {
          setDriver(response.data.driver);
        } else {
          setDriver(null);
        }
      } catch (error) {
        console.error('Error fetching driver:', error);
        setDriver(null);
      } finally {
        setLoading(false);
      }
    };

    if (parkName && category) {
      fetchDriver();
    } else {
      alert('Invalid park or category. Redirecting...');
      navigate('/');
    }
  }, [parkName, category, navigate]);

  const handleCallDriver = async () => {
    try {
      await deductPoints(driver.contactNumber);
      console.log('Points deducted from driver');
      window.open(`tel:${driver.contactNumber}`, '_self');
    } catch (error) {
      console.error('Error deducting points from driver:', error);
      alert('Failed to deduct points from the driver.');
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const confirmCallDriver = () => {
    closeModal();
    handleCallDriver();
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Fetching driver details...</p>
      </div>
    );
  }

  if (!driver) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Drivers currently not available</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>Driver Details</h1>
        <div style={styles.driverCard}>
          <p style={styles.detailText}>
            Name: <span style={styles.detailValue}>{driver.name}</span>
          </p>
          <p style={styles.detailText}>
            Vehicle: <span style={styles.detailValue}>{driver.vehicleNumber}</span>
          </p>
        </div>
        <button style={styles.callButton} onClick={openModal}>
          Call Your Driver
        </button>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmCallDriver}
      />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#1E1E2C',
    color: '#FFFFFF',
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  driverCard: {
    backgroundColor: '#2C2C3A',
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    marginBottom: '30px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
  },
  detailText: {
    fontSize: '1rem',
    margin: '10px 0',
    color: '#B0B3B8',
  },
  detailValue: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  callButton: {
    backgroundColor: '#4F63AC',
    color: '#FFFFFF',
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  callButtonHover: {
    backgroundColor: '#3A5191',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#1E1E2C',
    color: '#FFFFFF',
  },
  loadingText: {
    fontSize: '1.5rem',
    color: '#B0B3B8',
  },
};

export default DriverDetailsPage;
