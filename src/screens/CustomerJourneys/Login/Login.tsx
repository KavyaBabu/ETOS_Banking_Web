import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const onSubmit = (data: FormValues) => {
    // Reset previous errors
    setSubmitError(null);

    // Example validation and handling
    if (!data.email || !data.password) {
      setSubmitError('Please enter both email and password.');
    } else {
      // Handle login logic here
      console.log('Email:', data.email);
      console.log('Password:', data.password);
    }
  };

  return (
    <div className="login-page">
      <div className="left-login-panel">
      </div>
      <div className="right-panel">
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4">Login</Card.Title>
              {submitError && <Alert variant="danger">{submitError}</Alert>}
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    {...register('email', { required: 'Email is required' })}
                    isInvalid={!!errors.email}
                    className="email-input"
                  />
                  {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: 'Password is required' })}
                    isInvalid={!!errors.password}
                    className="password-input"
                  />
                  {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4 w-100 login-btn">
                  Login
                </Button>
                <div className="forgot-password mt-3 text-center">
                  <Button variant="link" href="/forgot-password">Forgot Password?</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Login;
