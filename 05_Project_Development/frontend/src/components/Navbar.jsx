import React, { useState, useEffect } from 'react';
import { Mic, Menu, X, BarChart2 } from 'lucide-react';

export default function Navbar({ currentView, setView }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      if (currentView === 'landing') {
        const sections = ['home', 'about', 'how-it-works', 'features', 'technologies', 'applications', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveLink(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      setView('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Features', id: 'features' },
    { name: 'Technologies', id: 'technologies' },
    { name: 'Applications', id: 'applications' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => setView('landing')}>
          <div className="logo-ripple">
            <Mic className="logo-icon" size={22} />
            <span className="ripple-ring ring1"></span>
            <span className="ripple-ring ring2"></span>
          </div>
          <div className="logo-text">
            <span className="logo-title">Voice Based Concept</span>
            <span className="logo-subtitle text-gradient-blue">Understanding Analyser</span>
          </div>
        </div>

        {/* Desktop Menu */}
        {currentView === 'landing' ? (
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`nav-item-btn ${activeLink === link.id ? 'active' : ''}`}
              >
                {link.name}
              </button>
            ))}
            <button className="nav-dashboard-btn" onClick={() => window.open('http://localhost:8501', '_blank')}>
              <BarChart2 size={16} />
              Dashboard
            </button>
          </nav>
        ) : (
          <nav className="desktop-nav">
            <button className="nav-item-btn" onClick={() => setView('landing')}>
              Back to Home
            </button>
          </nav>
        )}

        {/* Mobile Menu Button */}
        <div className="mobile-menu-toggle">
          {currentView === 'landing' && (
            <button className="dashboard-toggle-btn-mobile" onClick={() => window.open('http://localhost:8501', '_blank')}>
              <BarChart2 size={18} />
            </button>
          )}
          <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown-menu glass-container animate-slide-in">
          {currentView === 'landing' ? (
            <>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`mobile-nav-item ${activeLink === link.id ? 'active' : ''}`}
                >
                  {link.name}
                </button>
              ))}
              <button
                className="mobile-nav-item dashboard-btn"
                onClick={() => {
                  window.open('http://localhost:8501', '_blank');
                  setMobileMenuOpen(false);
                }}
              >
                <BarChart2 size={18} />
                Open Dashboard
              </button>
            </>
          ) : (
            <button
              className="mobile-nav-item"
              onClick={() => {
                setView('landing');
                setMobileMenuOpen(false);
              }}
            >
              Back to Home
            </button>
          )}
        </div>
      )}

      {/* Local Navbar Styling */}
      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.3s ease;
          padding: 20px 0;
          background: transparent;
        }
        
        .navbar-header.scrolled {
          padding: 12px 0;
          background: rgba(3, 0, 30, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }
        
        .navbar-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }
        
        .logo-ripple {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 242, 254, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 242, 254, 0.2);
        }
        
        .logo-icon {
          color: var(--accent-blue);
          z-index: 2;
        }
        
        .ripple-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid rgba(0, 242, 254, 0.3);
          animation: ripple 2s infinite ease-out;
        }
        
        .ring2 {
          animation-delay: 0.7s;
        }
        
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        
        .logo-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          color: white;
          letter-spacing: 0.5px;
          line-height: 1.2;
        }
        
        .logo-subtitle {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 0.2px;
          line-height: 1.1;
        }
        
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .nav-item-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .nav-item-btn:hover {
          color: white;
        }
        
        .nav-item-btn.active {
          color: var(--accent-blue);
        }
        
        .nav-item-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 12px;
          right: 12px;
          height: 2px;
          background: var(--accent-blue);
          border-radius: 1px;
        }
        
        .nav-dashboard-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .nav-dashboard-btn:hover {
          background: var(--accent-purple);
          border-color: var(--accent-purple);
          box-shadow: 0 0 15px rgba(155, 81, 224, 0.4);
          transform: translateY(-1px);
        }
        
        .mobile-menu-toggle {
          display: none;
          align-items: center;
          gap: 12px;
        }
        
        .menu-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        
        .dashboard-toggle-btn-mobile {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: white;
          padding: 6px;
          border-radius: 6px;
          cursor: pointer;
        }
        
        .mobile-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 10px;
          right: 10px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 10px;
          border-radius: 12px;
        }
        
        .mobile-nav-item {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          font-weight: 500;
          text-align: left;
          padding: 10px;
          width: 100%;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .mobile-nav-item:hover, .mobile-nav-item.active {
          background: rgba(255, 255, 255, 0.05);
          color: var(--accent-blue);
          padding-left: 15px;
        }
        
        .mobile-nav-item.dashboard-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
          color: white;
          justify-content: center;
          margin-top: 5px;
        }
        
        @media (max-width: 900px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-toggle {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
