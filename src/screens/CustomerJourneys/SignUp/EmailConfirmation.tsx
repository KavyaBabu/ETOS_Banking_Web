import React from 'react';
import { useParams } from 'react-router-dom';

const EmailConfirmation = () => {
  const { email } = useParams();

  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <i className="fas fa-check-circle tick-icon"></i>
        <h3>Success!</h3>
        <p className="email-text">Email: {email}</p>
        <p>Your email has been successfully verified.</p>
      </div>
    </div>
  );
};

export default EmailConfirmation;
