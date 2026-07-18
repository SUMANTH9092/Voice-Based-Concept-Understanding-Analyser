import React from 'react';
import { School, Laptop, Speech, Briefcase, Award, UserCheck } from 'lucide-react';

export default function Applications() {
  const apps = [
    {
      title: "Educational Institutions",
      desc: "Integrate into school systems to evaluate students' verbal explanations in examinations.",
      icon: <School size={24} />
    },
    {
      title: "Online Learning Platforms",
      desc: "Power MOOCs and digital academies with auto-graded vocal concept checks.",
      icon: <Laptop size={24} />
    },
    {
      title: "Interview Assessment",
      desc: "Assist recruiters in checking candidates' technical and conceptual articulation skills.",
      icon: <Speech size={24} />
    },
    {
      title: "Corporate Training",
      desc: "Validate that employees understand key compliance guidelines and product concepts.",
      icon: <Briefcase size={24} />
    },
    {
      title: "Skill Development",
      desc: "Improve users' public speaking and structured explanation capabilities.",
      icon: <Award size={24} />
    },
    {
      title: "Self Assessment",
      desc: "Allow students to verify their own comprehension of a subject before exams.",
      icon: <UserCheck size={24} />
    }
  ];

  return (
    <section id="applications" className="apps-section">
      <div className="section-container">
        <h2 className="section-title">
          <span className="text-gradient-green font-heading">Applications</span>
        </h2>

        <div className="apps-grid">
          {apps.map((app, idx) => (
            <div 
              key={idx} 
              className="app-card animate-slide-in"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="app-icon-container">
                {app.icon}
              </div>
              <div className="app-info">
                <h3 className="app-title font-heading">{app.title}</h3>
                <p className="app-desc">{app.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .apps-section {
          background-color: var(--bg-light);
          border-bottom: 1px solid #eef2f6;
        }

        .text-gradient-green {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .apps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 20px;
        }

        .app-card {
          background-color: var(--bg-white);
          border: 1px solid rgba(0, 0, 0, 0.03);
          border-radius: 14px;
          padding: 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          text-align: left;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.015);
          transition: all var(--transition-normal);
        }

        .app-card:hover {
          transform: translateY(-4px);
          border-color: rgba(56, 239, 125, 0.2);
          box-shadow: 0 8px 25px rgba(56, 239, 125, 0.05);
        }

        .app-icon-container {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          background-color: #e6fffa;
          color: #11998e;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #b2f5ea;
          transition: all 0.3s ease;
        }

        .app-card:hover .app-icon-container {
          background-color: #11998e;
          color: white;
          transform: scale(1.05);
        }

        .app-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .app-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-dark);
        }

        .app-desc {
          font-size: 0.85rem;
          color: var(--text-muted-dark);
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .apps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .apps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
