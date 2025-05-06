import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Gargash AI assistant. How can I help you with your car search today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [carRecommendations, setCarRecommendations] = useState(null);
  const messagesEndRef = useRef(null);
  
  // Sample quick suggestions for users
  const suggestions = [
    "What luxury cars do you recommend?",
    "Tell me about electric vehicles",
    "I need a family SUV",
    "What financing options are available?",
    "How do I book a test drive?"
  ];

  // Scroll to bottom of chat on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Reset car recommendations when a new message is sent
    setCarRecommendations(null);
    
    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // In a real application, this would be an API call to your backend
      // const response = await axios.post('/api/ai/chat', { 
      //   message: input,
      //   conversationHistory: messages.map(m => ({
      //     role: m.sender === 'user' ? 'user' : 'assistant',
      //     content: m.text
      //   }))
      // });
      // const aiReply = response.data.reply;
      // const recommendations = response.data.recommendations;
      
      // For demo purposes, simulate API delay and use canned responses
      await simulateApiCall(input);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm sorry, I encountered an error processing your request. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      setIsTyping(false);
    }
  };

  const simulateApiCall = (userInput) => {
    return new Promise((resolve) => {
      const lowerInput = userInput.toLowerCase();
      let response;
      let shouldShowRecommendations = false;
      
      // Simple response logic based on keywords in the user's message
      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Hello! How can I assist you with finding your perfect car today?";
      } else if (lowerInput.includes('luxury') || lowerInput.includes('premium')) {
        response = "At Gargash Group, we offer a range of luxury vehicles including the Mercedes-Benz S-Class, BMW 7 Series, and Audi A8. Would you like to learn more about any specific model?";
        shouldShowRecommendations = true;
      } else if (lowerInput.includes('electric') || lowerInput.includes('ev')) {
        response = "We have several electric models available, including the Mercedes-Benz EQS, Audi e-tron, and BMW i4. These vehicles offer excellent range and performance. What aspects of electric vehicles are most important to you?";
        shouldShowRecommendations = true;
      } else if (lowerInput.includes('suv') || lowerInput.includes('family')) {
        response = "For families, I recommend looking at our luxury SUV lineup including the Mercedes-Benz GLE, BMW X5, and Audi Q7. They offer spacious interiors, advanced safety features, and excellent comfort. Would you like to schedule a test drive?";
        shouldShowRecommendations = true;
      } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('financing')) {
        response = "We offer competitive financing options with flexible terms. Our current promotion includes rates as low as 2.9% APR on select models. Would you like to speak with a financial advisor to learn more?";
      } else if (lowerInput.includes('test drive') || lowerInput.includes('appointment')) {
        response = "You can schedule a test drive easily! Just click on the 'Book Test Drive' button at the top of the page or navigate to our Test Drive section. Would you like me to help you schedule one now?";
      } else if (lowerInput.includes('compare')) {
        response = "I'd be happy to help you compare models. Could you specify which vehicles you're interested in comparing? I can provide details on performance, features, pricing, and more.";
      } else if (lowerInput.includes('recommendation') || lowerInput.includes('suggest') || lowerInput.includes('recommend')) {
        response = "Based on your interests, here are some vehicles I think you might like. You can click on any car to see more details or schedule a test drive.";
        shouldShowRecommendations = true;
      } else {
        response = "Thank you for your question. I'm here to help you find the perfect vehicle that meets your needs. Could you provide more details about what you're looking for in terms of size, features, or budget?";
      }
      
      // Simulate API delay (between 1-2 seconds)
      setTimeout(() => {
        const aiMessage = {
          id: messages.length + 2,
          text: response,
          sender: 'ai',
          timestamp: new Date(),
        };
        
        setMessages(prevMessages => [...prevMessages, aiMessage]);
        
        // Set sample car recommendations if appropriate
        if (shouldShowRecommendations) {
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
            }
          ];
          setCarRecommendations(sampleRecommendations);
        }
        
        setIsTyping(false);
        resolve();
      }, 1000 + Math.random() * 1000);
    });
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <div className="chatbot-avatar">
          <i className="fas fa-robot"></i>
        </div>
        <div className="chatbot-info">
          <h5>Gargash AI Assistant</h5>
          <span className="status">
            <span className="status-dot"></span>
            Online
          </span>
        </div>
      </div>
      
      <div className="chatbot-messages">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
          >
            {message.sender === 'ai' && (
              <div className="message-avatar">
                <i className="fas fa-robot"></i>
              </div>
            )}
            <div className="message-bubble">
              <div className="message-text">{message.text}</div>
              <div className="message-time">{formatTime(message.timestamp)}</div>
            </div>
            {message.sender === 'user' && (
              <div className="message-avatar user">
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>
        ))}
        
        {carRecommendations && (
          <div className="message ai-message">
            <div className="message-avatar">
              <i className="fas fa-robot"></i>
            </div>
            <div className="message-bubble car-recommendations-bubble">
              <div className="chatbot-car-recommendations">
                {carRecommendations.map((car) => (
                  <div className="chatbot-car-card" key={car._id}>
                    <div className="chatbot-car-image">
                      <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
                      <span className="chatbot-car-tag">{car.bodyType}</span>
                    </div>
                    <div className="chatbot-car-details">
                      <h5>{car.brand} {car.model}</h5>
                      <div className="chatbot-car-info">
                        <span>{car.year} • {car.fuelType}</span>
                        <span className="chatbot-car-price">AED {car.price.toLocaleString()}</span>
                      </div>
                      <div className="chatbot-car-actions">
                        <Link to={`/cars/${car._id}`} className="btn btn-sm btn-outline-primary">
                          Details
                        </Link>
                        <Link to={`/test-drive?car=${car._id}`} className="btn btn-sm btn-primary">
                          Test Drive
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="message-time">{formatTime(new Date())}</div>
            </div>
          </div>
        )}
        
        {isTyping && (
          <div className="message ai-message">
            <div className="message-avatar">
              <i className="fas fa-robot"></i>
            </div>
            <div className="message-bubble typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chatbot-suggestions">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="suggestion-chip"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
      
      <form className="chatbot-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          disabled={isTyping}
        />
        <button type="submit" disabled={!input.trim() || isTyping}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;