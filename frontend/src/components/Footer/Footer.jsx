import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img className='tomatologofooter' src={ assets.logo } alt="" />
            <p> Foodies, Thanks you.</p>
            <div className="footer-social-icons">
            <a href='https://www.linkedin.com/in/sourav0611/'> <img src={assets.facebook_icon} alt="" /> </a>
            <a href='https://www.linkedin.com/in/sourav0611/'> <img src={assets.twitter_icon} alt="" /> </a>
            <a href='https://www.linkedin.com/in/sourav0611/'> <img src={assets.linkedin_icon} alt="" /> </a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+91-790989545</li>
              <li>contact@foodies.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2024 © Foodies.com - All rights reserved.</p>
    </div>
  )
}

export default Footer