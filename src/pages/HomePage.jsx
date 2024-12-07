import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getParks, getCategories } from '../services/api';
import Header from '../components/Header';

function Popup({ message, onClose }) {
  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <p style={popupStyles.message}>{message}</p>
        <button style={popupStyles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

function HomePage() {
  const [parkName, setParkName] = useState('');
  const [parks, setParks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState(null); // For managing the popup message
  const navigate = useNavigate();

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  useEffect(() => {
    const updateHeight = () => setScreenHeight(window.innerHeight);
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parkData = await getParks();
        const categoryData = await getCategories();
        setParks(parkData.data.map((park) => park.name));
        setCategories(categoryData.data);
      } catch (error) {
        if(localStorage.getItem('token')){
          console.error('Error fetching data:', error);
          setPopupMessage('Failed to load parks and categories. Please try again.');
        } else {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategorySelection = (category) => {
    if (!parkName) {
      setPopupMessage('Please select a park before choosing a category.');
    } else {
      navigate('/driver-details', { state: { parkName, category } });
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Loading parks and categories...</p>
      </div>
    );
  }

  return (
    <>
      {/* <Header style={{
      position:"relative"
    }}/> */}
      <div style={{
      // display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: `${screenHeight}px`,
      backgroundColor: '#1E1E2C',
      color: '#FFF',
    }}>
      <Header/>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      }}>
          <h1 style={styles.title}>Select Park</h1>
        <select
          value={parkName}
          onChange={(e) => setParkName(e.target.value)}
          style={styles.dropdown}
        >
          <option value="">Select a park</option>
          {parks.map((park) => (
            <option key={park} value={park}>
              {park}
            </option>
          ))}
        </select>
        <p style={styles.warn}>
        Hire fee might be change according to the distence from pickup location to park
      </p>
      <p style={styles.availablility}>
      Threewheels 🛺 available time: 6.00am - 9.00pm <br></br>
      Bikes 🛵 available time: Anytime with their availability (Every bike riders are university students)
      </p>
        <h2 style={styles.title}>Select Category</h2>
      </div>
      
        <div style={styles.categoriesContainer}>
          {categories.map((category) => (
            <button
              key={category.name}
              style={{
                ...styles.categoryButton,
                ...(category.isDisabled ? styles.disabledButton : {}),
              }}
              onClick={() => handleCategorySelection(category.name)}
              disabled={category.isDisabled}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {popupMessage && (
        <Popup
          message={popupMessage}
          onClose={() => setPopupMessage(null)} // Close the popup
        />
      )}
    </>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#1E1E2C',
    color: '#FFFFFF',
  },
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
    margin: '20px 0',
  },
  dropdown: {
    width: '300px',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '30px',
    borderRadius: '5px',
    border: '1px solid #3A3A4B',
    backgroundColor: '#2C2C3A',
    color: '#FFFFFF',
  },
  categoriesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  categoryButton: {
    width: '170px',
    padding: '15px 25px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4F63AC',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  disabledButton: {
    backgroundColor: '#A5A5A5',
    cursor: 'not-allowed',
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
  warn: {
    marginTop: '10px',
    color: '#eb346e',
    textAlign: 'center',
  },
  availablility: {
    marginTop: '10px',
    color: 'green',
    textAlign: 'center',
  },
};

const popupStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#2C2C3A',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
  },
  message: {
    color: '#FFFFFF',
    fontSize: '1rem',
    marginBottom: '20px',
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: '#4F63AC',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};

export default HomePage;
