import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Alert, Card, Container, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Register({ setIsLoggedIn, setUserName }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "register/",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("username", res.data.username);
      setIsLoggedIn(true);
      setUserName(res.data.username);
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "100%", maxWidth: "500px" }} className="p-4 shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Create Account</h2>

          {message && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setMessage(null)}
            >
              {message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={form.username}
                onChange={e => setForm({...form, username: e.target.value})}
                required
                minLength={3}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email (optional)</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                required
                minLength={6}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-3"
            >
              Create Account
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p className="mb-1">
              Already have an account?{" "}
              <LinkContainer to="/login">
                <a className="text-primary">Sign in</a>
              </LinkContainer>
            </p>
            <p>
              <LinkContainer to="/forgot-password">
                <a className="text-primary">Forgot password?</a>
              </LinkContainer>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}