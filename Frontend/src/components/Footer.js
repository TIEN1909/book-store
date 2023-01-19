import React from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
const Footer = () => {
  return (
    <div className="footer">
      <div className="justify-content-around d-flex">
        <div className="footer-location">
          <strong className="header-strong">
            <h1 style={{ fontSize: '70px' }}>B</h1>
            <p>ookStore</p>
          </strong>
          <span>48 Cao Thắng, Hải Châu, Đà Nẵng</span>
          <span>
            book@gmail.com <br />
            +0942274558
          </span>
          <div className="footer-social">
            <Link to="">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="">
              <i className="fab fa-linkedin-in"></i>
            </Link>
            <Link to="">
              <i className="fab fa-youtube"></i>
            </Link>
            <Link to="">
              <i className="fab fa-pinterest-p"></i>
            </Link>
          </div>
        </div>
        <ul className="margin-left">
          <li className="d-flex flex-column justify-content-between">
            <h4>Explore</h4>
            <Link>About us</Link>
            <Link>Sitemap</Link>
            <Link>Bookmarks</Link>
            <Link>Sign in/Join</Link>
          </li>
          <li className="d-flex flex-column justify-content-between">
            <h4>Customer Service</h4>
            <Link>Help Center</Link>
            <Link>Returns</Link>
            <Link>Product Recalls</Link>
            <Link>Contact Us</Link>
            <Link>Store Pickup</Link>
          </li>
          <li className="d-flex flex-column justify-content-between">
            <h4>Policy</h4>
            <Link>Return Policy</Link>
            <Link>Terms Of Use</Link>
            <Link>Security</Link>
            <Link>Privacy</Link>
          </li>
          <li className="d-flex flex-column justify-content-between">
            <h4>Categories</h4>
            <Link>Action</Link>
            <Link>Comedy</Link>
            <Link>Horror</Link>
            <Link>Kids</Link>
            <Link>Romantic Comedy</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
