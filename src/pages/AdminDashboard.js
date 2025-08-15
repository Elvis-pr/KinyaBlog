import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';
import { Navigate } from 'react-router-dom';
import { Users, FileText, Activity, TrendingUp } from 'lucide-react';

const ADMIN_EMAIL = 'admin@kinyablog.com'; // Change to your admin email

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const { posts } = useBlog();
  const [users, setUsers] = useState([]);

  // Always call hooks at the top
  useEffect(() => {
    // This is a placeholder. In production, fetch users from your backend or Firebase Admin API.
    setUsers([{ email: ADMIN_EMAIL, displayName: 'Admin' }]);
  }, []);

  // Only allow admin
  if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
    return <Navigate to="/" replace />;
  }

  // Modern summary report
  const totalPosts = posts.length;
  const totalUsers = users.length;
  const latestPost = posts[0];
  const latestUser = users[0];

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <section className="dashboard-summary">
        <div className="summary-card">
          <Users size={32} />
          <div>
            <div className="summary-number">{totalUsers}</div>
            <div className="summary-label">Users</div>
          </div>
        </div>
        <div className="summary-card">
          <FileText size={32} />
          <div>
            <div className="summary-number">{totalPosts}</div>
            <div className="summary-label">Posts</div>
          </div>
        </div>
        <div className="summary-card">
          <Activity size={32} />
          <div>
            <div className="summary-number">{latestPost ? latestPost.title : 'N/A'}</div>
            <div className="summary-label">Latest Post</div>
          </div>
        </div>
        <div className="summary-card">
          <TrendingUp size={32} />
          <div>
            <div className="summary-number">{latestUser ? (latestUser.displayName || latestUser.email) : 'N/A'}</div>
            <div className="summary-label">Latest User</div>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Users</h2>
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td>{u.displayName || '-'}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>All Posts</h2>
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{post.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <style jsx>{`
        .admin-dashboard {
          max-width: 1100px;
          margin: 40px auto;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 6px 32px rgba(80, 80, 180, 0.10);
          padding: 48px 36px 36px 36px;
        }
        h1 {
          font-size: 2.5rem;
          font-weight: 900;
          color: #2d3748;
          margin-bottom: 38px;
        }
        .dashboard-summary {
          display: flex;
          gap: 32px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        .summary-card {
          flex: 1 1 180px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border-radius: 14px;
          padding: 28px 24px;
          display: flex;
          align-items: center;
          gap: 18px;
          min-width: 180px;
          box-shadow: 0 2px 12px rgba(80, 80, 180, 0.10);
        }
        .summary-number {
          font-size: 2.1rem;
          font-weight: 800;
        }
        .summary-label {
          font-size: 1.1rem;
          font-weight: 500;
          opacity: 0.9;
        }
        .dashboard-section {
          margin-bottom: 44px;
        }
        .table-responsive {
          overflow-x: auto;
        }
        .modern-table {
          width: 100%;
          border-collapse: collapse;
          background: #f9fafb;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 18px;
        }
        .modern-table th, .modern-table td {
          padding: 14px 18px;
          text-align: left;
        }
        .modern-table th {
          background: #6366f1;
          color: #fff;
          font-weight: 700;
        }
        .modern-table tr:nth-child(even) {
          background: #ede9fe;
        }
        .modern-table tr:hover {
          background: #e0e7ff;
        }
      `}</style>
    </div>
  );
}
