import { useState, useEffect } from 'react';

function Dashboard() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: '2023-01-15',
    lastLogin: new Date().toLocaleString()
  });

  const [stats, setStats] = useState({
    profileViews: 245,
    tasksCompleted: 12,
    notifications: 3
  });

  // Simulate fetching data
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    console.log('Dashboard data loaded');
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {userData.name}!</h2>
        <p className="last-login">Last login: {userData.lastLogin}</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-info">
            <h3>{stats.profileViews}</h3>
            <p>Profile Views</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.tasksCompleted}</h3>
            <p>Tasks Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔔</div>
          <div className="stat-info">
            <h3>{stats.notifications}</h3>
            <p>Notifications</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Profile Information</h3>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{userData.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since:</span>
              <span className="info-value">{userData.joinDate}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">📝</span>
              <span className="activity-text">Updated profile information</span>
              <span className="activity-time">2 hours ago</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">🔐</span>
              <span className="activity-text">Changed password</span>
              <span className="activity-time">3 days ago</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📧</span>
              <span className="activity-text">Verified email address</span>
              <span className="activity-time">1 week ago</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button className="action-btn">Edit Profile</button>
            <button className="action-btn">Change Password</button>
            <button className="action-btn">View Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 