import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am your Gargash AI Sales Assistant. How can I help you find the perfect vehicle today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    const userMessage = {
      role: 'user',
      content: input
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call backend AI API
      const response = await axios.post('/api/ai/query', {
        message: userMessage.content,
        conversationHistory: messages
      });

      if (response.data.success) {
        setMessages(response.data.data.conversationHistory);
      } else {
        // Handle error response
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: 'assistant',
            content: 'Sorry, I encountered an error processing your request. Please try again later.'
          }
        ]);
      }
    } catch (error) {
      console.error('Error processing chat message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your request. Please try again later.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format message content with support for line breaks
  const formatMessageContent = (content) => {
    return content.split('\\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index !== content.split('\\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <h2><i className="fas fa-robot"></i> Gargash AI Assistant</h2>
        <p>Ask me anything about our vehicles, financing options, or schedule a test drive!</p>
      </div>
      
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.role === 'assistant' ? 'assistant' : 'user'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="avatar">
                <i className="fas fa-robot"></i>
              </div>
            )}
            <div className="message-content">
              {formatMessageContent(message.content)}
            </div>
            {message.role === 'user' && (
              <div className="avatar">
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="message assistant">
            <div className="avatar">
              <i className="fas fa-robot"></i>
            </div>
            <div className="message-content typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chatbot-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || input.trim() === ''}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
      
      <div className="chatbot-suggestions">
        <p>Suggested questions:</p>
        <div className="suggestion-chips">
          <button 
            onClick={() => setInput('What cars do you have with good fuel efficiency?')}
            disabled={isLoading}
          >
            Fuel-efficient cars
          </button>
          <button 
            onClick={() => setInput('What finance options are available?')}
            disabled={isLoading}
          >
            Finance options
          </button>
          <button 
            onClick={() => setInput('How do I book a test drive?')}
            disabled={isLoading}
          >
            Book test drive
          </button>
          <button 
            onClick={() => setInput('What SUVs do you recommend for a family of 5?')}
            disabled={isLoading}
          >
            Family SUVs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;