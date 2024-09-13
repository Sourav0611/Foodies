import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(prevState => !prevState);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to='/' className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
          <span className="navbar-logo-text">
            Food<span className="highlight">ies</span>
          </span>
          <img src={assets.logo} alt="Logo" className="me-3 navbar-logo-img" />
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleNav} aria-controls="navbarNav" aria-expanded={isNavOpen} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" onClick={() => setMenu("home")} className={`nav-link ${menu === "home" ? "active" : ""}`}>Home</Link>
            </li>
            <li className="nav-item">
              <a href='#explore-menu' onClick={() => setMenu("menu")} className={`nav-link ${menu === "menu" ? "active" : ""}`}>Menu</a>
            </li>
            <li className="nav-item">
              <a href='#app-download' onClick={() => setMenu("mobile-app")} className={`nav-link ${menu === "mobile-app" ? "active" : ""}`}>Mobile App</a>
            </li>
            <li className="nav-item">
              <a href='#footer' onClick={() => setMenu("contact-us")} className={`nav-link ${menu === "contact-us" ? "active" : ""}`}>Contact Us</a>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link cart-link">Cart</Link>
            </li>
          </ul>
          <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
              <Link to='/cart'><img className='basketlogo' src={assets.basket_icon} alt="Cart" /></Link>
              <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            </div>
            {!token ? <button className='signbutton' onClick={() => setShowLogin(true)}>Sign in</button>
              : <div className='navbar-profile'>
                <img src={assets.profile_icon} className='white-filter' alt="Profile" />
                <ul className="nav-profile-dropdown">
                  <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="Orders" /><p>Orders</p></li>
                  <hr />
                  <li onClick={logout}><img src={assets.logout_icon} alt="Logout" /><p>Logout</p></li>
                </ul>
              </div>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
