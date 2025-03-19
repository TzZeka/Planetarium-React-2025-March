import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Welcome back, explorer of planets!");
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login to Spaceport</h2>
      <label>Cosmic Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <label>Galactic Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      <button type="submit">Enter the Universe</button>
      <a href="/register">Not an explorer? Join now!</a>
    </form>
  );
};

export default LoginForm;
