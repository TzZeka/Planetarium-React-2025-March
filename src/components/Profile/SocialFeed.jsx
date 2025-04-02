export const SocialFeed = ({ feedItems }) => (
  <section className="social-feed-section">
    <h2>Social Activity</h2>
    <div className="social-feed">
      {feedItems.map((item) => (
        <div key={item.id} className="feed-item">
          <p>
            <strong>{item.user}</strong>: {item.text}
          </p>
          <span className="feed-time">{item.time}</span>
        </div>
      ))}
    </div>
  </section>
);