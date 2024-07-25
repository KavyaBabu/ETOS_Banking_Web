import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserTypeModal = ({ show, handleClose, handleSelect }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select User Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please select whether you want to continue as a customer or an investor.</p>
        <div className="d-flex justify-content-around">
          <Button variant="primary" onClick={() => handleSelect('customer')}>Customer</Button>
          <Button variant="secondary" onClick={() => handleSelect('investor')}>Investor</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UserTypeModal;
