
import { toastError, toastSuccess } from "../../utils/toastNotifications";
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
      // Ако user съществува, извличаме потребителското име от email-а
      const emailPrefix = user.email ? user.email.split("@")[0] : "Unknown";
      setUsername(emailPrefix);

      
      const loginTime = user.metadata?.lastSignInTime
        ? new Date(user.metadata.lastSignInTime).toLocaleString()
        : "Unknown";
      setLastLogin(loginTime);
    } else {
      // Ако няма логнат потребител
      setUsername("Guest");
      setLastLogin("N/A");
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      toastSuccess("You have logged out successfully!");
    } catch (error) {
      toastError(`Failed to log out: ${error.message}`);
    }
  };

  const handleProfileDetails = () => {
    setIsModalOpen(true);
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
        <p>
          <strong>Email:</strong> {user?.email || "Unknown"}
        </p>
        <p>
          <strong>Last Login:</strong> {lastLogin}
        </p>

        {/* Линк към любими */}
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

      {/* Модал за детайли на профила */}
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
