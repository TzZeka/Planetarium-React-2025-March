import { ToastContainer } from "react-toastify";
import { toastError,toastSuccess } from "../../utils/toastNotifications";

import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

import ProfileDetailsModal from "../../Common/ProfileDetailsModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/ProfilePage.css";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      // Автоматично задаване на username от email
      const emailPrefix = user.email.split("@")[0];
      setUsername(emailPrefix);


      const loginTime = new Date(user.metadata.lastSignInTime).toLocaleString();
      setLastLogin(loginTime);
    }
  }
  , [user]);
  const handleLogout = async () => {
    try {
      await logout();
        toastSuccess("You have logged out successfully!");
    } catch (error) {
        toastError(`Failed to log out: ${error.message}`);
    }
  };

  const handleProfileDetails = () => {
    setIsModalOpen(true); // Отваряне на модала
  };

  return (
    <div className="profile-container">
      {/* Ляв панел (Sidebar) */}
      <div className="profile-sidebar">
        {/* Профилна снимка */}
        <div className="profile-picture">
          <img
            src="/images/default-picture.avif"
            alt="Profile"
            className="profile-image"
          />
        </div>

        {/* Потребителска информация */}
        <h2 className="profile-username">{username}</h2>
        <p><strong>Email:</strong> {user?.email || "Unknown"}</p>
        <p><strong>Last Login:</strong> {lastLogin}</p>

        {/* Линк за любими */}
        <Link to="/favourites" className="nav-link favorites-link">
          <FontAwesomeIcon icon={faHeart} className="heart-icon" /> Favorites
        </Link>

        {/* Бутон за детайли */}
        <button onClick={handleProfileDetails} className="details-button">
          Profile Details
        </button>

        {/* Logout бутон */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {/* Дясна част на страницата */}
      <div className="profile-main">
        <div className="profile-header">
          <h1>Welcome, {username}</h1>
        </div>
      </div>
      {/* Модал за профилни детайли */}
      {isModalOpen && (
        <ProfileDetailsModal
          username={username}
          setUsername={setUsername}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
