import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Gargash Group</h1>
        <p>Your Trusted Partner in Automotive Excellence Since 1918</p>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Our Heritage</h2>
          <p>
            Established in 1918, Gargash Group has evolved from a small trading enterprise to one of the most respected 
            business conglomerates in the UAE. With over a century of experience in the automotive industry, we have built 
            a reputation for excellence, reliability, and customer satisfaction.
          </p>
          <p>
            Today, Gargash Group represents some of the world's most renowned automotive brands and continues to 
            set the benchmark for quality service in the region.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At Gargash Group, our mission is to provide exceptional automotive products and services that exceed customer expectations.
            We are committed to delivering premium quality, innovative solutions, and personalized experiences to every customer.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Excellence</h3>
              <p>We strive for excellence in everything we do, from the products we offer to the services we provide.</p>
            </div>
            <div className="value-card">
              <h3>Integrity</h3>
              <p>We conduct our business with the highest level of integrity, transparency, and ethical standards.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We embrace innovation and continuously adapt to changing market dynamics and customer needs.</p>
            </div>
            <div className="value-card">
              <h3>Customer Focus</h3>
              <p>Our customers are at the center of our business, and their satisfaction is our top priority.</p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2>Our Leadership</h2>
          <p>
            Under the visionary leadership of our management team, Gargash Group has continued to grow and 
            evolve while staying true to our founding principles and values.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
