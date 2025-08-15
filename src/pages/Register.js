import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register(email, password, name.trim());
      navigate('/create');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      navigate('/create');
    } catch (err) {
      setError(err.message || 'Google sign up failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <button className="btn-google" onClick={handleGoogleSignup} disabled={loading}>
        <svg width="22" height="22" viewBox="0 0 48 48" style={{marginRight: 10}}><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.22l6.9-6.9C35.6 2.1 30.2 0 24 0 14.8 0 6.7 5.8 2.7 14.1l8.1 6.3C12.7 13.7 17.9 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.4c-.5 2.7-2.1 5-4.4 6.6l7 5.4c4.1-3.8 6.5-9.4 6.5-16.4z"/><path fill="#FBBC05" d="M10.8 28.2c-1-2.7-1-5.7 0-8.4l-8.1-6.3C.6 17.1 0 20.5 0 24s.6 6.9 1.7 10.1l8.1-6.3z"/><path fill="#EA4335" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7-5.4c-2 1.4-4.5 2.2-8.2 2.2-6.1 0-11.3-4.1-13.2-9.6l-8.1 6.3C6.7 42.2 14.8 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
        Sign up with Google
      </button>
      <div className="divider"><span>or</span></div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            placeholder="Your full name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
      <p className="switch-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <style jsx>{`
        .btn-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: #fff;
          color: #2d3748;
          border: 1.5px solid #cbd5e1;
          border-radius: 8px;
          font-size: 1.08rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 18px;
          box-shadow: 0 2px 8px rgba(80, 80, 180, 0.06);
          transition: border 0.2s, box-shadow 0.2s;
        }
        .btn-google:hover {
          border: 1.5px solid #6366f1;
          box-shadow: 0 4px 16px rgba(80, 80, 180, 0.10);
        }
        .divider {
          width: 100%;
          text-align: center;
          border-bottom: 1px solid #e5e7eb;
          line-height: 0.1em;
          margin: 18px 0 22px 0;
        }
        .divider span {
          background: #fff;
          padding: 0 16px;
          color: #a0aec0;
          font-size: 1rem;
        }
        .auth-container {
          max-width: 400px;
          margin: 60px auto;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(80, 80, 180, 0.08);
          padding: 40px 32px 32px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 28px;
          color: #2d3748;
        }
        .form-group {
          width: 100%;
          margin-bottom: 22px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #4b5563;
        }
        input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 1rem;
          background: #f9fafb;
          transition: border 0.2s;
        }
        input:focus {
          border-color: #6366f1;
          outline: none;
          background: #fff;
        }
        .btn.btn-primary {
          width: 100%;
          padding: 12px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          box-shadow: 0 2px 8px rgba(80, 80, 180, 0.08);
          transition: background 0.2s;
        }
        .btn.btn-primary:hover {
          background: linear-gradient(90deg, #5a67d8 0%, #6c3483 100%);
        }
        .error {
          color: #e53e3e;
          background: #fff5f5;
          border: 1px solid #fed7d7;
          border-radius: 6px;
          padding: 8px 12px;
          margin-bottom: 12px;
          font-size: 0.98rem;
        }
        .switch-link {
          margin-top: 18px;
          color: #6b7280;
          font-size: 1rem;
        }
        .switch-link a {
          color: #6366f1;
          text-decoration: underline;
        }
        @media (max-width: 500px) {
          .auth-container {
            padding: 24px 8px 16px 8px;
          }
        }
      `}</style>
    </div>
  );
}

export default Register;
