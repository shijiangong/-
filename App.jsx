import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Home from "./components/Dashboard"
import Game1 from "./components/Game_one"
import Game2 from "./components/Game_two"
import Game3 from "./components/Game_three"

const App = () => {
  return (
    <Router>
      <div className="app">
        <main className="main-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wordcolour" element={<Game1/>} />
            <Route path="/aimlabs" element={<Game2/>} />
            <Route path="/tower" element={<Game3/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
