import React from 'react';
import { ArrowRight, Cpu, Radio, FileText, Zap } from 'lucide-react';

export default function Hero({ onStartAnalysis }) {
  return (
    <section id="home" className="hero-section theme-dark">
      {/* Background overlay */}
      <div className="hero-bg-image"></div>
      <div className="hero-bg-overlay"></div>

      <div className="section-container hero-grid">
        {/* Left Content */}
        <div className="hero-content animate-slide-in">
          <h1 className="hero-title font-heading">
            Voice Based Concept<br />
            <span className="text-gradient">Understanding Analyser</span>
          </h1>
          <h2 className="hero-subtitle font-heading">
            AI Powered Educational Assessment Platform
          </h2>
          <p className="hero-description">
            Evaluate conceptual understanding through voice explanations using advanced AI, Speech Recognition, and Natural Language Processing technologies.
          </p>

          <button className="btn-premium hero-cta-btn animate-pulse-glow" onClick={onStartAnalysis}>
            <span>Start Analysis</span>
            <ArrowRight size={20} className="cta-arrow" />
          </button>

          {/* Quick tags */}
          <div className="hero-tags-grid">
            <div className="hero-tag-card">
              <Cpu size={16} className="tag-icon purple" />
              <span>AI Powered</span>
            </div>
            <div className="hero-tag-card">
              <Radio size={16} className="tag-icon pink" />
              <span>Voice Analysis</span>
            </div>
            <div className="hero-tag-card">
              <FileText size={16} className="tag-icon blue" />
              <span>Smart Reports</span>
            </div>
            <div className="hero-tag-card">
              <Zap size={16} className="tag-icon orange" />
              <span>Instant Feedback</span>
            </div>
          </div>
        </div>

        {/* Right Graphics */}
        <div className="hero-graphics-container">
          {/* Combined Brain-Wave Composite Background (Placed behind the glass morph container) */}
          <img 
            src="/images/brain_wave_composite.png" 
            alt="Glowing AI Brain and Soundwave" 
            className="hero-composite-bg"
          />

          {/* Glass Morph Section containing the Person */}
          <div className="speaker-wrapper glass-container">
            {/* Transparent Student in Foreground (Flipped to face Left) */}
            <div className="speaker-img-flipped-wrapper">
              <img 
                src="/images/student_no_bg.png" 
                alt="Student explaining concept" 
                className="speaker-img"
              />
            </div>
          </div>
          
          {/* Score Card overlay (Stick at the section divide, not floating, enlarged) */}
          <div className="glass-container score-preview-card">
            <span className="score-card-title">Concept Understanding Score</span>
            
            <div className="score-details-row">
              {/* Donut Chart */}
              <div className="donut-chart-wrapper">
                <svg width="90" height="90" viewBox="0 0 36 36" className="donut-svg">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="15.915" 
                    fill="none" 
                    stroke="url(#donutGradient)" 
                    strokeWidth="3.2" 
                    strokeDasharray="85 15" 
                    strokeDashoffset="25" 
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00f2fe" />
                      <stop offset="100%" stopColor="#9b51e0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="donut-center-text">
                  <span className="donut-percentage">85%</span>
                </div>
              </div>

              {/* Score list */}
              <div className="score-metrics-list">
                <div className="metric-item">
                  <span className="metric-dot green"></span>
                  <span className="metric-name">Similarity:</span>
                  <span className="metric-value">82%</span>
                </div>
                <div className="metric-item">
                  <span className="metric-dot blue"></span>
                  <span className="metric-name">Accuracy:</span>
                  <span className="metric-value">88%</span>
                </div>
                <div className="metric-item">
                  <span className="metric-dot purple"></span>
                  <span className="metric-name">Fluency:</span>
                  <span className="metric-value">80%</span>
                </div>
                <div className="metric-item">
                  <span className="metric-dot orange"></span>
                  <span className="metric-name">Completeness:</span>
                  <span className="metric-value">90%</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding-top: 140px;
          padding-bottom: 80px;
          overflow: hidden;
          background-color: #020016;
        }

        .hero-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/images/WhatsApp Image 2026-07-05 at 7.11.04 PM.jpeg');
          background-size: cover;
          background-position: center;
          opacity: 0.65;
          z-index: 1;
        }

        .hero-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.15) 0%, rgba(2, 0, 22, 0.95) 80%);
          z-index: 2;
        }

        .hero-grid {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
          width: 100%;
        }

        .hero-content {
          text-align: left;
        }

        .hero-title {
          font-size: 3.5rem;
          line-height: 1.15;
          font-weight: 900;
          letter-spacing: -1px;
          margin-bottom: 18px;
          color: white;
        }

        .hero-subtitle {
          font-size: 1.4rem;
          font-weight: 500;
          color: #c084fc;
          margin-bottom: 24px;
          letter-spacing: 0.5px;
        }

        .hero-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 35px;
          max-width: 580px;
          line-height: 1.6;
        }

        .hero-cta-btn {
          font-size: 1.1rem;
          padding: 16px 36px;
          border-radius: 14px;
          margin-bottom: 45px;
        }

        .cta-arrow {
          transition: transform 0.2s ease;
        }

        .hero-cta-btn:hover .cta-arrow {
          transform: translateX(4px);
        }

        .hero-tags-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(140px, 180px));
          gap: 16px;
        }

        .hero-tag-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          transition: all 0.2s ease;
        }

        .hero-tag-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .tag-icon {
          flex-shrink: 0;
        }

        .tag-icon.purple { color: #c084fc; }
        .tag-icon.pink { color: #f857a6; }
        .tag-icon.blue { color: #00f2fe; }
        .tag-icon.orange { color: #f39c12; }

        /* Right column graphics styling */
        .hero-graphics-container {
          display: flex;
          justify-content: center;
          position: relative;
          width: 100%;
        }

        .speaker-wrapper {
          position: relative;
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.0) !important;
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
          z-index: 3;
          margin-bottom: 60px; /* Creates spacing for the score card at bottom */
          overflow: hidden;
        }

        .hero-composite-bg {
          position: absolute;
          top: -100px;
          left: -200px;
          width: 840px;
          height: auto;
          z-index: 1;
          opacity: 0.9; /* Increased opacity to shine through */
          filter: drop-shadow(0 0 30px rgba(0, 242, 254, 0.35)); /* Increased glow */
          pointer-events: none;
          animation: float 8s ease-in-out infinite;
          /* Radial gradient mask to fade out all outer borders/edges */
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 75%);
        }

        .speaker-img-flipped-wrapper {
          position: relative;
          z-index: 3;
          width: 100%; /* Sized to fit perfectly inside the glass morph container */
          transform: scaleX(-1); /* Face Left */
          display: block;
        }

        .speaker-img {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.4));
          pointer-events: none;
          display: block;
        }

        .score-preview-card {
          position: absolute;
          bottom: -20px; /* Sits right at the divide of the section */
          left: 50%;
          transform: translateX(-50%); /* Centered at the divide */
          width: 380px; /* Large professional size */
          padding: 20px;
          z-index: 10;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          background: #0c0e23 !important; /* Make it 100% solid and opaque */
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
        }

        .score-card-title {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
          margin-bottom: 12px;
          text-align: left;
        }

        .score-details-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .donut-chart-wrapper {
          position: relative;
          width: 90px;
          height: 90px;
        }

        .donut-svg {
          transform: rotate(-90deg);
        }

        .donut-center-text {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .donut-percentage {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.35rem;
          color: white;
        }

        .score-metrics-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
        }

        .metric-item {
          display: flex;
          align-items: center;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          gap: 6px;
        }

        .metric-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .metric-dot.green { background-color: #2ecc71; }
        .metric-dot.blue { background-color: #3498db; }
        .metric-dot.purple { background-color: #9b51e0; }
        .metric-dot.orange { background-color: #e67e22; }

        .metric-name {
          font-weight: 500;
          color: rgba(255, 255, 255, 0.55);
        }

        .metric-value {
          font-weight: 700;
          color: white;
          margin-left: auto;
        }

        .soundwave-preview-overlay {
          position: absolute;
          bottom: -15px;
          left: 10%;
          width: 80%;
          height: 35px;
          border-radius: 10px;
          overflow: hidden;
          opacity: 0.45;
          z-index: 2;
          pointer-events: none;
        }

        .soundwave-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 1000px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 60px;
            text-align: center;
          }
          
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .hero-title {
            font-size: 2.8rem;
          }

          .hero-tags-grid {
            justify-content: center;
          }

          .score-preview-card {
            right: 0;
            left: 50%;
            transform: translateX(-50%);
            bottom: -30px;
          }
        }
      `}</style>
    </section>
  );
}
