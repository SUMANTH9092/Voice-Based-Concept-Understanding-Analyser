import React, { useState } from 'react';
import { 
  BarChart2, Mic, History, FileText, BookOpen, Settings, Search, 
  Bell, ChevronDown, ArrowUpRight, TrendingUp, Sparkles, Brain, 
  HelpCircle, Clock, Volume2, ThumbsUp, AlertCircle, ArrowLeft,
  GraduationCap
} from 'lucide-react';

export default function Dashboard({ currentSession, setView }) {
  const [activeSidebar, setActiveSidebar] = useState('dashboard');
  const [selectedReportSession, setSelectedReportSession] = useState(null);

  // Fallback preset data to show in Recent Sessions list
  const recentSessionsData = [
    {
      id: 'photosynthesis',
      name: 'Photosynthesis in Plants',
      accuracy: '92%',
      similarity: '89%',
      fluency: '88%',
      completeness: '95%',
      time: 'Today, 10:30 AM',
      colorClass: 'green',
      transcription: "Photosynthesis is the biological process used by plants, algae, and some bacteria to convert light energy from the sun into chemical energy. Chlorophyll inside the plant's chloroplasts absorbs sunlight, which combines carbon dioxide from the air and water from the soil to produce glucose (sugar) for energy and releases oxygen back into the atmosphere as a byproduct.",
      reference: "Photosynthesis is a photochemical process in which light energy is absorbed by pigment molecules (primarily chlorophyll) to drive the synthesis of organic compounds (glucose) from carbon dioxide and water, releasing oxygen as a gaseous byproduct. The reaction is summary: 6CO2 + 6H2O + light -> C6H12O6 + 6O2.",
      keyFacts: [
        { fact: "Chlorophyll absorbs light in chloroplasts", status: "verified" },
        { fact: "Requires carbon dioxide and water", status: "verified" },
        { fact: "Produces glucose (organic sugar)", status: "verified" },
        { fact: "Releases oxygen as gaseous byproduct", status: "verified" },
        { fact: "Summary formula matches chemical equation", status: "missed" }
      ],
      insights: "Excellent explanation. You covered the main reactants (carbon dioxide and water) and products (glucose and oxygen), along with chlorophyll's role. To improve, mention the exact chemical reaction formula or specify light-dependent vs. light-independent reactions."
    },
    {
      id: 'newton',
      name: "Newton's Laws of Motion",
      accuracy: '88%',
      similarity: '85%',
      fluency: '82%',
      completeness: '92%',
      time: 'Yesterday, 04:15 PM',
      colorClass: 'blue',
      transcription: "Newton's laws of motion are three physical laws. First, a body remains at rest or in uniform motion unless acted upon by an external force. Second, force equals mass times acceleration, or F equals M A, meaning force depends on how heavy something is and how fast it speeds up. Third, for every action, there is an equal and opposite reaction.",
      reference: "Newton's three laws of motion describe the relationship between a body and the forces acting upon it. First Law: Object remains at rest or constant velocity unless acted on by external force. Second Law: F = ma (Force is mass times acceleration). Third Law: Action-Reaction (equal and opposite action-reaction pairs).",
      keyFacts: [
        { fact: "Three fundamental laws of motion", status: "verified" },
        { fact: "First Law: Law of Inertia", status: "verified" },
        { fact: "Second Law: F = ma (Force = mass * acceleration)", status: "verified" },
        { fact: "Third Law: Action & opposite reaction", status: "verified" },
        { fact: "Net force change of momentum relation", status: "partially-verified" }
      ],
      insights: "Solid baseline. You articulated all three laws correctly. Your explanation of the second law could be slightly more technical by describing it in terms of rate of change of momentum rather than just F=ma."
    },
    {
      id: 'water-cycle',
      name: 'Water Cycle Explanation',
      accuracy: '75%',
      similarity: '78%',
      fluency: '70%',
      completeness: '80%',
      time: 'Yesterday, 11:20 AM',
      colorClass: 'orange',
      transcription: "The water cycle is how water moves around the Earth. Water from oceans evaporates into the sky because of the sun's heat. Then it cools down and makes clouds, which is condensation. When the clouds get too heavy, they drop water as rain, called precipitation. Then the water flows back into rivers and lakes.",
      reference: "The hydrologic cycle describes the continuous movement of water on, above, and below the Earth's surface. Main stages: Evaporation (solar heating turns liquid water into vapor), Transpiration (water vapor released by plants), Condensation (cooling vapor forms clouds), Precipitation (rain/snow returns water to surface), and Runoff/Infiltration (water flows back into oceans and aquifers).",
      keyFacts: [
        { fact: "Evaporation of surface water", status: "verified" },
        { fact: "Condensation forming clouds", status: "verified" },
        { fact: "Precipitation as rain/snow", status: "verified" },
        { fact: "Runoff returning water to waterbodies", status: "verified" },
        { fact: "Transpiration from plant leaves", status: "missed" },
        { fact: "Infiltration into underground aquifers", status: "missed" }
      ],
      insights: "Good core description of Evaporation, Condensation, and Precipitation. However, you missed key vocabulary like Transpiration (release of water from plants) and Infiltration (movement of water into soil layers). Add these to raise your completeness score."
    },
    {
      id: 'pythagorean',
      name: 'Pythagorean Theorem',
      accuracy: '90%',
      similarity: '88%',
      fluency: '85%',
      completeness: '90%',
      time: '2 Days ago, 09:45 PM',
      colorClass: 'green',
      transcription: "The Pythagorean theorem applies to right-angled triangles. It states that the square of the hypotenuse, which is the longest side opposite the ninety-degree angle, is equal to the sum of the squares of the other two sides. In mathematical terms, this is written as a squared plus b squared equals c squared.",
      reference: "In mathematics, the Pythagorean theorem states that in any right-angled triangle, the square of the length of the hypotenuse (c) is equal to the sum of the squares of the lengths of the legs (a and b): a² + b² = c².",
      keyFacts: [
        { fact: "Applies to right-angled triangles only", status: "verified" },
        { fact: "Hypotenuse is the side opposite right angle", status: "verified" },
        { fact: "Square of hypotenuse equals sum of squares of legs", status: "verified" },
        { fact: "Formula: a² + b² = c²", status: "verified" }
      ],
      insights: "Perfect and precise explanation. You correctly identified that it only applies to right triangles, defined the hypotenuse, stated the theorem textually, and provided the algebraic formula. Great job!"
    }
  ];

  // If a session was just completed, prepend it to the list
  const displaySessions = currentSession 
    ? [
        {
          id: currentSession.id,
          name: currentSession.name,
          accuracy: currentSession.accuracy,
          similarity: currentSession.similarity,
          fluency: currentSession.fluency,
          completeness: currentSession.completeness,
          time: 'Just Now',
          colorClass: parseInt(currentSession.accuracy) >= 90 ? 'green' : parseInt(currentSession.accuracy) >= 80 ? 'blue' : 'orange',
          transcription: currentSession.transcription,
          reference: currentSession.reference,
          keyFacts: currentSession.keyFacts,
          insights: currentSession.insights
        },
        ...recentSessionsData.filter(s => s.id !== currentSession.id)
      ]
    : recentSessionsData;

  const currentTopic = currentSession || TOPIC_PRESETS[0];

  return (
    <div className="dashboard-layout theme-dark">
      {/* 1. SIDEBAR */}
      <aside className="db-sidebar">
        <div className="db-sidebar-logo" onClick={() => setView('landing')}>
          <div className="logo-ripple">
            <Mic className="logo-icon" size={20} />
          </div>
          <div className="logo-text">
            <span className="logo-title">Concept</span>
            <span className="logo-subtitle text-gradient-blue">Analyser</span>
          </div>
        </div>

        <nav className="db-sidebar-menu">
          <button 
            className={`db-menu-item ${activeSidebar === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSidebar('dashboard')}
          >
            <BarChart2 size={18} />
            <span>Dashboard</span>
          </button>
          <button 
            className={`db-menu-item ${activeSidebar === 'sessions' ? 'active' : ''}`}
            onClick={() => setActiveSidebar('sessions')}
          >
            <Mic size={18} />
            <span>Sessions</span>
          </button>
          <button 
            className={`db-menu-item ${activeSidebar === 'history' ? 'active' : ''}`}
            onClick={() => setActiveSidebar('history')}
          >
            <History size={18} />
            <span>Analysis History</span>
          </button>
          <button 
            className={`db-menu-item ${activeSidebar === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveSidebar('reports')}
          >
            <FileText size={18} />
            <span>Reports</span>
          </button>
          <button 
            className={`db-menu-item ${activeSidebar === 'concepts' ? 'active' : ''}`}
            onClick={() => setActiveSidebar('concepts')}
          >
            <BookOpen size={18} />
            <span>Concepts</span>
          </button>
          <button 
            className={`db-menu-item ${activeSidebar === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveSidebar('settings')}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>

        {/* Upgrade to Pro Card */}
        <div className="db-upgrade-card glass-container">
          <Sparkles size={20} className="upgrade-star-icon" />
          <h4 className="upgrade-title font-heading">Upgrade to Pro</h4>
          <p className="upgrade-desc">Unlock advanced insights and detailed reports.</p>
          <button className="upgrade-btn">Upgrade Now</button>
        </div>
      </aside>

      {/* 2. MAIN AREA */}
      <main className="db-main-content">
        
        {/* Header */}
        <header className="db-header">
          <div className="db-header-search glass-container">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search concepts, topics..." />
          </div>

          <div className="db-header-actions">
            <button className="db-back-home-btn" onClick={() => setView('landing')}>
              <ArrowLeft size={16} />
              <span>Back to Site</span>
            </button>

            <button className="db-notification-btn glass-container">
              <Bell size={18} />
              <span className="notif-badge"></span>
            </button>

            <div className="db-user-profile glass-container">
              <div className="user-avatar-placeholder">
                <GraduationCap size={16} />
              </div>
              <span className="user-name">Student</span>
              <ChevronDown size={14} className="user-arrow" />
            </div>
          </div>
        </header>

        {/* Dashboard Grid Content */}
        <div className="db-body">
          <div className="welcome-strip text-left">
            <h2 className="welcome-title font-heading">Welcome back, Student! 👋</h2>
            <p className="welcome-desc">Here's your concept understanding overview</p>
          </div>

          {/* Row 1: 4 Cards */}
          <div className="db-stats-row">
            <div className="db-stat-metric-card glass-container">
              <span className="metric-header">Total Sessions</span>
              <div className="metric-number-row">
                <span className="metric-number font-heading">24</span>
                <span className="metric-trend positive">
                  <ArrowUpRight size={14} /> +12 this week
                </span>
              </div>
            </div>

            <div className="db-stat-metric-card glass-container">
              <span className="metric-header">Avg. Accuracy</span>
              <div className="metric-number-row">
                <span className="metric-number font-heading">87%</span>
                <span className="metric-trend positive">
                  <ArrowUpRight size={14} /> +8% improvement
                </span>
              </div>
            </div>

            <div className="db-stat-metric-card glass-container">
              <span className="metric-header">Concepts Mastered</span>
              <div className="metric-number-row">
                <span className="metric-number font-heading">42</span>
                <span className="metric-trend positive">
                  <ArrowUpRight size={14} /> +7 new concepts
                </span>
              </div>
            </div>

            <div className="db-stat-metric-card glass-container">
              <span className="metric-header">Total Study Time</span>
              <div className="metric-number-row">
                <span className="metric-number font-heading">18h 36m</span>
                <span className="metric-trend positive">
                  <ArrowUpRight size={14} /> +2h 15m this week
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: Performance Overview (SVG chart) & Donut Breakdown */}
          <div className="db-charts-row">
            
            {/* SVG Line Chart */}
            <div className="db-chart-panel line-chart-panel glass-container">
              <div className="panel-header">
                <h3 className="panel-title font-heading">Performance Overview</h3>
                <div className="panel-select glass-container">
                  <span>This Week</span>
                  <ChevronDown size={14} />
                </div>
              </div>

              <div className="line-chart-wrapper">
                {/* Simulated Chart using SVG */}
                <svg viewBox="0 0 500 200" width="100%" height="100%">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="40" y1="60" x2="480" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="40" y1="100" x2="480" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="40" y1="140" x2="480" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                  {/* SVG gradients */}
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00f2fe" />
                      <stop offset="100%" stopColor="#9b51e0" />
                    </linearGradient>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(0, 242, 254, 0.2)" />
                      <stop offset="100%" stopColor="rgba(155, 81, 224, 0.0)" />
                    </linearGradient>
                  </defs>

                  {/* Filled Area */}
                  <path 
                    d="M 40 160 L 110 135 L 180 110 L 250 30 L 320 120 L 390 90 L 460 70 L 460 170 L 40 170 Z" 
                    fill="url(#areaGrad)" 
                  />

                  {/* Chart Line */}
                  <path 
                    d="M 40 160 Q 75 147.5 110 135 T 180 110 T 250 30 T 320 120 T 390 90 T 460 70" 
                    fill="none" 
                    stroke="url(#lineGrad)" 
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Data Points */}
                  <circle cx="40" cy="160" r="4" fill="#00f2fe" stroke="white" strokeWidth="1.5" />
                  <circle cx="110" cy="135" r="4" fill="#00f2fe" stroke="white" strokeWidth="1.5" />
                  <circle cx="180" cy="110" r="4" fill="#00f2fe" stroke="white" strokeWidth="1.5" />
                  
                  {/* Highlight Thursday point */}
                  <circle cx="250" cy="30" r="6" fill="#9b51e0" stroke="white" strokeWidth="2" className="pulse-dot-point" />
                  
                  <circle cx="320" cy="120" r="4" fill="#9b51e0" stroke="white" strokeWidth="1.5" />
                  <circle cx="390" cy="90" r="4" fill="#9b51e0" stroke="white" strokeWidth="1.5" />
                  <circle cx="460" cy="70" r="4" fill="#9b51e0" stroke="white" strokeWidth="1.5" />

                  {/* Thursday tooltip mockup */}
                  <g transform="translate(200, -10)">
                    <rect x="0" y="0" width="100" height="30" rx="6" fill="rgba(10,12,30,0.9)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <text x="50" y="18" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">Thursday: 88%</text>
                  </g>

                  {/* X Labels */}
                  <text x="40" y="188" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Mon</text>
                  <text x="110" y="188" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Tue</text>
                  <text x="180" y="188" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Wed</text>
                  <text x="250" y="188" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">Thu</text>
                  <text x="320" y="188" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Fri</text>
                  <text x="390" y="188" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Sat</text>
                  <text x="460" y="188" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Sun</text>
                </svg>
              </div>
            </div>

            {/* Donut Chart Panel */}
            <div className="db-chart-panel donut-chart-panel glass-container">
              <div className="panel-header">
                <h3 className="panel-title font-heading">Concept Understanding</h3>
              </div>

              <div className="donut-panel-content">
                {/* SVG Donut */}
                <div className="donut-panel-chart">
                  <svg width="120" height="120" viewBox="0 0 36 36" className="donut-svg">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                    
                    {/* Excellent 42% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2ecc71" strokeWidth="4" 
                      strokeDasharray="42 58" strokeDashoffset="100" strokeLinecap="round" />
                    
                    {/* Good 30% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3498db" strokeWidth="4" 
                      strokeDasharray="30 70" strokeDashoffset="58" strokeLinecap="round" />
                    
                    {/* Average 18% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1c40f" strokeWidth="4" 
                      strokeDasharray="18 82" strokeDashoffset="28" strokeLinecap="round" />

                    {/* Needs Improvement 10% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e74c3c" strokeWidth="4" 
                      strokeDasharray="10 90" strokeDashoffset="10" strokeLinecap="round" />
                  </svg>
                  <div className="donut-panel-text">
                    <span className="donut-big-val">85%</span>
                    <span className="donut-sub-text">Overall Score</span>
                  </div>
                </div>

                {/* Legends */}
                <div className="donut-panel-legends">
                  <div className="legend-row">
                    <span className="legend-indicator green"></span>
                    <span className="legend-name">Excellent (90-100%)</span>
                    <span className="legend-percentage">42%</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-indicator blue"></span>
                    <span className="legend-name">Good (70-89%)</span>
                    <span className="legend-percentage">30%</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-indicator yellow"></span>
                    <span className="legend-name">Average (50-69%)</span>
                    <span className="legend-percentage">18%</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-indicator red"></span>
                    <span className="legend-name">Needs Improvement</span>
                    <span className="legend-percentage">10%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Row 3: Recent Sessions, Bar Chart (Accuracy Trend) & AI Insights */}
          <div className="db-bottom-row">
            
            {/* Recent Sessions List */}
            <div className="bottom-panel recent-sessions-panel glass-container">
              <div className="panel-header">
                <h3 className="panel-title font-heading">Recent Session</h3>
                <button className="panel-header-link">View All</button>
              </div>

              <div className="sessions-list-wrapper">
                {displaySessions.map((session, idx) => (
                  <div 
                    key={idx} 
                    className="session-list-item-btn"
                    onClick={() => setSelectedReportSession(session)}
                  >
                    <div className={`session-list-bullet ${session.colorClass}`}></div>
                    <div className="session-list-info text-left">
                      <span className="session-list-name font-heading">{session.name}</span>
                      <span className="session-list-time">{session.time}</span>
                    </div>
                    <span className={`session-list-score-badge ${session.colorClass}`}>
                      {session.accuracy}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bar Chart (Accuracy Trend) */}
            <div className="bottom-panel bar-chart-panel glass-container">
              <div className="panel-header">
                <h3 className="panel-title font-heading">Accuracy Trend</h3>
                <div className="panel-select glass-container">
                  <span>This Month</span>
                  <ChevronDown size={12} />
                </div>
              </div>

              <div className="bar-chart-wrapper">
                {/* 4 Vertical Bars */}
                <div className="bar-column">
                  <div className="bar-fill-track">
                    <div className="bar-fill-amount blue" style={{ height: '65%' }}>
                      <span className="bar-value-tooltip">65%</span>
                    </div>
                  </div>
                  <span className="bar-label">Week 1</span>
                </div>

                <div className="bar-column">
                  <div className="bar-fill-track">
                    <div className="bar-fill-amount blue" style={{ height: '72%' }}>
                      <span className="bar-value-tooltip">72%</span>
                    </div>
                  </div>
                  <span className="bar-label">Week 2</span>
                </div>

                <div className="bar-column">
                  <div className="bar-fill-track">
                    <div className="bar-fill-amount purple" style={{ height: '80%' }}>
                      <span className="bar-value-tooltip">80%</span>
                    </div>
                  </div>
                  <span className="bar-label">Week 3</span>
                </div>

                <div className="bar-column">
                  <div className="bar-fill-track">
                    <div className="bar-fill-amount purple-glow" style={{ height: '87%' }}>
                      <span className="bar-value-tooltip">87%</span>
                    </div>
                  </div>
                  <span className="bar-label">Week 4</span>
                </div>
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="bottom-panel insights-panel glass-container">
              <div className="panel-header">
                <h3 className="panel-title font-heading">AI Insights</h3>
              </div>

              <div className="insights-content-wrapper text-left">
                <div className="insight-badge-row">
                  <Brain size={24} className="insight-brain-icon" />
                  <span className="insight-heading-text font-heading">Personalized Recommendations</span>
                </div>

                <p className="insight-paragraph">
                  Great job! You are performing above average in most concepts. Focus more on <strong className="highlight-text-orange">"Thermodynamics"</strong> and <strong className="highlight-text-orange">"Organic Chemistry"</strong> to improve your overall score.
                </p>

                <button 
                  className="btn-premium insights-cta-btn" 
                  onClick={() => setSelectedReportSession(displaySessions[0])}
                >
                  <span>View Detailed Insights</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 3. REPORT DETAILS MODAL */}
      {selectedReportSession && (
        <div className="modal-backdrop">
          <div className="modal-window report-detail-modal glass-container animate-slide-in">
            <button className="modal-close-btn" onClick={() => setSelectedReportSession(null)}>
              <X size={20} />
            </button>

            <h2 className="report-modal-title font-heading text-gradient">AI Evaluation Report</h2>
            <h3 className="report-modal-topic font-heading">{selectedReportSession.name}</h3>
            
            {/* Scores Bar */}
            <div className="report-modal-scores-row">
              <div className="report-score-box">
                <span className="score-label">Factual Accuracy</span>
                <span className="score-val text-green">{selectedReportSession.accuracy}</span>
              </div>
              <div className="report-score-box">
                <span className="score-label">Semantic Similarity</span>
                <span className="score-val text-blue">{selectedReportSession.similarity}</span>
              </div>
              <div className="report-score-box">
                <span className="score-label">Fluency & Rate</span>
                <span className="score-val text-purple">{selectedReportSession.fluency}</span>
              </div>
              <div className="report-score-box">
                <span className="score-label">Completeness</span>
                <span className="score-val text-orange">{selectedReportSession.completeness}</span>
              </div>
            </div>

            <div className="report-scroll-container">
              {/* Audio and pauses details */}
              <div className="report-section-block">
                <h4 className="block-title font-heading">
                  <Volume2 size={16} /> Speech Pattern Analysis
                </h4>
                <div className="speech-pattern-grid">
                  <div className="pattern-stat-box">
                    <span className="pattern-stat-label">Total Pauses Detected</span>
                    <span className="pattern-stat-val">4</span>
                  </div>
                  <div className="pattern-stat-box">
                    <span className="pattern-stat-label">Speech Speed</span>
                    <span className="pattern-stat-val">138 WPM (Normal)</span>
                  </div>
                  <div className="pattern-stat-box">
                    <span className="pattern-stat-label">Audio Clarity Score</span>
                    <span className="pattern-stat-val">94%</span>
                  </div>
                </div>
              </div>

              {/* Transcription */}
              <div className="report-section-block">
                <h4 className="block-title font-heading">
                  <Mic size={16} /> Whisper Transcription
                </h4>
                <p className="block-text italic">{selectedReportSession.transcription}</p>
              </div>

              {/* Reference */}
              <div className="report-section-block">
                <h4 className="block-title font-heading">
                  <Sparkles size={16} /> Gemini Reference Standard
                </h4>
                <p className="block-text">{selectedReportSession.reference}</p>
              </div>

              {/* Key Facts checklist */}
              <div className="report-section-block">
                <h4 className="block-title font-heading">
                  <CheckSquare size={16} /> Key Fact Verification
                </h4>
                <div className="modal-checklist">
                  {selectedReportSession.keyFacts ? (
                    selectedReportSession.keyFacts.map((kf, i) => (
                      <div key={i} className="checklist-item">
                        <span className={`checklist-indicator ${kf.status}`}>
                          {kf.status === 'verified' ? '✓' : kf.status === 'partially-verified' ? '⚠' : '✗'}
                        </span>
                        <div className="checklist-text">
                          <span className="checklist-fact-desc">{kf.fact}</span>
                          <span className={`checklist-fact-status-label ${kf.status}`}>
                            {kf.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="block-text">No checklist available for this session.</span>
                  )}
                </div>
              </div>

              {/* AI Insights & Feedback */}
              <div className="report-section-block">
                <h4 className="block-title font-heading">
                  <ThumbsUp size={16} /> Feedback & Recommendation
                </h4>
                <p className="block-text">{selectedReportSession.insights}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Local Dashboard CSS Styling */}
      <style>{`
        .dashboard-layout {
          min-height: 100vh;
          width: 100%;
          background-color: #060814;
          display: flex;
          color: white;
          position: relative;
        }

        /* 1. SIDEBAR STYLING */
        .db-sidebar {
          width: 260px;
          background-color: #0b0d1b;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          flex-shrink: 0;
          z-index: 100;
        }

        .db-sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          margin-bottom: 40px;
        }

        .db-sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-grow: 1;
        }

        .db-menu-item {
          display: flex;
          align-items: center;
          gap: 14px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          padding: 12px 16px;
          border-radius: 10px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          text-align: left;
        }

        .db-menu-item:hover {
          color: white;
          background: rgba(255, 255, 255, 0.03);
        }

        .db-menu-item.active {
          color: white;
          background: #7928ca;
          box-shadow: 0 4px 15px rgba(121, 40, 202, 0.3);
        }

        .db-upgrade-card {
          padding: 20px;
          background: linear-gradient(135deg, rgba(121, 40, 202, 0.1), rgba(0, 242, 254, 0.05));
          border-color: rgba(121, 40, 202, 0.2);
          text-align: center;
          margin-top: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .upgrade-star-icon {
          color: var(--accent-blue);
          margin-bottom: 12px;
          animation: float 4s infinite ease-in-out;
        }

        .upgrade-title {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .upgrade-desc {
          font-size: 0.75rem;
          color: var(--text-muted-light);
          line-height: 1.4;
          margin-bottom: 14px;
        }

        .upgrade-btn {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          background: white;
          color: #0b0d1b;
          font-weight: 700;
          font-size: 0.8rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .upgrade-btn:hover {
          background: var(--accent-blue);
          color: #0b0d1b;
          transform: translateY(-1px);
        }

        /* 2. MAIN AREA STYLING */
        .db-main-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          min-width: 0; /* Prevents flex children from breaking parent bounds */
        }

        /* Header */
        .db-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background-color: rgba(6, 8, 20, 0.5);
          backdrop-filter: blur(8px);
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .db-header-search {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          width: 320px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
        }

        .search-icon {
          color: rgba(255, 255, 255, 0.4);
        }

        .db-header-search input {
          background: none;
          border: none;
          color: white;
          font-size: 0.85rem;
          width: 100%;
          outline: none;
        }

        .db-header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .db-back-home-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: white;
          padding: 8px 16px;
          border-radius: 10px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .db-back-home-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .db-notification-btn {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          cursor: pointer;
          position: relative;
          background: rgba(255, 255, 255, 0.02);
        }

        .notif-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent-purple);
        }

        .db-user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 14px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          cursor: pointer;
        }

        .user-avatar-placeholder {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .user-name {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .user-arrow {
          color: rgba(255, 255, 255, 0.4);
        }

        /* Body grid */
        .db-body {
          padding: 30px 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .welcome-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .welcome-desc {
          font-size: 0.95rem;
          color: var(--text-muted-light);
        }

        /* Row 1 cards */
        .db-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .db-stat-metric-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: #0b0d1b;
        }

        .metric-header {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .metric-number-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          width: 100%;
        }

        .metric-number {
          font-size: 1.6rem;
          font-weight: 800;
          color: white;
        }

        .metric-trend {
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .metric-trend.positive { color: #2ecc71; }

        /* Row 2 charts styling */
        .db-charts-row {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 20px;
        }

        .db-chart-panel {
          padding: 24px;
          background: #0b0d1b;
          display: flex;
          flex-direction: column;
        }

        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .panel-title {
          font-size: 1.05rem;
          font-weight: 700;
        }

        .panel-select {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          cursor: pointer;
        }

        .line-chart-wrapper {
          flex-grow: 1;
          height: 200px;
        }

        .pulse-dot-point {
          animation: ripple 2s infinite;
        }

        .donut-panel-content {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-grow: 1;
        }

        .donut-panel-chart {
          position: relative;
          width: 120px;
          height: 120px;
          flex-shrink: 0;
        }

        .donut-panel-text {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1.1;
        }

        .donut-big-val {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
        }

        .donut-sub-text {
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.45);
        }

        .donut-panel-legends {
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
          flex-grow: 1;
        }

        .legend-row {
          display: flex;
          align-items: center;
          font-size: 0.75rem;
        }

        .legend-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 8px;
          flex-shrink: 0;
        }

        .legend-indicator.green { background-color: #2ecc71; }
        .legend-indicator.blue { background-color: #3498db; }
        .legend-indicator.yellow { background-color: #f1c40f; }
        .legend-indicator.red { background-color: #e74c3c; }

        .legend-name {
          color: rgba(255, 255, 255, 0.7);
        }

        .legend-percentage {
          font-weight: 700;
          margin-left: auto;
        }

        /* Row 3 bottom row */
        .db-bottom-row {
          display: grid;
          grid-template-columns: 1fr 0.8fr 1.2fr;
          gap: 20px;
        }

        .bottom-panel {
          padding: 24px;
          background: #0b0d1b;
          display: flex;
          flex-direction: column;
          min-height: 250px;
        }

        .panel-header-link {
          background: none;
          border: none;
          color: var(--accent-blue);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }

        .sessions-list-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
          flex-grow: 1;
        }

        .session-list-item-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.04);
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .session-list-item-btn:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.08);
          transform: translateX(3px);
        }

        .session-list-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .session-list-bullet.green { background-color: #2ecc71; }
        .session-list-bullet.blue { background-color: #3498db; }
        .session-list-bullet.orange { background-color: #e67e22; }

        .session-list-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .session-list-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: white;
        }

        .session-list-time {
          font-size: 0.7rem;
          color: var(--text-muted-light);
          margin-top: 1px;
        }

        .session-list-score-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .session-list-score-badge.green { background-color: rgba(46, 204, 113, 0.15); color: #2ecc71; }
        .session-list-score-badge.blue { background-color: rgba(52, 152, 219, 0.15); color: #3498db; }
        .session-list-score-badge.orange { background-color: rgba(230, 126, 34, 0.15); color: #e67e22; }

        /* Bar Chart (Accuracy Trend) */
        .bar-chart-wrapper {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          height: 140px;
          margin-top: auto;
          padding-bottom: 10px;
        }

        .bar-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 40px;
          height: 100%;
        }

        .bar-fill-track {
          width: 12px;
          height: 110px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          display: flex;
          align-items: flex-end;
          position: relative;
        }

        .bar-fill-amount {
          width: 100%;
          border-radius: 6px;
          position: relative;
          transition: height 0.5s ease;
          cursor: pointer;
        }

        .bar-fill-amount.blue {
          background: linear-gradient(to top, #3498db, #00f2fe);
        }

        .bar-fill-amount.purple {
          background: linear-gradient(to top, #8a2be2, #da70d6);
        }

        .bar-fill-amount.purple-glow {
          background: linear-gradient(to top, #9b51e0, #f857a6);
          box-shadow: 0 0 10px rgba(155, 81, 224, 0.5);
        }

        .bar-value-tooltip {
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
          background: #03001e;
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 4px;
          border-radius: 4px;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .bar-fill-amount:hover .bar-value-tooltip {
          opacity: 1;
        }

        .bar-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
          margin-top: 8px;
        }

        /* AI Insights Card */
        .insights-content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex-grow: 1;
          justify-content: space-between;
        }

        .insight-badge-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .insight-brain-icon {
          color: var(--accent-blue);
          animation: float 4s infinite ease-in-out;
        }

        .insight-heading-text {
          font-size: 0.9rem;
          font-weight: 700;
          color: white;
        }

        .insight-paragraph {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.5;
        }

        .highlight-text-orange {
          color: #e67e22;
        }

        .insights-cta-btn {
          font-size: 0.8rem;
          padding: 10px;
          border-radius: 8px;
          text-transform: none;
          letter-spacing: 0px;
          box-shadow: none;
        }

        /* 3. REPORT DETAIL MODAL */
        .report-detail-modal {
          max-width: 680px;
          width: 95%;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          background: #080a18;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .report-modal-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 2px;
        }

        .report-modal-topic {
          font-size: 1.1rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 20px;
        }

        .report-modal-scores-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .report-score-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 10px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .score-label {
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .score-val {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
        }

        .score-val.text-green { color: #2ecc71; }
        .score-val.text-blue { color: #3498db; }
        .score-val.text-purple { color: #9b51e0; }
        .score-val.text-orange { color: #e67e22; }

        .report-scroll-container {
          flex-grow: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-right: 8px;
        }

        .report-section-block {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          padding: 16px;
          border-radius: 12px;
          text-align: left;
        }

        .block-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-blue);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .block-text {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.6;
        }

        .block-text.italic {
          font-style: italic;
          background: rgba(255, 255, 255, 0.02);
          border-left: 3px solid var(--accent-purple);
          padding: 8px 12px;
          border-radius: 0 6px 6px 0;
        }

        .speech-pattern-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .pattern-stat-box {
          background: rgba(255, 255, 255, 0.01);
          padding: 10px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
        }

        .pattern-stat-label {
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .pattern-stat-val {
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
          margin-top: 4px;
        }

        /* Fact check checklist */
        .modal-checklist {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.01);
          border-radius: 8px;
        }

        .checklist-indicator {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: bold;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .checklist-indicator.verified { background: rgba(46, 204, 113, 0.2); color: #2ecc71; }
        .checklist-indicator.partially-verified { background: rgba(241, 196, 15, 0.2); color: #f1c40f; }
        .checklist-indicator.missed { background: rgba(231, 76, 60, 0.2); color: #e74c3c; }

        .checklist-text {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .checklist-fact-desc {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
          text-align: left;
        }

        .checklist-fact-status-label {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .checklist-fact-status-label.verified { color: #2ecc71; background: rgba(46, 204, 113, 0.08); }
        .checklist-fact-status-label.partially-verified { color: #f1c40f; background: rgba(241, 196, 15, 0.08); }
        .checklist-fact-status-label.missed { color: #e74c3c; background: rgba(231, 76, 60, 0.08); }

        /* Responsive Dashboard styling */
        @media (max-width: 1100px) {
          .db-sidebar {
            width: 80px;
            padding: 20px 10px;
            align-items: center;
          }
          
          .db-sidebar-logo .logo-text,
          .db-menu-item span,
          .db-upgrade-card {
            display: none;
          }

          .db-menu-item {
            justify-content: center;
            padding: 12px;
          }

          .db-stats-row {
            grid-template-columns: repeat(2, 1fr);
          }

          .db-charts-row {
            grid-template-columns: 1fr;
          }

          .db-bottom-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .db-header {
            padding: 15px 20px;
          }

          .db-header-search {
            width: 180px;
          }

          .db-body {
            padding: 20px;
          }

          .db-stats-row {
            grid-template-columns: 1fr;
          }

          .donut-panel-content {
            flex-direction: column;
            align-items: center;
          }

          .report-modal-scores-row {
            grid-template-columns: repeat(2, 1fr);
          }

          .speech-pattern-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
