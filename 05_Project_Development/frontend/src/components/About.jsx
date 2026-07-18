import React from 'react';
import { CheckCircle2, MessageSquare, ArrowRight, FileSpreadsheet } from 'lucide-react';

export default function About() {
  const bulletPoints = [
    "Evaluates conceptual understanding",
    "AI generated reference comparison",
    "Speech quality and pattern analysis",
    "Fact verification using AI",
    "Detailed performance reports",
    "Personalized improvement tips"
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <h2 className="section-title">
          About <span className="text-gradient-purple font-heading">the Project</span>
        </h2>

        <div className="about-grid">
          {/* Left: Info */}
          <div className="about-text-column">
            <p className="about-paragraph">
              <strong>Voice Based Concept Understanding Analyser</strong> is an intelligent system that listens to a student's explanation of any topic, understands the concept using AI, and provides detailed analysis and feedback.
            </p>

            <div className="about-bullets">
              {bulletPoints.map((point, index) => (
                <div key={index} className="bullet-item">
                  <CheckCircle2 className="bullet-icon" size={18} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Flowchart diagram */}
          <div className="about-diagram-column">
            <div className="flowchart-container glass-container">
              
              {/* Speaker Node */}
              <div className="flow-node speaker-node">
                <div className="node-icon-circle bg-blue">
                  <MessageSquare size={22} className="node-icon text-blue" />
                </div>
                <span className="node-label">Speak</span>
              </div>

              {/* Arrow 1 */}
              <div className="flow-connector connector1">
                <div className="pulse-dot"></div>
                <ArrowRight size={16} className="connector-arrow" />
              </div>

              {/* Brain Node (Local Image) */}
              <div className="flow-node brain-node">
                <div className="brain-image-wrapper">
                  <img 
                    src="/images/brain_no_bg.png" 
                    alt="AI Brain Analyzer" 
                    className="brain-node-img" 
                  />
                  <div className="brain-glow-ring"></div>
                </div>
                <span className="node-label">AI Analysis</span>
              </div>

              {/* Arrow 2 */}
              <div className="flow-connector connector2">
                <div className="pulse-dot"></div>
                <ArrowRight size={16} className="connector-arrow" />
              </div>

              {/* Report Node */}
              <div className="flow-node report-node">
                <div className="node-icon-circle bg-green">
                  <FileSpreadsheet size={22} className="node-icon text-green" />
                  <span className="checkmark-badge">✓</span>
                </div>
                <span className="node-label">Report</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--bg-white);
          border-bottom: 1px solid #eef2f6;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
          margin-top: 20px;
        }

        .about-text-column {
          text-align: left;
        }

        .about-paragraph {
          font-size: 1.15rem;
          color: var(--text-dark);
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .about-bullets {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .bullet-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          font-weight: 500;
          color: #374151;
        }

        .bullet-icon {
          color: var(--accent-purple);
          flex-shrink: 0;
        }

        /* Diagram Column Styling */
        .about-diagram-column {
          display: flex;
          justify-content: center;
        }

        .flowchart-container {
          width: 100%;
          max-width: 520px;
          background: #fdfdfd;
          border: 1px solid rgba(138, 43, 226, 0.08);
          box-shadow: 0 10px 30px rgba(138, 43, 226, 0.03);
          border-radius: 20px;
          padding: 30px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .flow-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 2;
        }

        .node-icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          position: relative;
        }

        .node-icon-circle.bg-blue {
          background-color: #ebf8ff;
          border: 1.5px solid #bee3f8;
        }

        .node-icon-circle.bg-green {
          background-color: #f0fff4;
          border: 1.5px solid #c6f6d5;
        }

        .text-blue { color: #3182ce; }
        .text-green { color: #38a169; }

        .checkmark-badge {
          position: absolute;
          bottom: -2px;
          right: -2px;
          background-color: #48bb78;
          color: white;
          width: 18px;
          height: 18px;
          font-size: 0.7rem;
          font-weight: bold;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid white;
        }

        .node-label {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          color: #4b5563;
        }

        /* Brain Node (Middle) */
        .brain-image-wrapper {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(138, 43, 226, 0.12);
          border: 1px solid rgba(138, 43, 226, 0.1);
        }

        .brain-node-img {
          width: 80%;
          height: 80%;
          object-fit: contain;
          border-radius: 50%;
          animation: float 4s ease-in-out infinite;
        }

        .brain-glow-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid rgba(155, 81, 224, 0.3);
          animation: ripple 2.5s infinite ease-out;
        }

        /* Connectors */
        .flow-connector {
          position: relative;
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 2px;
          background: #e2e8f0;
          margin: 0 10px;
        }

        .connector-arrow {
          color: #a0aec0;
          position: absolute;
          right: -5px;
        }

        .pulse-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent-purple);
          left: 0;
          animation: pulseMove 2s infinite linear;
        }

        .connector2 .pulse-dot {
          animation-delay: 1s;
        }

        @keyframes pulseMove {
          0% { left: 0%; opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .about-text-column {
            text-align: center;
          }
          .about-paragraph {
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          .about-bullets {
            justify-content: center;
            max-width: 500px;
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .about-bullets {
            grid-template-columns: 1fr;
          }
          .flowchart-container {
            padding: 20px 10px;
          }
          .brain-image-wrapper {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>
    </section>
  );
}
