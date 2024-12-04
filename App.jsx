import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Home from "./components/Dashboard"
import game1 from "./components/Game_one"
import game2 from "./components/Game_two"
import game3 from "./components/Game_three"

const App = () => {
  return (
    <Router>
      <div className="app">
        <main className="main-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wordcolour" element={game1} />
            <Route path="/aimlabs" element={game2} />
            <Route path="/tower" element={game3} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
