export const ProfileHeader = ({ username, email, lastLogin, theme, onToggleTheme, avatarSrc }) => (
    <header className="profile-header">
      <div className="avatar-section">
        <img src={avatarSrc} alt="Profile Avatar" className="profile-avatar" />
      </div>
      <div className="profile-info">
        <h1>{username}</h1>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Last Login:</strong> {lastLogin}</p>
        <button onClick={onToggleTheme} className="theme-toggle">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </header>
  );
  