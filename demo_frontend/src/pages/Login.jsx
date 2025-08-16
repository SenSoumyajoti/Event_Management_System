import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Form, Button, Alert } from 'react-bootstrap';
// import Header from '../components/Header';

export default function Login({ setIsLoggedIn, setUserName }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState({ text: '', error: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.post('login/', form);
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      localStorage.setItem('username', response.data.username); // 
      setIsLoggedIn(true);   // updating app state
      setUserName(response.data.username); //updating app state
      setMessage({ text: 'Login successful! Redirecting...', error: false });
      setTimeout(() => navigate('/'), 1500); // Redirect after 1.5 seconds

    } catch (error) {
      const errorMsg = error.response?.data?.error || 
                     error.response?.data?.message || 
                     'Login failed. Please try again.';
      setMessage({ text: errorMsg, error: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      
      <div className="container" style={{ maxWidth: 400, margin: '2rem auto' }}>
        <h1 className="text-center mb-4">Login Here</h1>
        
        {message.text && (
          <Alert variant={message.error ? 'danger' : 'success'} dismissible>
            {message.text}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text"  // Changed from email to text
              placeholder="Enter username"  // Changed placeholder
              value={form.username}
              onChange={(e) => setForm({...form, username: e.target.value})}
              required 
              autoFocus
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              required 
            />
          </Form.Group>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Button 
              variant="primary" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            
            <a 
              href="/forgot-password" 
              className="text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                navigate('/forgot-password');
              }}
            >
              Forgot Password?
            </a>
          </div>
        </Form>
      </div>
    </>
  );
}