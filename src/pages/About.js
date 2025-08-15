import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Users, Target, Heart, Zap } from 'lucide-react';

function About() {
  const { user } = useAuth();
  return (
    <div className="container">
      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>About KinyaBlog</h1>
          <p className="hero-subtitle">
            A modern platform for sharing knowledge, stories, and ideas with the world, powered by KinyaBlog.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                KinyaBlog was created to provide writers and readers with a clean, modern platform for sharing and discovering amazing content. We believe that everyone has a story to tell and knowledge to share.
              </p>
              <p>
                Whether you're a seasoned writer or just starting your journey, KinyaBlog gives you the tools to create, publish, and share your thoughts with a community of like-minded individuals.
              </p>
            </div>
            <div className="mission-image">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Team collaboration" 
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Why Choose KinyaBlog?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={32} />
              </div>
              <h3>Fast & Modern</h3>
              <p>
                Built with React and modern web technologies for a lightning-fast 
                experience that works beautifully on all devices.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Community Focused</h3>
              <p>
                Connect with other writers and readers. Share ideas, get feedback, 
                and grow together as a community.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Target size={32} />
              </div>
              <h3>Easy to Use</h3>
              <p>
                Simple, intuitive interface that lets you focus on what matters most - 
                creating great content.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Heart size={32} />
              </div>
              <h3>Made with Love</h3>
              <p>
                Crafted with attention to detail and a passion for great user 
                experiences. We care about your writing journey.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Articles Published</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Active Writers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10k+</div>
              <div className="stat-label">Monthly Readers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <h2>Contact</h2>
          <p>
            For inquiries, partnerships, or support, contact us at:
            <br />
            <strong>Phone:</strong> <a href="tel:+250787143784">+250 787 143 784</a>
          </p>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to Start Writing?</h2>
          <p>
            Join our community of writers and share your unique perspective with the world.
          </p>
          <div className="cta-buttons">
            {user ? (
              <Link to="/create" className="btn btn-primary">
                Write Your First Post
              </Link>
            ) : (
              <Link to="/register" className="btn btn-primary">
                Write Your First Post
              </Link>
            )}
            <Link to="/" className="btn btn-secondary">
              Explore Posts
            </Link>
          </div>
        </section>
      </div>

      <style jsx>{`
        .about-page {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .about-hero {
          text-align: center;
          padding: 80px 0;
          margin-bottom: 80px;
        }
        
        .about-hero h1 {
          font-size: 56px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 24px;
        }
        
        .hero-subtitle {
          font-size: 24px;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .mission-section {
          margin-bottom: 100px;
        }
        
        .mission-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        
        .mission-text h2 {
          font-size: 36px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 24px;
        }
        
        .mission-text p {
          font-size: 18px;
          line-height: 1.7;
          color: #4b5563;
          margin-bottom: 20px;
        }
        
        .mission-image img {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .features-section {
          margin-bottom: 100px;
        }
        
        .features-section h2 {
          font-size: 36px;
          font-weight: 600;
          color: #1f2937;
          text-align: center;
          margin-bottom: 60px;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
        }
        
        .feature-card {
          text-align: center;
          padding: 40px 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
        }
        
        .feature-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50%;
          margin-bottom: 24px;
        }
        
        .feature-card h3 {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 16px;
        }
        
        .feature-card p {
          color: #6b7280;
          line-height: 1.6;
        }
        
        .stats-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 80px 40px;
          border-radius: 16px;
          margin-bottom: 100px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .stat-label {
          font-size: 18px;
          opacity: 0.9;
        }
        
        .cta-section {
          text-align: center;
          padding: 80px 0;
        }
        
        .cta-section h2 {
          font-size: 36px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 16px;
        }
        
        .cta-section p {
          font-size: 20px;
          color: #6b7280;
          margin-bottom: 40px;
        }
        
        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        @media (max-width: 768px) {
          .about-hero h1 {
            font-size: 40px;
          }
          
          .hero-subtitle {
            font-size: 20px;
          }
          
          .mission-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-section {
            padding: 60px 20px;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}

export default About;
