import React from 'react';
import { Mic, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

export default function Footer({ setView }) {
  const handleNavClick = (sectionId) => {
    setView('landing');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer id="contact" className="app-footer theme-dark">
      <div className="section-container footer-grid">
        {/* Column 1: Info */}
        <div className="footer-col footer-info">
          <div className="footer-logo">
            <Mic className="footer-logo-icon" size={20} />
            <span className="footer-logo-text font-heading">Concept Analyser</span>
          </div>
          <p className="footer-desc">
            Empowering education with AI to understand, analyze and improve conceptual learning.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading font-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><button onClick={() => handleNavClick('home')}>Home</button></li>
            <li><button onClick={() => handleNavClick('about')}>About Project</button></li>
            <li><button onClick={() => handleNavClick('how-it-works')}>How It Works</button></li>
          </ul>
        </div>

        {/* Column 3: More Links */}
        <div className="footer-col">
          <h4 className="footer-heading font-heading">Explore</h4>
          <ul className="footer-links">
            <li><button onClick={() => handleNavClick('features')}>Features</button></li>
            <li><button onClick={() => handleNavClick('technologies')}>Technologies</button></li>
            <li><button onClick={() => handleNavClick('applications')}>Applications</button></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="footer-col footer-contact">
          <h4 className="footer-heading font-heading">Contact</h4>
          <ul className="footer-contact-list">
            <li>
              <Mail size={14} className="contact-icon" />
              <span>example@gmail.com</span>
            </li>
            <li>
              <Phone size={14} className="contact-icon" />
              <span>+91 9876543210</span>
            </li>
            <li>
              <MapPin size={14} className="contact-icon" />
              <span>India</span>
            </li>
          </ul>
        </div>

        {/* Column 5: Developed By */}
        <div className="footer-col footer-dev-by">
          <h4 className="footer-heading font-heading">Developed By</h4>
          <div className="dev-card glass-card">
            <GraduationCap size={24} className="dev-cap-icon text-gradient-blue" />
            <div className="dev-text">
              <span className="dev-major">B.Tech CSE</span>
              <span className="dev-project">Final Year Project</span>
              <span className="dev-year">2024-2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright strip */}
      <div className="footer-bottom">
        <div className="section-container footer-bottom-content">
          <p>© 2024 Voice Based Concept Understanding Analyser. All rights reserved.</p>
          <span className="heart-span">Made with ❤️</span>
        </div>
      </div>

      <style>{`
        .app-footer {
          background-color: #01000f;
          padding: 80px 20px 0;
          color: var(--text-light);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          width: 100%;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.7fr 0.7fr 1fr 1.2fr;
          gap: 40px;
          padding-bottom: 50px;
          text-align: left;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-logo-icon {
          color: var(--accent-blue);
        }

        .footer-logo-text {
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: white;
        }

        .footer-desc {
          font-size: 0.85rem;
          color: var(--text-muted-light);
          line-height: 1.6;
        }

        .footer-heading {
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-left: 2px solid var(--accent-blue);
          padding-left: 10px;
          height: 16px;
          display: flex;
          align-items: center;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links button {
          background: none;
          border: none;
          color: var(--text-muted-light);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
          padding: 0;
        }

        .footer-links button:hover {
          color: var(--accent-blue);
          padding-left: 4px;
        }

        .footer-contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--text-muted-light);
        }

        .footer-contact-list li {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .contact-icon {
          color: var(--accent-purple);
          flex-shrink: 0;
        }

        /* Developed By Column */
        .dev-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .dev-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 242, 254, 0.2);
        }

        .dev-cap-icon {
          flex-shrink: 0;
        }

        .dev-text {
          display: flex;
          flex-direction: column;
        }

        .dev-major {
          font-size: 0.85rem;
          font-weight: 700;
          color: white;
        }

        .dev-project {
          font-size: 0.75rem;
          color: var(--text-muted-light);
        }

        .dev-year {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-blue);
          margin-top: 2px;
        }

        /* Bottom Copyright Strip */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 30px 20px;
          font-size: 0.8rem;
          color: var(--text-muted-light);
        }

        .footer-bottom-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .heart-span {
          font-size: 0.85rem;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
          .footer-col.footer-info {
            grid-column: span 2;
          }
          .footer-col.footer-dev-by {
            grid-column: span 2;
            max-width: 320px;
          }
        }

        @media (max-width: 500px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .footer-col.footer-info, .footer-col.footer-dev-by {
            grid-column: span 1;
          }
          .footer-bottom-content {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
