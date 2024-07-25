import React, { useState } from 'react';

const stepsData = [
  {
    id: 'register',
    title: 'Register with us',
    description: 'Complete the registration form with your personal details to create an account with us. This includes providing your full name, contact information, and agreeing to our terms and conditions.',
  },
  {
    id: 'kyc',
    title: 'KYC',
    description: 'Verify your identity by providing valid documents such as a passport, BRP, or driving license. This step ensures your account security and complies with regulatory requirements.',
  },
  {
    id: 'financial-setup',
    title: 'Financial Setup',
    description: 'Link your bank account and set up your financial profile to start managing your money. This involves setting up your direct debits, standing orders, and understanding your spending habits.',
  },
  {
    id: 'open-account',
    title: 'Open Account',
    description: 'Complete the process to officially open your account and access our banking services. You will receive a confirmation email with your account details and how to get started.',
  },
  {
    id: 'benefits',
    title: 'Benefits',
    description: 'Enjoy the various benefits of our services, including cashback, rewards, and more. Take advantage of our exclusive offers and tools to maximize your financial well-being.',
  },
];

const ExtraContainer = () => {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (id) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  return (
    <div className="extra-container">  
      <div className="left-side">
        <h3>Steps to Open an Account</h3>
        <p>Follow these simple steps to get started with your new account. Our streamlined process ensures quick and secure setup.</p>
        <br/><br/>
        <ul className="steps-list">
          {stepsData.map((step) => (
            <li key={step.id} className="step-item">
              <div className="step-header">
                <h5>{step.title}</h5>
                <button className="toggle-button" onClick={() => toggleStep(step.id)}>
                  {expandedStep === step.id ? '−' : '+'}
                </button>
              </div>
              {expandedStep === step.id && <p className="step-description">{step.description}</p>}
              <hr />
            </li>
          ))}
        </ul>
      </div>
      <div className="right-side">
        <img src="/Images/contacts.jpg" alt="Open Account" className="right-image" />
      </div>
    </div>
  );
};

export default ExtraContainer;
