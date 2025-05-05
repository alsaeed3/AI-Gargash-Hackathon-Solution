import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TestDrivePage.css';

const TestDrivePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const carId = searchParams.get('car');

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Get date options for the next 14 days
  useEffect(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends (Friday and Saturday in UAE)
      if (date.getDay() !== 5 && date.getDay() !== 6) {
        const formattedDate = date.toISOString().split('T')[0];
        dates.push({
          value: formattedDate,
          label: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })
        });
      }
    }
    
    setAvailableDates(dates);
  }, []);

  // Fetch car details if a carId is provided
  useEffect(() => {
    if (carId) {
      // In a real application, you would fetch from your API
      // For demo, we'll use placeholder data
      // const fetchCar = async () => {
      //   try {
      //     const response = await axios.get(`/api/cars/${carId}`);
      //     setCar(response.data.data);
      //     setLoading(false);
      //   } catch (err) {
      //     setError('Failed to load car details');
      //     setLoading(false);
      //   }
      // };
      
      // fetchCar();
      
      // Placeholder data
      setTimeout(() => {
        const mockCar = {
          _id: carId,
          brand: carId === '1' ? 'Mercedes-Benz' : carId === '2' ? 'Audi' : 'BMW',
          model: carId === '1' ? 'S-Class' : carId === '2' ? 'e-tron GT' : 'X7',
          year: 2023,
          price: carId === '1' ? 450000 : carId === '2' ? 380000 : 420000,
          imageUrl: carId === '1' 
            ? 'https://images.unsplash.com/photo-1622381097171-ef581e439c64?q=80&w=1000&auto=format&fit=crop'
            : carId === '2'
            ? 'https://images.unsplash.com/photo-1614200185066-6b217f431bf6?q=80&w=1000&auto=format&fit=crop'
            : 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=1000&auto=format&fit=crop',
          bodyType: carId === '1' ? 'sedan' : carId === '2' ? 'coupe' : 'suv',
          description: carId === '1' 
            ? 'The epitome of luxury, featuring cutting-edge technology and unparalleled comfort.'
            : carId === '2'
            ? 'Electric performance that excites, with breathtaking design and sustainable innovation.'
            : 'The ultimate luxury SUV with commanding presence and exceptional versatility.'
        };
        
        setCar(mockCar);
        setLoading(false);
      }, 800);
    } else {
      setLoading(false);
    }
  }, [carId]);

  // Generate time slots when a date is selected
  useEffect(() => {
    if (selectedDate) {
      // In a real application, you would fetch available time slots from your API
      // For demo, we'll generate sample time slots
      // const fetchTimeSlots = async () => {
      //   try {
      //     const response = await axios.get(`/api/appointments/available-slots?date=${selectedDate}&carId=${carId}`);
      //     setAvailableSlots(response.data.data);
      //   } catch (err) {
      //     setError('Failed to load available time slots');
      //   }
      // };
      
      // fetchTimeSlots();
      
      // Generate sample time slots
      const sampleSlots = [];
      for (let hour = 9; hour <= 17; hour++) {
        // Skip lunch hours
        if (hour !== 13 && hour !== 14) {
          const timeString = `${hour}:00${hour >= 12 ? ' PM' : ' AM'}`;
          const value = `${hour}:00`;
          sampleSlots.push({ value, label: timeString });
        }
      }
      
      setAvailableSlots(sampleSlots);
    }
  }, [selectedDate, carId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // In a real application, you would submit to your API
      // For demo, we'll just simulate a successful submission
      // const response = await axios.post('/api/appointments', {
      //   carId,
      //   appointmentType: 'test-drive',
      //   appointmentDate: `${selectedDate}T${selectedSlot}`,
      //   contactDetails: {
      //     name: formData.name,
      //     email: formData.email,
      //     phone: formData.phone
      //   },
      //   notes: formData.notes
      // });
      
      // Simulate API delay
      setTimeout(() => {
        setFormSubmitted(true);
        
        // In a real application, you would navigate after successful submission
        // setTimeout(() => {
        //   navigate('/');
        // }, 5000);
      }, 1500);
    } catch (error) {
      setError('Failed to schedule test drive. Please try again.');
      console.error('Error scheduling test drive:', error);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="test-drive-page">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading test drive information...</p>
        </div>
      </div>
    );
  }

  // Render success message after form submission
  if (formSubmitted) {
    return (
      <div className="test-drive-page">
        <div className="container py-5">
          <div className="success-message">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h1>Test Drive Scheduled!</h1>
            <p className="lead">
              Thank you for scheduling a test drive{car ? ` for the ${car.year} ${car.brand} ${car.model}` : ''}. 
              We look forward to seeing you on {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })} at {selectedSlot.replace(':00', '')}.
            </p>
            <p>
              A confirmation email has been sent to {formData.email}. 
              Our representative will contact you shortly to confirm your appointment.
            </p>
            <div className="mt-4">
              <button 
                className="btn btn-primary me-3"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
              <button 
                className="btn btn-outline-primary"
                onClick={() => navigate('/cars')}
              >
                Browse More Cars
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="test-drive-page">
      <div className="container py-5">
        <h1 className="page-title">Schedule a Test Drive</h1>
        <p className="page-subtitle">
          Experience the thrill of driving your dream car with our convenient test drive service.
        </p>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row">
          {/* Left column with car details if a car is selected */}
          {car && (
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="selected-car-card">
                <div className="selected-car-image">
                  <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
                  <div className="selected-car-tag">{car.bodyType}</div>
                </div>
                <div className="selected-car-details">
                  <h2>{car.year} {car.brand} {car.model}</h2>
                  <p className="selected-car-price">AED {car.price.toLocaleString()}</p>
                  <p className="selected-car-description">{car.description}</p>
                  <div className="selected-car-features">
                    <h3>Key Features</h3>
                    <ul>
                      <li><i className="fas fa-check-circle"></i> Advanced safety technology</li>
                      <li><i className="fas fa-check-circle"></i> Premium interior materials</li>
                      <li><i className="fas fa-check-circle"></i> State-of-the-art infotainment system</li>
                      <li><i className="fas fa-check-circle"></i> Powerful and efficient engine</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Right column with booking form */}
          <div className={car ? "col-lg-7" : "col-lg-8 offset-lg-2"}>
            <div className="booking-form-card">
              <h2>
                <i className="fas fa-calendar-check me-2"></i>
                {car ? `Book Your Test Drive` : `Select a Car and Book Your Test Drive`}
              </h2>
              
              {!car && (
                <div className="alert alert-info" role="alert">
                  <i className="fas fa-info-circle me-2"></i>
                  You haven't selected a specific car. You can still book a test drive and our team will help you choose a vehicle when you arrive.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="row">
                  {/* Personal Details */}
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="name">Full Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email Address <span className="text-danger">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group mb-4">
                      <label htmlFor="phone">Phone Number <span className="text-danger">*</span></label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Date and Time Selection */}
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="date">Preferred Date <span className="text-danger">*</span></label>
                      <select
                        id="date"
                        className="form-select"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                      >
                        <option value="">Select a date</option>
                        {availableDates.map((date, index) => (
                          <option key={index} value={date.value}>
                            {date.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label htmlFor="time">Preferred Time <span className="text-danger">*</span></label>
                      <select
                        id="time"
                        className="form-select"
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        disabled={!selectedDate}
                        required
                      >
                        <option value="">Select a time</option>
                        {availableSlots.map((slot, index) => (
                          <option key={index} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                      {!selectedDate && (
                        <small className="text-muted">Please select a date first</small>
                      )}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="col-12">
                    <div className="form-group mb-4">
                      <label htmlFor="notes">Additional Notes (Optional)</label>
                      <textarea
                        id="notes"
                        name="notes"
                        className="form-control"
                        rows="3"
                        placeholder="Tell us about any specific requirements or questions you may have"
                        value={formData.notes}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-check mb-4">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="terms" 
                        required 
                      />
                      <label className="form-check-label" htmlFor="terms">
                        I agree to the <a href="#" className="text-primary">terms and conditions</a> and consent to the processing of my personal data.
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-lg w-100">
                      Schedule Test Drive
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDrivePage;