import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <div className="footer-info">
                <Link to="/" className="footer-logo">
                  <img 
                    src="https://placehold.co/200x50?text=Gargash+Group" 
                    alt="Gargash Group" 
                    height="40" 
                  />
                </Link>
                <p className="mt-3">
                  Gargash Group is a leading luxury automotive dealership in the UAE, 
                  offering exceptional vehicles and premium services for discerning customers.
                </p>
                <div className="social-links">
                  <a href="#" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" aria-label="YouTube">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/cars">Cars</Link>
                </li>
                <li>
                  <Link to="/ai-assistant">AI Assistant</Link>
                </li>
                <li>
                  <Link to="/test-drive">Test Drive</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h4>Our Services</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/services">New Car Sales</Link>
                </li>
                <li>
                  <Link to="/services">Pre-Owned Vehicles</Link>
                </li>
                <li>
                  <Link to="/services">Vehicle Financing</Link>
                </li>
                <li>
                  <Link to="/services">Service & Maintenance</Link>
                </li>
                <li>
                  <Link to="/services">Parts & Accessories</Link>
                </li>
                <li>
                  <Link to="/services">Extended Warranty</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
              <h4>Contact Us</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Sheikh Zayed Road, Dubai, UAE</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone-alt"></i>
                  <span>+971 4 XXX XXXX</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>info@gargashgroup.com</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-clock"></i>
                  <span>Mon-Sat: 9:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="copyright">
                <p>© {currentYear} Gargash Group. All rights reserved.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
                <a href="#">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;