import React from "react";
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router';
import './Header.css';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contacts', path: '/contacts' },
  { name: 'Planets', path: '/planets' },
];

export default function Header() {
  const { user, logout } = useAuth() || {}; // Fallback to empty object

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo-container">
          <Link to="/" className="nav-link">Planetarium</Link>
        </div>
        <div className="desktop-nav-links">
          {navigation.map((item) => (
            <Link key={item.name} to={item.path} className="nav-link">
              {item.name}
            </Link>
          ))}
          {user ? (
            <button className="nav-button" onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
