
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
      } else {
        alert("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ width: "300px", margin: "0 auto", padding: "20px" }}>
      <Card style={{ backgroundColor: "#FFF", color: "#C32C23" }}>
        <Card.Title className="text-center">Iniciar sesión</Card.Title>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && (
              <Alert
                variant="danger"
                style={{ backgroundColor: "#C32C23", color: "#FFF" }}
              >
                {error}
              </Alert>
            )}
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label style={{ color: "#5B5B5B" }}>
                Nombre de usuario
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  backgroundColor: "#D8D8D8",
                  color: "#3D3D3D",
                  border: "1px solid #3D3D3D",
                }}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label style={{ color: "#5B5B5B" }}>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Introduce tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  backgroundColor: "#D8D8D8",
                  color: "#3D3D3D",
                  border: "1px solid #3D3D3D",
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-2"
              disabled={loading}
              style={{ backgroundColor: "#C32C23", borderColor: "#C32C23" }}
            >
              {loading ? "Logging in..." : "Entrar"}
            </Button>
            <p className="text-center" style={{ color: "#C32C23" }}>
              ¿Eres nuevo?{" "}
              <a
                href="/register"
                onClick={() => navigate("/register")}
                style={{ color: "#C32C23" }}
              >
                Regístrate
              </a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
