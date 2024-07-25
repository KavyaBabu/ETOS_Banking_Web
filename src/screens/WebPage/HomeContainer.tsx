import React from 'react';
import ImageSlider from './ImageSlider';
import { Button } from 'react-bootstrap';

const HomeContainer = () => {
  return (
    <div className="page-container">
      <ImageSlider />
      <div className="fixed-text">
        <h2>Welcome to ETOS Banking</h2>
        <p>Integrity meets innovation in banking.</p>
        <div className="cta-buttons">
          <Button variant="primary" className="mr-2" style={{ borderRadius: '25px', marginRight: '20px' }}>
            Open Account
          </Button>
          <Button variant="outline-primary" style={{ borderRadius: '25px' }}>
            Talk to Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
