import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import axios from 'axios';
import Chatbot from '../components/ai/Chatbot';
import CarPreferencesForm from '../components/cars/CarPreferencesForm';
import CarRecommendations from '../components/cars/CarRecommendations';
import './AIAssistantPage.css';

function AIAssistantPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission for car preferences
  const handlePreferencesSubmit = async (preferences) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call your API endpoint
      // const response = await axios.post('/api/ai/recommendations', { preferences });
      // setRecommendations(response.data.data);
      
      // For demo purposes, simulate an API call with sample data
      setTimeout(() => {
        const sampleRecommendations = [
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
          }
        ];
        
        setRecommendations(sampleRecommendations);
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Failed to get recommendations. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="ai-assistant-page">
      <Container>
        <div className="page-header text-center">
          <h1>Gargash AI Assistant</h1>
          <p className="lead">
            Your personal automotive expert. Ask me anything about our vehicles, 
            services, or schedule a test drive.
          </p>
        </div>
        
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header>
                <Nav variant="tabs" className="card-header-tabs" defaultActiveKey="chat">
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="chat" 
                      onClick={() => setActiveTab('chat')}
                      className={activeTab === 'chat' ? 'active' : ''}
                    >
                      AI Chat Assistant
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="preferences" 
                      onClick={() => setActiveTab('preferences')}
                      className={activeTab === 'preferences' ? 'active' : ''}
                    >
                      Car Preferences
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body className="p-0">
                {activeTab === 'chat' ? (
                  <div className="chatbot-container">
                    <Chatbot />
                  </div>
                ) : (
                  <div className="preferences-form p-4">
                    <CarPreferencesForm 
                      onSubmit={handlePreferencesSubmit} 
                      isLoading={loading}
                    />
                    <CarRecommendations 
                      recommendations={recommendations}
                      loading={loading}
                      error={error}
                    />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4}>
            <div className="ai-sidebar d-flex flex-column gap-4">
              <Card className="assistant-info p-4">
                <div className="info-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <Card.Title as="h5">How can I help you?</Card.Title>
                <ul className="feature-list">
                  <li>
                    <i className="fas fa-car"></i>
                    <span>Explore our premium vehicle collection</span>
                  </li>
                  <li>
                    <i className="fas fa-info-circle"></i>
                    <span>Get detailed specifications and features</span>
                  </li>
                  <li>
                    <i className="fas fa-calendar-alt"></i>
                    <span>Schedule test drives and service appointments</span>
                  </li>
                  <li>
                    <i className="fas fa-tag"></i>
                    <span>Learn about current offers and financing options</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="quick-links p-4">
                <Card.Title as="h5">Quick Actions</Card.Title>
                <div className="action-buttons">
                  <button 
                    className="btn btn-primary btn-block"
                    onClick={() => setActiveTab('preferences')}
                  >
                    <i className="fas fa-sliders-h"></i> Set Car Preferences
                  </button>
                  <button className="btn btn-outline-primary btn-block">
                    <i className="fas fa-calendar-plus"></i> Schedule Test Drive
                  </button>
                  <button className="btn btn-outline-primary btn-block">
                    <i className="fas fa-search"></i> Browse Inventory
                  </button>
                  <button className="btn btn-outline-primary btn-block">
                    <i className="fas fa-calculator"></i> Finance Calculator
                  </button>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AIAssistantPage;