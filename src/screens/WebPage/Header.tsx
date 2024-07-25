import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '/Images/etos-new-logo.png';
import './../../App.css';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaUserPlus } from 'react-icons/fa'; // Importing icons

function Header() {
  const [actionType, setActionType] = useState('');
  const navigate = useNavigate();

  const handleSelect = (userType) => {
    if (actionType === 'login') {
      navigate(`/login?userType=${userType}`);
    } else if (actionType === 'signup') {
      navigate(`/signup?userType=${userType}`);
    }
  };

  const handleAction = (type) => {
    setActionType(type);
  };

  return (
    <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm">
      <Navbar.Brand href="/">
        <img src={logo} alt="YourLogo" height="40" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <LinkContainer to="/personal">
            <Nav.Link>Personal</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/business">
            <Nav.Link>Business</Nav.Link>
          </LinkContainer>
          <NavDropdown title={<span>Company</span>} id="company-dropdown">
            <LinkContainer to="/about-us">
              <NavDropdown.Item>About Us</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/blogs-news">
              <NavDropdown.Item>Blogs/News</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/reviews">
              <NavDropdown.Item>Reviews</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <LinkContainer to="/accounts">
            <Nav.Link>Accounts</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/support">
            <Nav.Link>Support</Nav.Link>
          </LinkContainer>
        </Nav>
        <div className="ml-auto d-flex align-items-center">
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="outline-primary"
              className="mr-2 no-arrow"
              id="dropdown-login"
            >
              <FaChartLine className="mr-2" /> Buy Shares
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { handleAction('login'); handleSelect('investor'); }}>
                Existing Investor
              </Dropdown.Item>
              <Dropdown.Item onClick={() => { handleAction('signup'); handleSelect('investor'); }}>
                Create Account
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="primary"
              className="no-arrow"
              id="dropdown-signup"
            >
              <FaUserPlus className="mr-2" /> Open Account
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { handleAction('login'); handleSelect('customer'); }}>
                Existing Customer
              </Dropdown.Item>
              <Dropdown.Item onClick={() => { handleAction('signup'); handleSelect('customer'); }}>
                Create Account
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
