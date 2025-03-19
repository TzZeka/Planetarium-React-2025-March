import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const RegisterForm = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      alert("Welcome, cosmic adventurer!");
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register as a Planet Explorer</h2>
      <label>Galactic Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <label>Create Stellar Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <button type="submit">Join the Mission</button>
      <a href="/login">Already a captain? Login!</a>
    </form>
  );
};

export default RegisterForm;
