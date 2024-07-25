import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Spinner, Modal, InputGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { postRequest } from './../../../services/apiServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import 'flag-icons/css/flag-icons.min.css';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('Mr.');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [userTypeDetail, setUserTypeDetail] = useState('');
  const [companyRegNumber, setCompanyRegNumber] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailActivationStatus, setEmailActivationStatus] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const userType = params.get('userType');

  const handleNext = async () => {
    setLoading(true);
    setError('');
    try {
      switch (step) {
        case 1:
          if (validateStep1()) {
            setStep(2);
          }
          break;
        case 2:
          if (validateEmail(email)) {
            if (emailActivationStatus) {
              await confirmEmailVerification();
            } else {
            await handleEmailVerification();
            }
          }
          break;
        case 3:
          if (validateMobileNumber(mobileNumber)) {
            await sendOTP();
          }
          break;
        case 4:
          if (validateOTP(otp)) {
            await verifyOTP();
          }
          break;
        case 5:
          await updateDetails();
          // navigate('/dashboard');
          // setStep(8);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateStep1 = () => title !== '' && name !== '';
  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobileNumber = mobile => /^\d{12}$/.test(mobile);
  const validateOTP = otp => otp.join('').length === 6;

  const handleEmailVerification = async () => {
    setError('');
    try {
      await postRequest('/account_opener/open_account/', {
        name, title, email, type_of_options: "email_validation"
      });
      setEmailActivationStatus(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const confirmEmailVerification = async () => {
    setError('');
    try {
      await postRequest('/account_opener/verify_email/', { email });
      setIsEmailVerified(true);
      setStep(3);
    } catch (error) {
      setError(error.message);
    }
  };

  const sendOTP = async () => {
    setError('');
    try {
      await postRequest('/account_opener/open_account/', {
        mobile: mobileNumber, type_of_options: "mobile_no_validation"
      });
      setStep(4);
    } catch (error){
      setError(error.message)
    }
  };

  const verifyOTP = async () => {
  setError('');
  try {
    const code = otp.join('');
    const response = await postRequest('/account_opener/open_account/', {
      otp: code,
      mobile: mobileNumber,
      type_of_options: "otp_verified"
    });

    if (response) {
      setIsEmailVerified(true);
      if (userType === 'investor') {
        setStep(5); 
      } else {
        await updateDetails(); 
      }
    } else {
      setError('OTP verification failed. Please try again.');
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    setError('An error occurred during OTP verification. Please try again.');
  } finally {
    setLoading(false); 
  }
};


  const updateDetails = async () => {
    let payload = {
      title,
      name,
      email,
      mobile: mobileNumber,
      usertype: userType,
      type_of_options: "account_opening",
      investor_type: userType === 'investor' ? userTypeDetail : undefined,
      company_registration_number: userType === 'investor' ? companyRegNumber : undefined,
    };

    await postRequest('/account_opener/open_account/', payload);
    setShowSuccessModal(true);
    // alert('Success: Account successfully created');
  };

  const handleOTPChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (index < otp.length - 1 && text !== '') {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-group">
            <h3>Let's Get Started!</h3>
            <p>Welcome! We're thrilled that you've chosen to join us. How would you like us to address you?</p>
            <div className="form-row">
              <Form.Group className="form-group-inline form-group-title">
                <Form.Control
                  as="select"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr">Dr</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="form-group-inline form-group-name">
                <InputGroup>
                  <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <Button
              className="form-button"
              onClick={handleNext}
              disabled={!validateStep1()}
            >
              Next
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="form-group">
            <h3>Hello {title} {name},</h3>
            <p>Please enter your email address to verify your account.</p>
            <Form.Group>
              <InputGroup>
                  <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              </InputGroup>
            </Form.Group>
            {error && <p className="error-text">{error}</p>}
            {emailActivationStatus && (
              <p className="success-text">Email activation link sent successfully! Please check your inbox.</p>
            )}
            <div className="button-group" style={{ display: 'flex', gap: '1rem' }}>
              <Button
                className="form-button mr-4"
                onClick={handleEmailVerification}
                disabled={!validateEmail(email)}
              >
                {emailActivationStatus ? 'Resend Activation Link' : 'Send Activation Link'}
              </Button>
              <Button
                className="form-button"
                onClick={handleNext}
                disabled={!emailActivationStatus}
              >
                Next
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-group">
            <h3>Verify Mobile Number</h3>
            <p>{title} {name}, your email ({email}) has been verified. We just need to verify your mobile number.</p>
            <Form.Group className="phone-input-container">
              <PhoneInput
                country={'gb'}
                value={mobileNumber}
                onChange={(value) => {
                  setMobileNumber(value);
                }}
                inputProps={{
                  name: 'mobile',
                  required: true,
                  autoFocus: true,
                }}
                placeholder="Your Mobile Number"
              />
            </Form.Group>

            {error && <p className="error-text">{error}</p>}
            <Button
              className="form-button"
              onClick={handleNext}
              disabled={!validateMobileNumber(mobileNumber)}
            >
              Send OTP
            </Button>
          </div>
        );
      case 4:
        return (
          <div className="form-group">
            <h3>Enter OTP</h3>
            <p>{title} {name}, OTP has been sent to your Mobile. Please enter the 6-digit OTP.</p>
            <div className="otp-container">
              {otp.map((digit, index) => (
                <Form.Control
                  key={index}
                  ref={ref => (inputRefs.current[index] = ref)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOTPChange(e.target.value, index)}
                />
              ))}
            </div>
            {error && <p className="error-text">{error}</p>}
               <a
              href="#"
              className="form-button"
              onClick={(e) => {
                e.preventDefault();
                setOtp(['', '', '', '', '', '']);
                sendOTP();
              }}
              style={{ display: 'inline-block', textDecoration: 'none', color: '#007bff' }}
            >
              Resend OTP
            </a>
            <div className="button-group">            
              <Button
                className="form-button"
                onClick={handleNext}
                disabled={!validateOTP(otp)}
              >
                Verify OTP
              </Button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="form-group">
            <h3>Your Email and Mobile Number Are Verified!</h3>
            <p>Now let's gather some additional information.</p>
            <Form.Group>
              <Form.Control className="mb-3"
                as="select"
                value={userTypeDetail}
                onChange={e => setUserTypeDetail(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="individual">Individual</option>
                <option value="company">Company</option>
              </Form.Control>
            </Form.Group>
            {userTypeDetail === 'company' && (
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Company Registration Number"
                  value={companyRegNumber}
                  onChange={e => setCompanyRegNumber(e.target.value)}
                />
              </Form.Group>
            )}
            {error && <p className="error-text">{error}</p>}
            <Button
              className="form-button"
              onClick={handleNext}
              disabled={userTypeDetail === '' || (userTypeDetail === 'company' && companyRegNumber === '')}
            >
              Submit
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="login-page">
      <div className="left-login-panel"></div>
      <div className="right-login-panel">
        <div className="step-container">
          {/* {renderStepIndicator()} */}
          <div className="form-container" style={{position: 'relative'}}>
            {renderStep()}
            {isLoading && <Spinner animation="border" className="loading-spinner" />}
          </div>
        </div>
      </div>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
      <Modal.Body style={{ textAlign: 'center' }}>
        <i className="fas fa-check-circle tick-icon" style={{ fontSize: '3rem', color: '#28a745' }}></i>
        <h5>Your account has been successfully registered!</h5>
        <p>
          Please ensure you have your documents ready for the KYC (Know Your Customer) process.
          You can also log in to your account anytime to complete the next steps.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => { setShowSuccessModal(false); navigate('/dashboard'); }}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default SignUp;
