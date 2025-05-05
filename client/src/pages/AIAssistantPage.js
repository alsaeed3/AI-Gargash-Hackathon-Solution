import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Chatbot from '../components/ai/Chatbot';
import './AIAssistantPage.css';

const AIAssistantPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    brands: [],
    bodyTypes: [],
    budget: '',
    fuelTypes: []
  });
  const [activeTab, setActiveTab] = useState('chat');

  // Available options for the filters
  const availableBrands = ['Mercedes-Benz', 'Audi', 'BMW', 'Porsche', 'Lexus', 'Cadillac', 'Bentley', 'Rolls-Royce'];
  const availableBodyTypes = ['sedan', 'suv', 'coupe', 'hatchback', 'convertible', 'luxury'];
  const availableFuelTypes = ['gasoline', 'diesel', 'hybrid', 'electric', 'plug-in hybrid'];

  // Handle checkbox change for multi-select filters
  const handleCheckboxChange = (category, value) => {
    setPreferences(prev => {
      const currentValues = [...prev[category]];
      const index = currentValues.indexOf(value);
      
      if (index === -1) {
        // Add the value
        return {
          ...prev,
          [category]: [...currentValues, value]
        };
      } else {
        // Remove the value
        currentValues.splice(index, 1);
        return {
          ...prev,
          [category]: currentValues
        };
      }
    });
  };

  // Handle budget input change
  const handleBudgetChange = (e) => {
    setPreferences(prev => ({
      ...prev,
      budget: e.target.value
    }));
  };

  // Handle natural language input change
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Submit preferences to get recommendations
  const handleSubmitPreferences = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // For demo, we'll use placeholder data instead of API call
      // const response = await axios.post('/api/ai/recommendations', { preferences });
      // setRecommendations(response.data.data);
      
      // Simulating API delay
      setTimeout(() => {
        setRecommendations([
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
            _id: '4',
            brand: 'Porsche',
            model: 'Taycan',
            year: 2023,
            price: 400000,
            imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1000&auto=format&fit=crop',
            bodyType: 'sedan',
            description: 'Revolutionary electric performance with Porsche DNA.'
          }
        ]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setLoading(false);
    }
  };

  // Submit natural language request to get recommendations
  const handleSubmitNaturalLanguage = async (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    setLoading(true);
    
    try {
      // For demo, we'll use placeholder data instead of API call
      // const response = await axios.post('/api/ai/recommendations', { userInput });
      // setRecommendations(response.data.data);
      
      // Simulating API delay
      setTimeout(() => {
        setRecommendations([
          {
            _id: '3',
            brand: 'BMW',
            model: 'X7',
            year: 2023,
            price: 420000,
            imageUrl: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=1000&auto=format&fit=crop',
            bodyType: 'suv',
            description: 'The ultimate luxury SUV with commanding presence and exceptional versatility.'
          },
          {
            _id: '5',
            brand: 'Lexus',
            model: 'LX',
            year: 2023,
            price: 390000,
            imageUrl: 'https://images.unsplash.com/photo-1675063939077-56678ef70710?q=80&w=1000&auto=format&fit=crop',
            bodyType: 'suv',
            description: 'Premium luxury SUV with advanced off-road capabilities and refined comfort.'
          }
        ]);
        setUserInput('');
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setLoading(false);
    }
  };

  return (
    <div className="ai-assistant-page">
      <div className="container py-5">
        <h1 className="page-title">AI Sales Assistant</h1>
        <p className="page-subtitle">
          Let our AI help you find your perfect vehicle or answer any questions about our cars and services.
        </p>
        
        <div className="row">
          {/* Left column with chatbot */}
          <div className="col-lg-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'chat' ? 'active' : ''}`}
                      onClick={() => setActiveTab('chat')}
                    >
                      <i className="fas fa-comments me-2"></i>
                      Ask AI Assistant
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'preferences' ? 'active' : ''}`}
                      onClick={() => setActiveTab('preferences')}
                    >
                      <i className="fas fa-filter me-2"></i>
                      Set Preferences
                    </button>
                  </li>
                </ul>
              </div>
              <div className="card-body p-0">
                {activeTab === 'chat' ? (
                  <div className="chatbot-container">
                    <Chatbot />
                  </div>
                ) : (
                  <div className="preferences-form p-4">
                    <h3>Car Preferences</h3>
                    <p>Select your preferences and our AI will recommend the best cars for you.</p>
                    
                    <form onSubmit={handleSubmitPreferences}>
                      <div className="mb-4">
                        <label className="form-label fw-bold">Brand Preferences</label>
                        <div className="checkbox-group">
                          {availableBrands.map((brand, index) => (
                            <div className="form-check" key={index}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`brand-${index}`}
                                checked={preferences.brands.includes(brand)}
                                onChange={() => handleCheckboxChange('brands', brand)}
                              />
                              <label className="form-check-label" htmlFor={`brand-${index}`}>
                                {brand}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="form-label fw-bold">Body Type</label>
                        <div className="checkbox-group">
                          {availableBodyTypes.map((type, index) => (
                            <div className="form-check" key={index}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`body-${index}`}
                                checked={preferences.bodyTypes.includes(type)}
                                onChange={() => handleCheckboxChange('bodyTypes', type)}
                              />
                              <label className="form-check-label" htmlFor={`body-${index}`}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="form-label fw-bold">Fuel Type</label>
                        <div className="checkbox-group">
                          {availableFuelTypes.map((type, index) => (
                            <div className="form-check" key={index}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`fuel-${index}`}
                                checked={preferences.fuelTypes.includes(type)}
                                onChange={() => handleCheckboxChange('fuelTypes', type)}
                              />
                              <label className="form-check-label" htmlFor={`fuel-${index}`}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="budget" className="form-label fw-bold">Budget (AED)</label>
                        <input
                          type="number"
                          className="form-control"
                          id="budget"
                          placeholder="Maximum price"
                          value={preferences.budget}
                          onChange={handleBudgetChange}
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Finding matches...
                          </>
                        ) : (
                          <>Get Recommendations</>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right column with natural language input and recommendations */}
          <div className="col-lg-6">
            <div className="card mb-4 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-magic me-2"></i>
                  Tell us what you're looking for
                </h5>
              </div>
              <div className="card-body">
                <p>Describe your ideal car in your own words and our AI will find the best matches for you.</p>
                <form onSubmit={handleSubmitNaturalLanguage}>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Example: I need a spacious family SUV with good fuel efficiency under 400,000 AED"
                      value={userInput}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={!userInput.trim() || loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Finding matches...
                      </>
                    ) : (
                      <>Find My Car</>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Recommendations Section */}
            <div className="recommendations-section">
              <h3>
                <i className="fas fa-star me-2 text-warning"></i>
                Recommended Cars For You
              </h3>
              
              {loading ? (
                <div className="text-center my-5 py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Our AI is finding the best cars for you...</p>
                </div>
              ) : recommendations.length > 0 ? (
                <div className="row">
                  {recommendations.map((car) => (
                    <div key={car._id} className="col-md-6 mb-4">
                      <div className="car-recommendation-card">
                        <div className="car-recommendation-image">
                          <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
                          <div className="car-recommendation-tag">{car.bodyType}</div>
                        </div>
                        <div className="car-recommendation-details">
                          <h4>{car.brand} {car.model}</h4>
                          <div className="car-recommendation-info">
                            <span className="year">{car.year}</span>
                            <span className="price">AED {car.price.toLocaleString()}</span>
                          </div>
                          <p className="car-recommendation-description">{car.description}</p>
                          <div className="car-recommendation-actions">
                            <Link to={`/cars/${car._id}`} className="btn btn-outline-primary btn-sm">
                              View Details
                            </Link>
                            <Link to={`/test-drive?car=${car._id}`} className="btn btn-primary btn-sm">
                              Schedule Test Drive
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-recommendations">
                  <i className="fas fa-car-side"></i>
                  <p>Use the chatbot or set your preferences to get personalized car recommendations</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;