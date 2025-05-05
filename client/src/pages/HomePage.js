import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Chatbot from '../components/ai/Chatbot';
import './HomePage.css';

const HomePage = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        // In a real application, you'd fetch from your API
        // For demo, we'll use placeholder data
        // const response = await axios.get('/api/cars?featured=true&limit=3');
        // setFeaturedCars(response.data.data);
        
        // Placeholder data
        setFeaturedCars([
          {
            _id: '1',
            brand: 'Mercedes-Benz',
            model: 'S-Class',
            year: 2023,
            price: 450000,
            imageUrl: 'https://images.unsplash.com/photo-1622381097171-ef581e439c64?q=80&w=1000&auto=format&fit=crop',
            bodyType: 'sedan',
            description: 'The epitome of luxury, featuring cutting-edge technology and unparalleled comfort.'
          },
          {
            _id: '2',
            brand: 'Audi',
            model: 'e-tron GT',
            year: 2023,
            price: 380000,
            imageUrl: 'https://images.unsplash.com/photo-1614200185066-6b217f431bf6?q=80&w=1000&auto=format&fit=crop',
            bodyType: 'coupe',
            description: 'Electric performance that excites, with breathtaking design and sustainable innovation.'
          },
          {
            _id: '3',
            brand: 'BMW',
            model: 'X7',
            year: 2023,
            price: 420000,
            imageUrl: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=1000&auto=format&fit=crop',
            bodyType: 'suv',
            description: 'The ultimate luxury SUV with commanding presence and exceptional versatility.'
          }
        ]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load featured vehicles');
        setLoading(false);
        console.error('Error fetching featured cars:', err);
      }
    };

    fetchFeaturedCars();
  }, []);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Perfect Drive with AI Assistance</h1>
          <p className="lead">
            Experience the future of car shopping with Gargash Group's AI-powered sales assistant.
          </p>
          <div className="hero-cta">
            <Link to="/cars" className="btn btn-primary btn-lg me-3">
              Browse Cars
            </Link>
            <button 
              onClick={toggleChatbot} 
              className="btn btn-outline-light btn-lg"
            >
              Talk to AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="featured-cars">
        <div className="container">
          <h2 className="section-title">Featured Vehicles</h2>
          <p className="section-subtitle">Explore our exclusive selection of premium vehicles</p>
          
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <div className="row">
              {featuredCars.map((car) => (
                <div key={car._id} className="col-lg-4 col-md-6 mb-4">
                  <div className="car-card">
                    <div className="car-image">
                      <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
                      <div className="car-tag">{car.bodyType}</div>
                    </div>
                    <div className="car-details">
                      <h3>{car.brand} {car.model}</h3>
                      <p className="car-year">{car.year}</p>
                      <p className="car-price">AED {car.price.toLocaleString()}</p>
                      <p className="car-description">{car.description}</p>
                      <Link to={`/cars/${car._id}`} className="btn btn-outline-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-4">
            <Link to="/cars" className="btn btn-primary">
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="ai-assistant-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2>Meet Your AI Car Shopping Assistant</h2>
              <p className="lead">
                Our AI-powered assistant helps you find the perfect vehicle based on your preferences and needs.
              </p>
              <ul className="feature-list">
                <li>
                  <i className="fas fa-check-circle text-primary"></i>
                  Get personalized vehicle recommendations
                </li>
                <li>
                  <i className="fas fa-check-circle text-primary"></i>
                  Ask questions about car features and specifications
                </li>
                <li>
                  <i className="fas fa-check-circle text-primary"></i>
                  Schedule test drives with ease
                </li>
                <li>
                  <i className="fas fa-check-circle text-primary"></i>
                  Learn about financing options and special offers
                </li>
              </ul>
              <Link to="/ai-assistant" className="btn btn-primary">
                Try the Full AI Experience
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="ai-assistant-preview">
                {showChatbot ? (
                  <Chatbot />
                ) : (
                  <div className="ai-preview-placeholder">
                    <i className="fas fa-robot"></i>
                    <h3>Your AI Assistant is Ready</h3>
                    <button 
                      className="btn btn-primary" 
                      onClick={toggleChatbot}
                    >
                      Start Conversation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Premium Services</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-car"></i>
                </div>
                <h3>Test Drive</h3>
                <p>
                  Experience the thrill of driving your dream car with our convenient test drive service.
                </p>
                <Link to="/test-drive" className="btn btn-link">
                  Schedule Now <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-tools"></i>
                </div>
                <h3>Service & Maintenance</h3>
                <p>
                  Keep your vehicle in perfect condition with our expert service and maintenance.
                </p>
                <Link to="/contact" className="btn btn-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-money-bill-wave"></i>
                </div>
                <h3>Financing Solutions</h3>
                <p>
                  Flexible financing options tailored to your budget and preferences.
                </p>
                <Link to="/contact" className="btn btn-link">
                  Explore Options <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;