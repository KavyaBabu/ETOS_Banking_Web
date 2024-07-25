import React from 'react';
import { Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const ImageSlider = () => {
  const items = [
    {
      image: '/Images/background1.jpg',
      title: 'Simply Profitable',
      description: 'Simplicity breeds profitability'
    },
    {
      image: '/Images/background2.jpg',
      title: 'Winning Together',
      description: 'Strength in unity, grounded in ethics'
    },
    {
      image: '/Images/background4.jpg',
      title: 'La Riba',
      description: 'Interest-free, faith-driven prosperity'
    }
  ];

  return (
    <div className="slider-container">
      <Carousel>
        {items.map((item, i) => (
          <div className="image-container" key={i}>
            <div className="image-overlay"></div>
            <img src={item.image} alt={item.title} className="full-page-image" />
            <div className="text-overlay">
              <div className="overlay-content">
                <Typography variant="h4" className="title-text">{item.title}</Typography>
                <Typography variant="body1" className="description-text">{item.description}</Typography>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
