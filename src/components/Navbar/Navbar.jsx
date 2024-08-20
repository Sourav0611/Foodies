import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/frontend_assets/food.png';
import { assets } from '../../assets/frontend_assets/assets';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(prevState => !prevState);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
          <span className="navbar-logo-text">
            Food<span className="highlight">ies</span>
          </span>
          <img src={logo} alt="Logo" className="me-3 navbar-logo-img" />
        </a>
        <button className="navbar-toggler" type="button" onClick={toggleNav} aria-controls="navbarNav" aria-expanded={isNavOpen} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/menu" className="nav-link text-light">Menu</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-light">About Us</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-light">Contact</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link text-light cart-link">Cart</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center navbar-right">
            <img src={assets.search_icon} alt="Search" />
            <div className="d-flex align-items-center">
              <img src={assets.basket_icon} alt="Basket" />
              <div className="dot"></div>
            </div>
            <button className="btn btn-outline-light">Sign in</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
