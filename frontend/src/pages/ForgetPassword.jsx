import React, { useState } from 'react';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', error: false });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ text: 'Please enter a valid email address', error: true });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await api.post('forgot-password/', { email });
      
      // Always show success message even if email doesn't exist (for security)
      setMessage({ 
        text: 'If this email exists in our system, you will receive a password reset link shortly.', 
        error: false 
      });
      setEmail(''); // Clear the email field
    } catch (err) {
      console.error('Password reset error:', err);
      setMessage({ 
        text: err.response?.data?.error || 'Error sending reset link. Please try again later.', 
        error: true 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '500px' }} className="p-4 shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Forgot Password</h2>
          
          {message.text && (
            <Alert 
              variant={message.error ? 'danger' : 'success'}
              dismissible
              onClose={() => setMessage({ text: '', error: false })}
            >
              {message.text}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
              <Form.Text className="text-muted">
                We'll send you a link to reset your password
              </Form.Text>
            </Form.Group>
            
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : 'Send Reset Link'}
            </Button>
          </Form>
          
          <div className="text-center mt-3">
            <p className="mb-0">
              Remember your password?{' '}
              <a href="/login" className="text-primary text-decoration-none">
                Login here
              </a>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ForgotPassword;