import React from 'react';
import { Trophy, Zap, Clock, Users } from 'lucide-react';

export default function Stats() {
  const statItems = [
    {
      value: "95%+",
      label: "Evaluation Accuracy",
      icon: <Trophy size={32} className="stat-icon-svg gold" />
    },
    {
      value: "100%",
      label: "Voice Based Analysis",
      icon: <Zap size={32} className="stat-icon-svg orange" />
    },
    {
      value: "Real-time",
      label: "Instant Results",
      icon: <Clock size={32} className="stat-icon-svg blue" />
    },
    {
      value: "500+",
      label: "Concepts Supported",
      icon: <Users size={32} className="stat-icon-svg purple" />
    }
  ];

  return (
    <div className="stats-bar theme-dark">
      <div className="section-container stats-grid">
        {statItems.map((item, idx) => (
          <div key={idx} className="stat-item-card glass-card">
            <div className="stat-icon-box">
              {item.icon}
            </div>
            <div className="stat-content">
              <span className="stat-value font-heading">{item.value}</span>
              <span className="stat-label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .stats-bar {
          background-color: #020015;
          padding: 60px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          width: 100%;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .stat-item-card {
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          text-align: left;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
        }

        .stat-item-card:hover {
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-3px);
        }

        .stat-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stat-icon-svg.gold { color: #f1c40f; filter: drop-shadow(0 0 8px rgba(241, 196, 15, 0.3)); }
        .stat-icon-svg.orange { color: #e67e22; filter: drop-shadow(0 0 8px rgba(230, 126, 34, 0.3)); }
        .stat-icon-svg.blue { color: #3498db; filter: drop-shadow(0 0 8px rgba(52, 152, 219, 0.3)); }
        .stat-icon-svg.purple { color: #9b51e0; filter: drop-shadow(0 0 8px rgba(155, 81, 224, 0.3)); }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted-light);
          margin-top: 4px;
        }

        @media (max-width: 992px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
