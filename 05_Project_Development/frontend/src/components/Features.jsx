import React from 'react';
import { Brain, Mic2, SearchCode, ShieldCheck, Speech, FileCheck } from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      title: "AI Evaluation",
      desc: "Advanced AI models evaluate conceptual understanding and structure of explanations.",
      color: "purple",
      icon: <Brain size={26} />
    },
    {
      title: "Voice Recognition",
      desc: "High accuracy speech to text converting audio explanations using Whisper AI.",
      color: "green",
      icon: <Mic2 size={26} />
    },
    {
      title: "Semantic Analysis",
      desc: "Deep semantic meaning and concept alignment comparison using Sentence-BERT.",
      color: "blue",
      icon: <SearchCode size={26} />
    },
    {
      title: "Fact Verification",
      desc: "AI verifies factual correctness of key conceptual terms and identifies inaccuracies.",
      color: "orange",
      icon: <ShieldCheck size={26} />
    },
    {
      title: "Audio Analysis",
      desc: "Analyzes pauses, speech rate, energy, pitch and audio articulation patterns.",
      color: "pink",
      icon: <Speech size={26} />
    },
    {
      title: "Smart Reports",
      desc: "Professional detailed dashboard reports with scoring, feedback and improvement metrics.",
      color: "indigo",
      icon: <FileCheck size={26} />
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="section-container">
        <h2 className="section-title">
          Key <span className="text-gradient-purple font-heading">Features</span>
        </h2>

        <div className="features-grid">
          {featuresList.map((item, idx) => (
            <div 
              key={idx} 
              className={`feature-card animate-slide-in ${item.color}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`feature-icon-wrapper ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="feature-title font-heading">{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .features-section {
          background-color: var(--bg-light);
          border-bottom: 1px solid #eef2f6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 20px;
        }

        .feature-card {
          background-color: var(--bg-white);
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 16px;
          padding: 30px 24px;
          text-align: left;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: all var(--transition-normal);
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }

        .feature-icon-wrapper {
          width: 54px;
          height: 54px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        /* Color variations */
        .feature-icon-wrapper.purple { background-color: #f3e8ff; color: #8b5cf6; }
        .feature-icon-wrapper.green { background-color: #d1fae5; color: #10b981; }
        .feature-icon-wrapper.blue { background-color: #e0f2fe; color: #0284c7; }
        .feature-icon-wrapper.orange { background-color: #ffedd5; color: #f97316; }
        .feature-icon-wrapper.pink { background-color: #fce7f3; color: #ec4899; }
        .feature-icon-wrapper.indigo { background-color: #e0e7ff; color: #6366f1; }

        /* Card highlight borders on hover */
        .feature-card.purple:hover { border-color: rgba(139, 92, 246, 0.2); }
        .feature-card.green:hover { border-color: rgba(16, 185, 129, 0.2); }
        .feature-card.blue:hover { border-color: rgba(2, 132, 199, 0.2); }
        .feature-card.orange:hover { border-color: rgba(249, 115, 22, 0.2); }
        .feature-card.pink:hover { border-color: rgba(236, 72, 153, 0.2); }
        .feature-card.indigo:hover { border-color: rgba(99, 102, 241, 0.2); }

        .feature-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 10px;
        }

        .feature-desc {
          font-size: 0.9rem;
          color: var(--text-muted-dark);
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
