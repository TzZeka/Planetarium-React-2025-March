
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import "../../Styles/ProfilePage.css";
const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      alert("You have logged out successfully!");
    } catch (error) {
      alert(`Failed to log out: ${error.message}`);
    }
  };

  const handleNavigateToCreate = () => {
    navigate("/create"); // Пренасочване към страницата за добавяне на планета
  };

  return (
    <div className="profile-container">
      {/* Ляв панел */}
      <div className="profile-sidebar">
        <h2>User Profile</h2>
        <p><strong>Email:</strong> {user?.email || "Unknown"}</p>
        <button onClick={handleLogout} className="logout-button">Logout</button>
        {/* Можеш да добавиш допълнителни функции тук */}
      </div>

      {/* Дясна част */}
      <div className="profile-main">
        <div className="profile-header">
          <h1>Welcome, {user?.email}</h1>
          <button onClick={handleNavigateToCreate} className="create-button">
            Add New Planet
          </button>
        </div>
        <div className="favourites-section">
          <h2>Your Favourite Planets</h2>
          {/* Тук ще покажем харесаните планети */}
          <ul>
            <li>Planet A</li>
            <li>Planet B</li>
            <li>Planet C</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
