export const Achievements = ({ achievements }) => (
  <section className="achievements-section">
    <h2>Achievements</h2>
    <div className="achievements-list">
      {achievements.length === 0 ? (
        <p>No achievements yet. Start creating planets!</p>
      ) : (
        achievements.map(badge => (
          <div key={badge.id} className="achievement-item">
            <span className="badge-icon">{badge.icon}</span>
            <div className="badge-info">
              <h3>{badge.title}</h3>
              <p>{badge.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  </section>
);
