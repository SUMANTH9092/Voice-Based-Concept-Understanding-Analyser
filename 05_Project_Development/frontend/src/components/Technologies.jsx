import React from 'react';

export default function Technologies() {
  const techs = [
    {
      name: "Gemini",
      src: "/images/WhatsApp Image 2026-07-05 at 7.11.18 PM (1).jpeg",
      desc: "Reference Generation & Rubrics"
    },
    {
      name: "OpenAI Whisper",
      src: "/images/WhatsApp Image 2026-07-05 at 7.11.18 PM (6).jpeg",
      desc: "Speech-to-Text Transcription"
    },
    {
      name: "Sentence Transformers",
      src: "/images/WhatsApp Image 2026-07-05 at 7.11.18 PM.jpeg", // BERT
      desc: "Semantic Similarity Mapping"
    },
    {
      name: "Python",
      src: "/images/WhatsApp Image 2026-07-05 at 7.11.18 PM (3).jpeg",
      desc: "Core NLP Pipeline Execution"
    },
    {
      name: "Streamlit",
      src: "/images/WhatsApp Image 2026-07-05 at 7.11.18 PM (5).jpeg",
      desc: "Prototype App Shell"
    },
    {
      name: "Librosa",
      src: "/images/WhatsApp Image 2026-07-05 at 7.11.18 PM (2).jpeg",
      desc: "Audio & Pause Feature Extraction"
    },
    {
      name: "ReportLab",
      src: "/images/WhatsApp Image 2026-07-05 at 7.11.18 PM (4).jpeg",
      desc: "PDF Report Generation"
    },
    {
      name: "NumPy",
      isSvg: true,
      svg: (
        <svg viewBox="0 0 100 100" className="tech-svg-logo">
          <g transform="translate(10,10) scale(0.8)">
            {/* NumPy custom 3D grid cube representation */}
            <path d="M40,20 L70,35 L40,50 L10,35 Z" fill="#4dabf7" stroke="#1c7ed6" strokeWidth="2" />
            <path d="M10,35 L40,50 L40,80 L10,65 Z" fill="#228be6" stroke="#1c7ed6" strokeWidth="2" />
            <path d="M40,50 L70,35 L70,65 L40,80 Z" fill="#15aabf" stroke="#0b7285" strokeWidth="2" />
            
            <path d="M40,5 L70,20 L40,35 L10,20 Z" fill="#fab005" stroke="#f59f00" strokeWidth="2" transform="translate(0, -10)" />
            <path d="M10,20 L40,35 L40,65 L10,50 Z" fill="#f59f00" stroke="#f59f00" strokeWidth="2" transform="translate(0, -10)" />
            <path d="M40,35 L70,20 L70,50 L40,65 Z" fill="#f08c00" stroke="#e67e22" strokeWidth="2" transform="translate(0, -10)" />
          </g>
        </svg>
      ),
      desc: "Vector Math & Sound Calculations"
    }
  ];

  return (
    <section id="technologies" className="tech-section">
      <div className="section-container">
        <h2 className="section-title">
          Technologies <span className="text-gradient-purple font-heading">Used</span>
        </h2>

        <div className="tech-grid">
          {techs.map((tech, idx) => (
            <div 
              key={idx} 
              className="tech-card animate-slide-in"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="tech-image-container">
                {tech.isSvg ? (
                  tech.svg
                ) : (
                  <img src={tech.src} alt={tech.name} className="tech-img" />
                )}
              </div>
              <h3 className="tech-name font-heading">{tech.name}</h3>
              <p className="tech-desc">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tech-section {
          background-color: var(--bg-white);
          border-bottom: 1px solid #eef2f6;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 20px;
        }

        .tech-card {
          background-color: #fdfdfd;
          border: 1px solid #eef2f6;
          border-radius: 16px;
          padding: 24px 16px;
          text-align: center;
          transition: all var(--transition-normal);
          box-shadow: 0 4px 12px rgba(0,0,0,0.01);
        }

        .tech-card:hover {
          transform: translateY(-5px);
          border-color: rgba(138, 43, 226, 0.15);
          box-shadow: 0 10px 25px rgba(138, 43, 226, 0.05);
        }

        .tech-image-container {
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 14px;
          padding: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          border: 1px solid #f1f3f5;
        }

        .tech-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }

        .tech-svg-logo {
          width: 100%;
          height: 100%;
        }

        .tech-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 6px;
        }

        .tech-desc {
          font-size: 0.8rem;
          color: var(--text-muted-dark);
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .tech-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .tech-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
