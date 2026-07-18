import React from 'react';
import { Mic, AudioLines, Sparkles, Binary, CheckSquare, FileBadge, ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: "Speak",
      engine: "Student explains",
      desc: "the concept in their own voice",
      icon: <Mic size={24} className="step-icon-svg" />
    },
    {
      num: 2,
      title: "Speech to Text",
      engine: "Whisper AI",
      desc: "converts speech to text transcript",
      icon: <AudioLines size={24} className="step-icon-svg" />
    },
    {
      num: 3,
      title: "Reference Generation",
      engine: "Gemini AI",
      desc: "generates gold standard definition",
      icon: <Sparkles size={24} className="step-icon-svg" />
    },
    {
      num: 4,
      title: "Semantic Comparison",
      engine: "Sentence-BERT",
      desc: "compares meaning and similarity",
      icon: <Binary size={24} className="step-icon-svg" />
    },
    {
      num: 5,
      title: "Fact Verification",
      engine: "AI verifies",
      desc: "correctness of key concept facts",
      icon: <CheckSquare size={24} className="step-icon-svg" />
    },
    {
      num: 6,
      title: "Smart Report",
      engine: "Detailed report",
      desc: "with score, feedback & suggestion",
      icon: <FileBadge size={24} className="step-icon-svg" />
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section theme-dark">
      <div className="section-container">
        <h2 className="section-title">
          How It <span className="text-gradient font-heading">Works</span>
        </h2>

        <div className="steps-container">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="step-card animate-slide-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="step-icon-circle-wrapper">
                  <div className="step-icon-circle">
                    {step.icon}
                  </div>
                  <span className="step-number-badge">{step.num}</span>
                </div>
                
                <h3 className="step-title font-heading">{step.title}</h3>
                <span className="step-engine">{step.engine}</span>
                <p className="step-desc">{step.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="step-connector-arrow">
                  <ChevronRight size={20} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        .how-it-works-section {
          background-color: #030018;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .steps-container {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
          margin-top: 20px;
          gap: 10px;
        }

        .step-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .step-icon-circle-wrapper {
          position: relative;
          margin-bottom: 18px;
        }

        .step-icon-circle {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.85);
          box-shadow: 0 4px 15px rgba(0,0,0,0.25);
          transition: all var(--transition-normal);
        }

        .step-card:hover .step-icon-circle {
          background: linear-gradient(135deg, rgba(0, 242, 254, 0.15), rgba(155, 81, 224, 0.15));
          border-color: var(--accent-blue);
          color: var(--accent-blue);
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.35);
          transform: scale(1.05);
        }

        .step-icon-svg {
          transition: transform 0.3s ease;
        }

        .step-card:hover .step-icon-svg {
          transform: rotate(10deg);
        }

        .step-number-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 22px;
          height: 22px;
          background: var(--accent-purple);
          border: 1.5px solid #030018;
          color: white;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-card:hover .step-number-badge {
          background: var(--accent-blue);
          color: #030018;
        }

        .step-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .step-engine {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent-blue);
          display: block;
          margin-bottom: 4px;
        }

        .step-desc {
          font-size: 0.75rem;
          color: var(--text-muted-light);
          max-width: 140px;
          line-height: 1.4;
        }

        .step-connector-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 68px; /* Alignment with circle */
          color: rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 992px) {
          .steps-container {
            flex-wrap: wrap;
            justify-content: center;
            gap: 40px 20px;
          }
          
          .step-card {
            flex: 0 0 160px;
          }

          .step-connector-arrow {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .steps-container {
            flex-direction: column;
            align-items: center;
            gap: 30px;
          }

          .step-card {
            flex: 1;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
