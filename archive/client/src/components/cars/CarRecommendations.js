import React from 'react';
import { Link } from 'react-router-dom';
import './CarRecommendations.css';

const CarRecommendations = ({ recommendations, loading, error }) => {
  if (loading) {
    return (
      <div className="car-recommendations-loading text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Finding the perfect vehicles for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="car-recommendations-error alert alert-danger" role="alert">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="car-recommendations-empty text-center py-5">
        <div className="empty-icon">
          <i className="fas fa-car-side"></i>
        </div>
        <h3>No Recommendations Yet</h3>
        <p>
          Use the form to filter your preferences and get personalized car recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="car-recommendations">
      <h3>Recommended Vehicles for You</h3>
      <p className="recommendation-subtext">
        Based on your preferences, here are {recommendations.length} vehicles we think you'll love.
      </p>

      <div className="row">
        {recommendations.map((car) => (
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
    </div>
  );
};

export default CarRecommendations;