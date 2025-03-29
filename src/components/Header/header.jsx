import React from "react";
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router';
import '../../Styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contacts', path: '/contacts' },
  { name: 'Planets', path: '/planets' },
];

export default function Header() {
  const auth = useAuth(); 
  const user = auth?.user; 

  return (
    <header className="header">
      <nav className="nav-container">
        
        <div className="logo">
          <Link to="/" className="nav-link">PLANETARIUM</Link>
        </div>

        {/* Навигация в центъра */}	
        <div className="center-nav-links">
          {navigation.map((item) => (
            <Link key={item.name} to={item.path} className="nav-link">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Login и Register вдясно или функции за логнати потребители */}
        <div className="right-nav-links">
          {user ? (
            <>
              <Link to="/favourites" className="nav-link">
                <FontAwesomeIcon icon={faHeart} className="heart-icon" />
              </Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/create" className="nav-link">Add Planet</Link>
            </>
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