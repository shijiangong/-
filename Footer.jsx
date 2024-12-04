import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logo.JPG'

const Footer = () => {
  return (
    <header className="header">
      <nav className="navigation">
        <div className="desktop-nav">
          <Link to="/">Dashboard</Link> | <Link to="/blanko">Word Colour</Link>|  <img src={logo} className='logo' alt='logo'/>  | <Link to="/slido">Aimlabs</Link> | <Link to="/tetro">Tower of Hanoi</Link>
        </div>
        <div className="mobile-nav">
          <Link to="/">Da</Link> | <Link to="/blanko">Wc</Link> |  <img src={logo} className='logo' alt='logo'/>  | <Link to="/slido">Al</Link> | <Link to="/tetro">T</Link>
        </div>
      </nav>
    </header>
  );
};

export default Footer;
