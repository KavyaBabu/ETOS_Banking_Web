import React from 'react';
import { FaFacebook, FaInstagram, FaGoogle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="column">
        <h4>Company</h4>
        <ul>
          <li>Company</li>
          <li>Blogs</li>
          <li>News</li>
          <li>About Us</li>
          <li>Reviews</li>
        </ul>
      </div>
      <div className="column">
        <h4>Products</h4>
        <ul>
          <li>Personal Account</li>
          <li>Current Account</li>
          <li>Debit Card</li>
          <li>Credit Card</li>
          <li>Joint Account</li>
        </ul>
      </div>
      <div className="column">
        <h4>Support</h4>
        <ul>
          <li>Support</li>
          <li>Customer Care</li>
          <li>Business</li>
          <li>Sell and Buy Share</li>
        </ul>
      </div>
      <hr />
      <div className="social-icons">
      <h4>Follow us on</h4>
        <a href="https://facebook.com" target='blank'><FaFacebook/></a>
        <a href="https://instagram.com" target='blank'><FaInstagram /></a>
        <a href="https://google.com" target='blank'><FaGoogle /></a>
      </div>
      <div className="app-store">
      <h4>Download our app</h4>
        <img src="/Images/app-store-logo.jpg" alt="App Store" />
        <img src="/Images/google-store-logo.png" alt="Google Play Store" />
      </div>
      <div className="copyright">
        <p>&copy; 2024 ETOS Banking. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
