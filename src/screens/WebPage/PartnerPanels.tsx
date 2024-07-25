// PartnersPanel.js
import React from 'react';
import { Container } from 'react-bootstrap';
import partnerLogos from './PartnerLogos';

const PartnersPanel = () => {
  return (
    <Container fluid className="partners-panel">
      <h4 className="text-center">Trusted by 400+ Partners</h4>
      <div className="partner-logos-container">
        {partnerLogos.map((logo, index) => (
          <div key={index} className="partner-logo">
            <img src={logo} alt={`Partner Logo ${index}`} />
          </div>
        ))}
        {partnerLogos.map((logo, index) => (
          <div key={index + partnerLogos.length} className="partner-logo">
            <img src={logo} alt={`Partner Logo ${index}`} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default PartnersPanel;
