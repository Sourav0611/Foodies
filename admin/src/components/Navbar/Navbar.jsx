import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <span className="company-name">Foodies</span>
          <sub className="admin-panel">Admin Panel</sub> {/* Subscript for Admin Panel */}
          <img className="logo" src={assets.logo} alt="Logo" />
        </div>
        <div className="navbar-right">
          <img className="profile" src={assets.profile_image} alt="Profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
