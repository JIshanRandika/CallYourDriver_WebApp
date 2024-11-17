import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getParks, getCategories } from '../services/api';
import Header from '../components/Header';


function HomePage() {
  const [parkName, setParkName] = useState('');
  const [parks, setParks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parkData = await getParks();
        const categoryData = await getCategories();
        setParks(parkData.data.map((park) => park.name));
        setCategories(categoryData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load parks and categories. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategorySelection = (category) => {
    if (!parkName) {
      alert('Please select a park before choosing a category.');
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
    <div>
        <Header />
        <div style={styles.container}>
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

      <h2 style={styles.title}>Select Category</h2>
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
};

export default HomePage;
