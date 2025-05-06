import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setExpanded(false);
  }, [location]);

  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img 
            src="https://placehold.co/200x50?text=Gargash+Group" 
            alt="Gargash Group" 
            height="40" 
          />
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setExpanded(!expanded)}
          aria-controls="navbarNav" 
          aria-expanded={expanded} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cars">
                Cars
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ai-assistant">
                AI Assistant
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/test-drive">
                Test Drive
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          
          <div className="nav-buttons">
            <Link to="/ai-assistant" className="btn btn-outline-primary me-2">
              <i className="fas fa-robot me-1"></i> AI Help
            </Link>
            <Link to="/test-drive" className="btn btn-primary">
              <i className="fas fa-car me-1"></i> Book Test Drive
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;