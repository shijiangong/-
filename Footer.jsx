import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logo.JPG'

const Footer = () => {
  return (
    <header className="header">
      <nav className="navigation">
        <div className="desktop-nav">
          <Link to="/">Dashboard</Link> | <Link to="/wordcolour">Word Colour</Link>|  <img src={logo} className='logo' alt='logo'/>  | <Link to="/aimlabs">Aimlabs</Link> | <Link to="/tower">Tower of Hanoi</Link>
        </div>
        <div className="mobile-nav">
          <Link to="/">Da</Link> | <Link to="/wordcolour">Wc</Link> |  <img src={logo} className='logo' alt='logo'/>  | <Link to="/aimlabs">Al</Link> | <Link to="/tower">T</Link>
        </div>
      </nav>
    </header>
  );
};

export default Footer;
