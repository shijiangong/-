import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [gamesWon, setGamesWon] = useState(0);

  // Function to fetch the initial score
  const fetchInitialScore = async () => {
    try {
      const response = await fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json');
      const data = await response.json();
      const initialScore = data.score || 0;
      setGamesWon(initialScore);
      localStorage.setItem('gamesWon', initialScore);
      localStorage.setItem('ini', 1);
    } catch (error) {
      console.error('Error fetching initial score:', error);
    }
  };

  // Load gamesWon from localStorage or fetch it from the API
  useEffect(() => {
    const storedScore = localStorage.getItem('gamesWon');
    if (storedScore === null) {
      fetchInitialScore();
    } else {
      setGamesWon(parseInt(storedScore, 10));
    }
  }, []);

  // Handle reset button click
  const handleReset = () => {
    fetchInitialScore(); // Reset to the initial value from the API
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Please choose an option from the navbar.</h1>
      <p style={styles.gamesWon}>
        Games won: {gamesWon} <button onClick={handleReset} style={styles.resetButton}>reset</button>
      </p>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  title: {
    fontSize: '2em',
    color: 'red',
    marginBottom: '1rem',
  },
  gamesWon: {
    fontSize: '1.5em',
  },
  resetButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    fontSize: '1em',
    cursor: 'pointer',
  },
};

export default Dashboard;
