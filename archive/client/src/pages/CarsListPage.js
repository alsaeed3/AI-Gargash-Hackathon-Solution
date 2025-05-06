import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CarPreferencesForm from '../components/cars/CarPreferencesForm';
import CarRecommendations from '../components/cars/CarRecommendations';
import './CarsListPage.css';

const CarsListPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // In a real application, you would fetch from your API
        // const response = await axios.get('/api/cars');
        // setCars(response.data.data);
        // setFilteredCars(response.data.data);
        
        // For demo purposes, simulate an API call with sample data
        setTimeout(() => {
          const sampleCars = [
            {
              _id: '1',
              brand: 'Mercedes-Benz',
              model: 'S-Class',
              year: 2023,
              price: 450000,
              imageUrl: 'https://images.unsplash.com/photo-1622381097171-ef581e439c64?q=80&w=1000&auto=format&fit=crop',
              bodyType: 'sedan',
              fuelType: 'hybrid',
              transmission: 'automatic',
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
              fuelType: 'electric',
              transmission: 'automatic',
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
              fuelType: 'gasoline',
              transmission: 'automatic',
              description: 'The ultimate luxury SUV with commanding presence and exceptional versatility.'
            },
            {
              _id: '4',
              brand: 'Lexus',
              model: 'LS',
              year: 2023,
              price: 350000,
              imageUrl: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=1000&auto=format&fit=crop',
              bodyType: 'sedan',
              fuelType: 'hybrid',
              transmission: 'automatic',
              description: 'Japanese luxury craftsmanship meets innovative technology for a serene driving experience.'
            },
            {
              _id: '5',
              brand: 'Jaguar',
              model: 'I-Pace',
              year: 2023,
              price: 370000,
              imageUrl: 'https://images.unsplash.com/photo-1601066875647-8eb9c8175dc2?q=80&w=1000&auto=format&fit=crop',
              bodyType: 'suv',
              fuelType: 'electric',
              transmission: 'automatic',
              description: 'Award-winning all-electric performance SUV with distinctive styling and exceptional handling.'
            },
            {
              _id: '6',
              brand: 'Land Rover',
              model: 'Range Rover',
              year: 2023,
              price: 480000,
              imageUrl: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=1000&auto=format&fit=crop',
              bodyType: 'suv',
              fuelType: 'gasoline',
              transmission: 'automatic',
              description: 'The definitive luxury SUV combining peerless refinement, capability, and sophistication.'
            }
          ];
          setCars(sampleCars);
          setFilteredCars(sampleCars);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load cars. Please try again later.');
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handlePreferencesSubmit = async (preferences) => {
    setFilterLoading(true);
    
    try {
      // In a real application, you would call your API
      // const response = await axios.post('/api/cars/recommendations', { preferences });
      // setFilteredCars(response.data.data);
      
      // For demo, filter the sample data based on preferences
      setTimeout(() => {
        let filtered = [...cars];
        
        if (preferences.brands && preferences.brands.length > 0) {
          filtered = filtered.filter(car => preferences.brands.includes(car.brand));
        }
        
        if (preferences.bodyTypes && preferences.bodyTypes.length > 0) {
          filtered = filtered.filter(car => preferences.bodyTypes.includes(car.bodyType));
        }
        
        if (preferences.fuelTypes && preferences.fuelTypes.length > 0) {
          filtered = filtered.filter(car => preferences.fuelTypes.includes(car.fuelType));
        }
        
        if (preferences.budget) {
          filtered = filtered.filter(car => car.price <= Number(preferences.budget));
        }
        
        setFilteredCars(filtered);
        setFilterLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error filtering cars:', err);
      setError('Failed to apply filters. Please try again.');
      setFilterLoading(false);
    }
  };

  // Handle showing/hiding filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (loading) {
    return (
      <div className="cars-list-page">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading our exclusive collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cars-list-page">
        <div className="container py-5">
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cars-list-page">
      <div className="container py-5">
        <div className="page-header text-center">
          <h1>Our Exclusive Collection</h1>
          <p className="lead">
            Discover our handpicked selection of premium vehicles that redefine luxury and performance.
          </p>
        </div>
        
        <div className="filter-toggle mb-4">
          <button 
            className="btn btn-outline-primary" 
            onClick={toggleFilters}
          >
            <i className={`fas fa-filter me-2`}></i>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {showFilters && (
          <div className="car-filters mb-4">
            <CarPreferencesForm
              onSubmit={handlePreferencesSubmit}
              isLoading={filterLoading}
            />
          </div>
        )}
        
        {filterLoading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Filtering...</span>
            </div>
            <p className="mt-2">Finding the perfect match...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="no-results text-center py-4">
            <i className="fas fa-search-minus mb-3"></i>
            <h3>No Matching Vehicles</h3>
            <p>
              We couldn't find any vehicles matching your criteria. 
              Please try adjusting your filters or contact us for assistance.
            </p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => {
                setFilteredCars(cars);
                setShowFilters(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="row">
            {filteredCars.map((car) => (
              <div className="col-lg-4 col-md-6 mb-4" key={car._id}>
                <div className="car-card">
                  <div className="car-image">
                    <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
                    <div className="car-tag">{car.bodyType}</div>
                  </div>
                  <div className="car-details">
                    <h4>{car.brand} {car.model}</h4>
                    <div className="car-info">
                      <span className="car-year">{car.year}</span>
                      <span className="car-price">AED {car.price.toLocaleString()}</span>
                    </div>
                    <p className="car-description">{car.description}</p>
                    <div className="car-features">
                      <span><i className="fas fa-gas-pump me-1"></i> {car.fuelType}</span>
                      <span><i className="fas fa-cogs me-1"></i> {car.transmission}</span>
                    </div>
                    <div className="car-actions">
                      <Link to={`/cars/${car._id}`} className="btn btn-outline-primary">
                        View Details
                      </Link>
                      <Link to={`/test-drive?car=${car._id}`} className="btn btn-primary">
                        Test Drive
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-4">
          <Link to="/ai-assistant" className="btn btn-primary">
            <i className="fas fa-robot me-2"></i>
            Get AI Recommendations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarsListPage;