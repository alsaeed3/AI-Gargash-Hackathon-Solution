import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarDetailPage.css';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await axios.get(`/api/cars/${id}`);
        // setCar(response.data.data);
        
        // For demo, simulate API call with sample data
        setTimeout(() => {
          // Sample car data for the selected ID
          const sampleCar = {
            _id: id,
            brand: id === '1' ? 'Mercedes-Benz' : id === '2' ? 'Audi' : 'BMW',
            model: id === '1' ? 'S-Class' : id === '2' ? 'e-tron GT' : 'X7',
            year: 2023,
            price: id === '1' ? 450000 : id === '2' ? 380000 : 420000,
            imageUrl: id === '1' 
              ? 'https://images.unsplash.com/photo-1622381097171-ef581e439c64?q=80&w=1000&auto=format&fit=crop'
              : id === '2'
              ? 'https://images.unsplash.com/photo-1614200185066-6b217f431bf6?q=80&w=1000&auto=format&fit=crop'
              : 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=1000&auto=format&fit=crop',
            additionalImages: [
              'https://images.unsplash.com/photo-1605515298946-d694313bd7ea?q=80&w=1000&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1499062918700-389fa905494e?q=80&w=1000&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1534053525087-daf5ea0ba744?q=80&w=1000&auto=format&fit=crop'
            ],
            bodyType: id === '1' ? 'sedan' : id === '2' ? 'coupe' : 'suv',
            fuelType: id === '1' ? 'hybrid' : id === '2' ? 'electric' : 'gasoline',
            transmission: 'automatic',
            color: id === '1' ? 'Obsidian Black' : id === '2' ? 'Daytona Grey' : 'Alpine White',
            mileage: 0,
            engineCapacity: id === '1' ? 3982 : id === '2' ? 0 : 4395,
            horsepower: id === '1' ? 496 : id === '2' ? 590 : 523,
            description: id === '1' 
              ? 'The epitome of luxury, featuring cutting-edge technology and unparalleled comfort. The S-Class represents the pinnacle of Mercedes-Benz engineering and design.'
              : id === '2'
              ? 'Electric performance that excites, with breathtaking design and sustainable innovation. The Audi e-tron GT combines the best of both worlds: exhilarating driving dynamics and zero emissions.'
              : 'The ultimate luxury SUV with commanding presence and exceptional versatility. The BMW X7 delivers first-class comfort for up to seven passengers while maintaining the brand\'s signature driving experience.',
            features: [
              'Premium leather interior',
              'Advanced driver assistance systems',
              'Panoramic sunroof',
              'Surround sound system',
              'Heated and ventilated seats',
              'Wireless smartphone charging',
              '360-degree camera system',
              'Adaptive cruise control',
              'Lane keeping assist',
              'Ambient lighting package'
            ],
            specifications: {
              dimensions: {
                length: id === '1' ? 5289 : id === '2' ? 4989 : 5151,
                width: id === '1' ? 1954 : id === '2' ? 1964 : 2000,
                height: id === '1' ? 1503 : id === '2' ? 1396 : 1805,
                wheelbase: id === '1' ? 3216 : id === '2' ? 2900 : 3105
              },
              performance: {
                acceleration: id === '1' ? 4.8 : id === '2' ? 3.3 : 4.7,
                topSpeed: id === '1' ? 250 : id === '2' ? 245 : 250,
                fuelConsumption: id === '1' ? 7.8 : id === '2' ? 0 : 11.4
              }
            }
          };
          
          setCar(sampleCar);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching car details:', err);
        setError('Failed to load car details. Please try again.');
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleTestDriveClick = () => {
    navigate(`/test-drive?car=${id}`);
  };

  if (loading) {
    return (
      <div className="car-detail-page">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="car-detail-page">
        <div className="container py-5">
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error || 'Car not found'}
          </div>
          <div className="text-center mt-4">
            <Link to="/cars" className="btn btn-primary">
              <i className="fas fa-arrow-left me-2"></i>
              Back to Cars
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="car-detail-page">
      <div className="container py-5">
        <div className="car-detail-header">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>{car.year} {car.brand} {car.model}</h1>
              <div className="car-type-badge">{car.bodyType}</div>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="car-price">AED {car.price.toLocaleString()}</div>
              <div className="car-actions mt-3">
                <button
                  className="btn btn-outline-primary me-3"
                  onClick={() => window.open('tel:+97142391000')}
                >
                  <i className="fas fa-phone-alt me-2"></i>
                  Contact Us
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleTestDriveClick}
                >
                  <i className="fas fa-car me-2"></i>
                  Schedule Test Drive
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="car-showcase mb-5">
          <div className="main-image">
            <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
          </div>
          <div className="thumbnail-images">
            {car.additionalImages.map((image, index) => (
              <div className="thumbnail" key={index}>
                <img src={image} alt={`${car.brand} ${car.model} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="car-detail-tabs mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'specifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'features' ? 'active' : ''}`}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
            </li>
          </ul>
        </div>

        <div className="car-detail-content">
          {activeTab === 'overview' && (
            <div className="car-overview">
              <div className="row">
                <div className="col-lg-8">
                  <h2>About this {car.brand} {car.model}</h2>
                  <p className="car-description">{car.description}</p>
                  
                  <div className="car-highlights">
                    <h3>Highlights</h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="highlight-item">
                          <div className="highlight-icon">
                            <i className="fas fa-tachometer-alt"></i>
                          </div>
                          <div className="highlight-details">
                            <h4>Performance</h4>
                            <p>{car.horsepower} HP | {car.specifications.performance.acceleration}s 0-100 km/h</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="highlight-item">
                          <div className="highlight-icon">
                            <i className="fas fa-gas-pump"></i>
                          </div>
                          <div className="highlight-details">
                            <h4>Fuel Type</h4>
                            <p>{car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="highlight-item">
                          <div className="highlight-icon">
                            <i className="fas fa-palette"></i>
                          </div>
                          <div className="highlight-details">
                            <h4>Exterior Color</h4>
                            <p>{car.color}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="highlight-item">
                          <div className="highlight-icon">
                            <i className="fas fa-cogs"></i>
                          </div>
                          <div className="highlight-details">
                            <h4>Transmission</h4>
                            <p>{car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4">
                  <div className="car-quick-info">
                    <h3>Quick Information</h3>
                    <ul>
                      <li>
                        <span>Brand:</span>
                        <span>{car.brand}</span>
                      </li>
                      <li>
                        <span>Model:</span>
                        <span>{car.model}</span>
                      </li>
                      <li>
                        <span>Year:</span>
                        <span>{car.year}</span>
                      </li>
                      <li>
                        <span>Body Type:</span>
                        <span>{car.bodyType.charAt(0).toUpperCase() + car.bodyType.slice(1)}</span>
                      </li>
                      <li>
                        <span>Mileage:</span>
                        <span>{car.mileage === 0 ? 'New' : `${car.mileage.toLocaleString()} km`}</span>
                      </li>
                      <li>
                        <span>Engine:</span>
                        <span>
                          {car.fuelType === 'electric' 
                            ? 'Electric Motor' 
                            : `${(car.engineCapacity / 1000).toFixed(1)}L`}
                        </span>
                      </li>
                      <li>
                        <span>Horsepower:</span>
                        <span>{car.horsepower} HP</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="ai-assistance-card">
                    <div className="ai-icon">
                      <i className="fas fa-robot"></i>
                    </div>
                    <h4>Need Help Deciding?</h4>
                    <p>Our AI assistant can help you determine if this car is right for you.</p>
                    <Link to="/ai-assistant" className="btn btn-primary btn-block">
                      Chat with AI Assistant
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="car-specifications">
              <h2>Technical Specifications</h2>
              
              <div className="specs-group">
                <h3>Dimensions & Weight</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="spec-item">
                      <div className="spec-name">Length</div>
                      <div className="spec-value">{car.specifications.dimensions.length} mm</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="spec-item">
                      <div className="spec-name">Width</div>
                      <div className="spec-value">{car.specifications.dimensions.width} mm</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="spec-item">
                      <div className="spec-name">Height</div>
                      <div className="spec-value">{car.specifications.dimensions.height} mm</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="spec-item">
                      <div className="spec-name">Wheelbase</div>
                      <div className="spec-value">{car.specifications.dimensions.wheelbase} mm</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="specs-group">
                <h3>Engine & Performance</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="spec-item">
                      <div className="spec-name">Engine Type</div>
                      <div className="spec-value">
                        {car.fuelType === 'electric' 
                          ? 'Electric Motor' 
                          : car.fuelType === 'hybrid'
                          ? 'Hybrid Powertrain'
                          : `${(car.engineCapacity / 1000).toFixed(1)}L ${car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)}`}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="spec-item">
                      <div className="spec-name">Max Power</div>
                      <div className="spec-value">{car.horsepower} HP</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="spec-item">
                      <div className="spec-name">Acceleration (0-100 km/h)</div>
                      <div className="spec-value">{car.specifications.performance.acceleration} seconds</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="spec-item">
                      <div className="spec-name">Top Speed</div>
                      <div className="spec-value">{car.specifications.performance.topSpeed} km/h</div>
                    </div>
                  </div>
                  {car.fuelType !== 'electric' && (
                    <div className="col-md-6">
                      <div className="spec-item">
                        <div className="spec-name">Fuel Consumption (Combined)</div>
                        <div className="spec-value">{car.specifications.performance.fuelConsumption} L/100km</div>
                      </div>
                    </div>
                  )}
                  <div className="col-md-6">
                    <div className="spec-item">
                      <div className="spec-name">Transmission</div>
                      <div className="spec-value">{car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="car-features">
              <h2>Features & Equipment</h2>
              <div className="row">
                {car.features.map((feature, index) => (
                  <div className="col-md-6 col-lg-4" key={index}>
                    <div className="feature-item">
                      <i className="fas fa-check-circle"></i>
                      <span>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="car-cta-section mt-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3>Ready to experience the {car.year} {car.brand} {car.model}?</h3>
              <p>Schedule a test drive today and feel the luxury and performance for yourself.</p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleTestDriveClick}
              >
                <i className="fas fa-calendar-alt me-2"></i>
                Book a Test Drive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;