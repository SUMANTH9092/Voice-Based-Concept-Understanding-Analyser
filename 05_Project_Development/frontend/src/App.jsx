import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Technologies from './components/Technologies';
import Applications from './components/Applications';
import Stats from './components/Stats';
import Footer from './components/Footer';
import AnalysisModal from './components/AnalysisModal';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setView] = useState('landing'); // 'landing' or 'dashboard'
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  const handleAnalysisComplete = (sessionData) => {
    setCurrentSession(sessionData);
    setView('dashboard');
  };

  return (
    <div className="app-root-container">
      {/* Universal Navbar */}
      <Navbar currentView={currentView} setView={setView} />

      {currentView === 'landing' ? (
        <div className="landing-page-view">
          {/* Landing Page Sections */}
          <Hero onStartAnalysis={() => window.open('http://localhost:8501', '_blank')} />
          <About />
          <HowItWorks />
          <Features />
          <Technologies />
          <Applications />
          <Stats />
          <Footer setView={setView} />

          {/* Voice Record Analysis Simulator */}
          <AnalysisModal 
            isOpen={isAnalysisOpen} 
            onClose={() => setIsAnalysisOpen(false)} 
            onAnalysisComplete={handleAnalysisComplete}
          />
        </div>
      ) : (
        <div className="dashboard-page-view">
          <Dashboard 
            currentSession={currentSession} 
            setView={setView} 
          />
        </div>
      )}

      {/* Global CSS adjustments */}
      <style>{`
        .app-root-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        
        .landing-page-view {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .dashboard-page-view {
          width: 100%;
          padding-top: 0px; /* Dashboard handles its own header padding */
        }
      `}</style>
    </div>
  );
}

export default App;
