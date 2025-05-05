import React, { useState } from 'react';
import './CarPreferencesForm.css';

const CarPreferencesForm = ({ onSubmit, isLoading }) => {
  const [preferences, setPreferences] = useState({
    budget: '',
    brands: [],
    bodyTypes: [],
    fuelTypes: [],
    features: []
  });
  
  // Available options for form selections
  const availableBrands = ['Mercedes-Benz', 'BMW', 'Audi', 'Lexus', 'Infiniti', 'Cadillac', 'Jaguar', 'Land Rover'];
  const availableBodyTypes = ['sedan', 'suv', 'coupe', 'convertible', 'hatchback', 'wagon', 'luxury'];
  const availableFuelTypes = ['gasoline', 'diesel', 'hybrid', 'electric', 'plug-in hybrid'];
  const availableFeatures = [
    'Leather Seats', 'Navigation System', 'Sunroof', 'Parking Assist', 
    'Blind Spot Monitor', 'Heated Seats', 'Apple CarPlay', 'Android Auto',
    'Adaptive Cruise Control', 'Lane Departure Warning'
  ];

  // Handle checkbox changes
  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setPreferences(prev => ({
        ...prev,
        [category]: [...prev[category], value]
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        [category]: prev[category].filter(item => item !== value)
      }));
    }
  };

  // Handle budget input change
  const handleBudgetChange = (e) => {
    setPreferences(prev => ({
      ...prev,
      budget: e.target.value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <div className="car-preferences-form">
      <h3>Find Your Perfect Car</h3>
      <p>Tell us about your preferences, and we'll recommend the best vehicles for you.</p>
      
      <form onSubmit={handleSubmit}>
        {/* Budget Range */}
        <div className="form-group">
          <label htmlFor="budget">Maximum Budget (AED)</label>
          <select 
            id="budget" 
            className="form-control" 
            value={preferences.budget}
            onChange={handleBudgetChange}
          >
            <option value="">Select your budget</option>
            <option value="150000">Up to 150,000 AED</option>
            <option value="250000">Up to 250,000 AED</option>
            <option value="350000">Up to 350,000 AED</option>
            <option value="450000">Up to 450,000 AED</option>
            <option value="550000">Up to 550,000 AED</option>
            <option value="9999999">No limit</option>
          </select>
        </div>
        
        {/* Brand Preferences */}
        <div className="form-group">
          <label>Preferred Brands</label>
          <div className="checkbox-group">
            {availableBrands.map(brand => (
              <div key={brand} className="form-check">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  className="form-check-input"
                  value={brand}
                  checked={preferences.brands.includes(brand)}
                  onChange={e => handleCheckboxChange(e, 'brands')}
                />
                <label 
                  htmlFor={`brand-${brand}`} 
                  className="form-check-label"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Body Type Preferences */}
        <div className="form-group">
          <label>Vehicle Type</label>
          <div className="checkbox-group">
            {availableBodyTypes.map(bodyType => (
              <div key={bodyType} className="form-check">
                <input
                  type="checkbox"
                  id={`bodyType-${bodyType}`}
                  className="form-check-input"
                  value={bodyType}
                  checked={preferences.bodyTypes.includes(bodyType)}
                  onChange={e => handleCheckboxChange(e, 'bodyTypes')}
                />
                <label 
                  htmlFor={`bodyType-${bodyType}`} 
                  className="form-check-label"
                >
                  {bodyType.charAt(0).toUpperCase() + bodyType.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Fuel Type Preferences */}
        <div className="form-group">
          <label>Fuel Type</label>
          <div className="checkbox-group">
            {availableFuelTypes.map(fuelType => (
              <div key={fuelType} className="form-check">
                <input
                  type="checkbox"
                  id={`fuelType-${fuelType}`}
                  className="form-check-input"
                  value={fuelType}
                  checked={preferences.fuelTypes.includes(fuelType)}
                  onChange={e => handleCheckboxChange(e, 'fuelTypes')}
                />
                <label 
                  htmlFor={`fuelType-${fuelType}`} 
                  className="form-check-label"
                >
                  {fuelType.charAt(0).toUpperCase() + fuelType.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Key Features */}
        <div className="form-group">
          <label>Key Features</label>
          <div className="checkbox-group">
            {availableFeatures.map(feature => (
              <div key={feature} className="form-check">
                <input
                  type="checkbox"
                  id={`feature-${feature.replace(/\s+/g, '')}`}
                  className="form-check-input"
                  value={feature}
                  checked={preferences.features.includes(feature)}
                  onChange={e => handleCheckboxChange(e, 'features')}
                />
                <label 
                  htmlFor={`feature-${feature.replace(/\s+/g, '')}`} 
                  className="form-check-label"
                >
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Finding matches...
              </>
            ) : (
              <>Get Recommendations</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarPreferencesForm;