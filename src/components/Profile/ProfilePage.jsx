import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ProfileDetailsModal from "../../common/ProfileDetailsModal";
import { db } from "../../firebase/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { toastError, toastSuccess } from "../../utils/toastNotifications";
import { ProfileHeader } from "./Profileheader";
import { Achievements } from "./Achievments";
import { Statistics } from "./Statistic";
import { SocialFeed } from "./SocialFeed";
import { Settings } from "./Setings";
import { Link } from "react-router";
import "../../styles/ProfilePage.css";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState("Guest");
  const [lastLogin, setLastLogin] = useState("N/A");
  const [theme, setTheme] = useState("light");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [achievements, setAchievements] = useState([]);

  
  useEffect(() => {
    if (user) {
      const emailPrefix = user.email ? user.email.split("@")[0] : "Unknown";
      setUsername(emailPrefix);
      const loginTime = user.metadata?.lastSignInTime
        ? new Date(user.metadata.lastSignInTime).toLocaleString()
        : "Unknown";
      setLastLogin(loginTime);
    }
  }, [user]);

  
  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "planets"),
        where("ownerId", "==", user.uid)
      );
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const fetchedPlanets = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setPlanets(fetchedPlanets);
        },
        (error) => {
          toastError("Failed to load planets: " + error.message);
          console.error("Error loading planets:", error);
        }
      );
      return () => unsubscribe();
    }
  }, [user]);

  
  useEffect(() => {
    const planetCount = planets.length;
    const newAchievements = [];
    
    if (planetCount >= 1) {
      newAchievements.push({
        id: "first",
        title: "First Planet Created",
        description: "Congratulations on creating your first planet!",
        icon: "🌍"
      });
    }
    if (planetCount >= 5) {
      newAchievements.push({
        id: "cosmic-creator",
        title: "Cosmic Creator",
        description: "You've created 5 planets. The universe is expanding!",
        icon: "🚀"
      });
    }
    if (planetCount >= 10) {
      newAchievements.push({
        id: "galactic-architect",
        title: "Galactic Architect",
        description: "10 planets and counting! You're building a galaxy.",
        icon: "🪐"
      });
    }
    
    
    const diffAchievements = newAchievements.filter(
      (ach) => !achievements.some((a) => a.id === ach.id)
    );
    diffAchievements.forEach((ach) => {
      toastSuccess(`Achievement Unlocked: ${ach.title}`);
    });
    
    setAchievements(newAchievements);
    
  }, [planets]);

  const socialFeedData = [
    { id: 1, user: "Ivan", text: "Your universe is inspiring!", time: "5 mins ago" },
    { id: 2, user: "Maria", text: "Loved your latest planet creation!", time: "15 mins ago" },
    { id: 3, user: "Georgi", text: "Keep exploring the cosmos!", time: "1 hr ago" },
  ];

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleLogout = async () => {
    try {
      await logout();
      toastSuccess("Logged out successfully!");
    } catch (error) {
      toastError("Logout failed: " + error.message);
    }
  };

  const openSettings = () => setIsModalOpen(true);

  if (!user) {
    return (
      <div className="profile-page-container">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className={`profile-page theme-${theme}`}>
      <ProfileHeader
        username={username}
        email={user?.email || "Unknown"}
        lastLogin={lastLogin}
        theme={theme}
        onToggleTheme={toggleTheme}
        avatarSrc="/images/default-picture.avif"
      />

      
      <Achievements achievements={achievements} />

      
      <Statistics planetCount={planets.length} />

      
      <SocialFeed feedItems={socialFeedData} />

      
      <Settings onOpenSettings={openSettings} />

      
      <div className="nav-buttons">
        <Link to="/favourites" className="nav-button">
          Favourites
        </Link>
        <Link to="/my-planets" className="nav-button">
          My Planets
        </Link>
      </div>

      <div className="action-buttons">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

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
