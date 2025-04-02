

export const Settings = ({ onOpenSettings }) => (
  <section className="settings-section">
    <h2>Settings</h2>
    <button className="settings-button" onClick={onOpenSettings}>
      Edit Profile
    </button>
  </section>
);