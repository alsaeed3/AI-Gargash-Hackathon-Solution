import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import CarsListPage from './pages/CarsListPage';
import CarDetailPage from './pages/CarDetailPage';
import AIAssistantPage from './pages/AIAssistantPage';
import TestDrivePage from './pages/TestDrivePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cars" element={<CarsListPage />} />
            <Route path="/cars/:id" element={<CarDetailPage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/test-drive" element={<TestDrivePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
