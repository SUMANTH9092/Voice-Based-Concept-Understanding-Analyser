import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, CircleStop, CheckCircle, Cpu, Radio, Sparkles, Binary, CheckSquare, FileBadge, ArrowRight } from 'lucide-react';

const TOPIC_PRESETS = [
  {
    id: 'photosynthesis',
    name: 'Photosynthesis in Plants',
    accuracy: '92%',
    similarity: '89%',
    fluency: '88%',
    completeness: '95%',
    transcription: "Photosynthesis is the biological process used by plants, algae, and some bacteria to convert light energy from the sun into chemical energy. Chlorophyll inside the plant's chloroplasts absorbs sunlight, which combines carbon dioxide from the air and water from the soil to produce glucose (sugar) for energy and releases oxygen back into the atmosphere as a byproduct.",
    reference: "Photosynthesis is a photochemical process in which light energy is absorbed by pigment molecules (primarily chlorophyll) to drive the synthesis of organic compounds (glucose) from carbon dioxide and water, releasing oxygen as a gaseous byproduct. The reaction is summary: 6CO2 + 6H2O + light -> C6H12O6 + 6O2.",
    keyFacts: [
      { fact: "Chlorophyll absorbs light in chloroplasts", status: "verified" },
      { fact: "Requires carbon dioxide and water", status: "verified" },
      { fact: "Produces glucose (organic sugar)", status: "verified" },
      { fact: "Releases oxygen as gaseous byproduct", status: "verified" },
      { fact: "Summary formula matches chemical equation", status: "missed" }
    ],
    insights: "Excellent explanation. You covered the main reactants (carbon dioxide and water) and products (glucose and oxygen), along with chlorophyll's role. To improve, mention the exact chemical reaction formula or specify light-dependent vs. light-independent reactions.",
    pauseData: [3, 2, 4, 3, 2, 1, 2]
  },
  {
    id: 'newton',
    name: "Newton's Laws of Motion",
    accuracy: '88%',
    similarity: '85%',
    fluency: '82%',
    completeness: '92%',
    transcription: "Newton's laws of motion are three physical laws. First, a body remains at rest or in uniform motion unless acted upon by an external force. Second, force equals mass times acceleration, or F equals M A, meaning force depends on how heavy something is and how fast it speeds up. Third, for every action, there is an equal and opposite reaction.",
    reference: "Newton's three laws of motion describe the relationship between a body and the forces acting upon it. First Law: Law of Inertia (object remains at rest or in constant velocity unless acted on by external net force). Second Law: F = ma (net force equals rate of change of momentum, proportional to mass times acceleration). Third Law: Action-Reaction (forces occur in equal and opposite action-reaction pairs).",
    keyFacts: [
      { fact: "Three fundamental laws of motion", status: "verified" },
      { fact: "First Law: Law of Inertia", status: "verified" },
      { fact: "Second Law: F = ma (Force = mass * acceleration)", status: "verified" },
      { fact: "Third Law: Action & opposite reaction", status: "verified" },
      { fact: "Net force change of momentum relation", status: "partially-verified" }
    ],
    insights: "Solid baseline. You articulated all three laws correctly. Your explanation of the second law could be slightly more technical by describing it in terms of rate of change of momentum rather than just F=ma.",
    pauseData: [2, 4, 5, 2, 4, 3, 4]
  },
  {
    id: 'water-cycle',
    name: 'Water Cycle Explanation',
    accuracy: '75%',
    similarity: '78%',
    fluency: '70%',
    completeness: '80%',
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
    insights: "Good core description of Evaporation, Condensation, and Precipitation. However, you missed key vocabulary like Transpiration (release of water from plants) and Infiltration (movement of water into soil layers). Add these to raise your completeness score.",
    pauseData: [5, 6, 8, 4, 6, 5, 7]
  },
  {
    id: 'pythagorean',
    name: 'Pythagorean Theorem',
    accuracy: '90%',
    similarity: '88%',
    fluency: '85%',
    completeness: '90%',
    transcription: "The Pythagorean theorem applies to right-angled triangles. It states that the square of the hypotenuse, which is the longest side opposite the ninety-degree angle, is equal to the sum of the squares of the other two sides. In mathematical terms, this is written as a squared plus b squared equals c squared.",
    reference: "In mathematics, the Pythagorean theorem states that in any right-angled triangle, the square of the length of the hypotenuse (c) is equal to the sum of the squares of the lengths of the legs (a and b): a² + b² = c². The hypotenuse is the side opposite the right angle.",
    keyFacts: [
      { fact: "Applies to right-angled triangles only", status: "verified" },
      { fact: "Hypotenuse is the side opposite right angle", status: "verified" },
      { fact: "Square of hypotenuse equals sum of squares of legs", status: "verified" },
      { fact: "Formula: a² + b² = c²", status: "verified" }
    ],
    insights: "Perfect and precise explanation. You correctly identified that it only applies to right triangles, defined the hypotenuse, stated the theorem textually, and provided the algebraic formula. Great job!",
    pauseData: [1, 2, 2, 1, 2, 2, 1]
  }
];

export default function AnalysisModal({ isOpen, onClose, onAnalysisComplete }) {
  const [step, setStep] = useState(1); // 1: Topic Select, 2: Recording, 3: AI Pipeline, 4: Complete
  const [selectedTopic, setSelectedTopic] = useState(TOPIC_PRESETS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [activePipelineStep, setActivePipelineStep] = useState(0);

  const timerRef = useRef(null);
  const textIndexRef = useRef(0);
  const transcriptionWords = useRef([]);

  useEffect(() => {
    if (!isOpen) {
      // Reset state
      setStep(1);
      setIsRecording(false);
      setRecordingSeconds(0);
      setTypedText('');
      setPipelineProgress(0);
      setActivePipelineStep(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  // Handle Recording Timer and Typing Simulation
  useEffect(() => {
    if (isRecording) {
      transcriptionWords.current = selectedTopic.transcription.split(' ');
      textIndexRef.current = 0;
      setTypedText('');

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          const nextSec = prev + 1;
          
          // Type some words
          const wordsToTypeCount = Math.ceil((transcriptionWords.current.length / 12) * nextSec); // complete in 12s
          const currentWords = transcriptionWords.current.slice(0, wordsToTypeCount).join(' ');
          setTypedText(currentWords);

          if (nextSec >= 12) {
            // Auto stop after 12 seconds
            handleStopRecording();
            return 12;
          }
          return nextSec;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, selectedTopic]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setStep(2);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setStep(3);
    runAiPipeline();
  };

  // Simulate AI pipeline progression
  const runAiPipeline = () => {
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      setActivePipelineStep(currentStep);
      setPipelineProgress(currentStep * 20);

      if (currentStep >= 5) {
        clearInterval(interval);
        setTimeout(() => {
          onAnalysisComplete(selectedTopic);
          onClose();
        }, 1000);
      }
    }, 1200);
  };

  if (!isOpen) return null;

  const pipelineSteps = [
    { name: "Transcribing audio", tool: "OpenAI Whisper AI" },
    { name: "Generating reference rubrics", tool: "Google Gemini AI" },
    { name: "Calculating semantic matching", tool: "Sentence-BERT" },
    { name: "Verifying factual correctness", tool: "Fact-Check Module" },
    { name: "Extracting speech speed & pauses", tool: "Librosa Engine" }
  ];

  return (
    <div className="modal-backdrop">
      <div className="modal-window glass-container animate-slide-in">
        
        {/* Close Button */}
        {step < 3 && (
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        )}

        {/* STEP 1: SELECT TOPIC */}
        {step === 1 && (
          <div className="step-content">
            <h2 className="step-heading font-heading text-gradient">Select Concept to Explain</h2>
            <p className="step-subheading">Choose a topic below, then click Start to record your voice explanation.</p>
            
            <div className="topics-preset-list">
              {TOPIC_PRESETS.map((topic) => (
                <div 
                  key={topic.id} 
                  className={`topic-preset-card ${selectedTopic.id === topic.id ? 'active' : ''}`}
                  onClick={() => setSelectedTopic(topic)}
                >
                  <div className="preset-radio-circle"></div>
                  <div className="preset-info">
                    <span className="preset-name font-heading">{topic.name}</span>
                    <span className="preset-meta">Duration: ~15 seconds</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-premium start-rec-trigger-btn" onClick={handleStartRecording}>
              <Mic size={18} />
              <span>Start Explaining</span>
            </button>
          </div>
        )}

        {/* STEP 2: VOICE RECORDING SIMULATOR */}
        {step === 2 && (
          <div className="step-content text-center">
            <div className="rec-badge">
              <span className="rec-dot-blink"></span>
              <span>LIVE RECORDING</span>
            </div>

            <h2 className="step-heading font-heading">{selectedTopic.name}</h2>
            <span className="rec-timer">00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}</span>

            {/* Glowing soundwave image or CSS waveforms */}
            <div className="recording-waveform-wrapper">
              <div className="wave-bars-overlay">
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
              </div>
              <img 
                src="/images/WhatsApp Image 2026-07-05 at 7.11.05 PM (4).jpeg" 
                alt="Sound Waveform" 
                className="recording-waveform-img animate-pulse-glow"
              />
            </div>

            {/* Simulated Live Transcription */}
            <div className="transcription-teleprompter-box glass-card">
              <h4 className="transcription-label font-heading">Whisper Transcription:</h4>
              <p className="transcription-body-text">
                {typedText || "Start speaking to see transcription..."}
                <span className="cursor-blink">|</span>
              </p>
            </div>

            <button className="stop-rec-btn" onClick={handleStopRecording}>
              <CircleStop size={18} />
              <span>Stop & Analyze</span>
            </button>
          </div>
        )}

        {/* STEP 3: AI PIPELINE PROCESSING */}
        {step === 3 && (
          <div className="step-content">
            <h2 className="step-heading font-heading text-gradient">AI Processing Pipeline</h2>
            <p className="step-subheading">Evaluating explanation against criteria standards...</p>

            <div className="pipeline-progressbar-wrapper">
              <div className="pipeline-bar-track">
                <div className="pipeline-bar-fill" style={{ width: `${pipelineProgress}%` }}></div>
              </div>
              <span className="pipeline-progress-text">{pipelineProgress}% Completed</span>
            </div>

            <div className="pipeline-stepper-list">
              {pipelineSteps.map((s, idx) => {
                const isDone = activePipelineStep > idx;
                const isCurrent = activePipelineStep === idx;
                
                return (
                  <div key={idx} className={`pipeline-step-item ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
                    <div className="step-status-indicator">
                      {isDone ? (
                        <CheckCircle size={18} className="status-icon green" />
                      ) : isCurrent ? (
                        <span className="status-spinner"></span>
                      ) : (
                        <div className="status-dot"></div>
                      )}
                    </div>
                    <div className="step-detail-text">
                      <span className="step-name font-heading">{s.name}</span>
                      <span className="step-tool">{s.tool}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(1, 0, 15, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .modal-window {
          width: 100%;
          max-width: 580px;
          background: rgba(12, 14, 35, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          color: white;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .modal-close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: rgba(255, 255, 255, 0.6);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .step-content {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .text-center {
          text-align: center !important;
          align-items: center;
        }

        .step-heading {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .step-subheading {
          font-size: 0.95rem;
          color: var(--text-muted-light);
          margin-bottom: 30px;
        }

        /* Preset select card list styling */
        .topics-preset-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
          width: 100%;
        }

        .topic-preset-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .topic-preset-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .topic-preset-card.active {
          background: rgba(0, 242, 254, 0.04);
          border-color: var(--accent-blue);
        }

        .preset-radio-circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .topic-preset-card.active .preset-radio-circle {
          border-color: var(--accent-blue);
        }

        .topic-preset-card.active .preset-radio-circle::after {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent-blue);
        }

        .preset-info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .preset-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
        }

        .preset-meta {
          font-size: 0.75rem;
          color: var(--text-muted-light);
          margin-top: 2px;
        }

        .start-rec-trigger-btn {
          width: 100%;
          padding: 16px;
          font-size: 1rem;
        }

        /* Live record state styling */
        .rec-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 20px;
          background: rgba(231, 76, 60, 0.15);
          border: 1px solid rgba(231, 76, 60, 0.3);
          color: #e74c3c;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .rec-dot-blink {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #e74c3c;
          animation: ripple 1.5s infinite ease-out;
        }

        .rec-timer {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 800;
          color: white;
          display: block;
          margin-bottom: 20px;
        }

        .recording-waveform-wrapper {
          position: relative;
          width: 100%;
          max-width: 320px;
          height: 140px;
          margin: 0 auto 30px;
          border-radius: 16px;
          overflow: hidden;
          background: #03001e;
        }

        .recording-waveform-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
        }

        .wave-bars-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          z-index: 2;
          padding: 0 20px;
        }

        .stop-rec-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          background: #e74c3c;
          color: white;
          border: none;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
          transition: all 0.2s ease;
        }

        .stop-rec-btn:hover {
          background: #c0392b;
          transform: translateY(-2px);
        }

        .transcription-teleprompter-box {
          width: 100%;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          text-align: left;
          height: 110px;
          overflow-y: auto;
          margin-bottom: 24px;
        }

        .transcription-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-blue);
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .transcription-body-text {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.5;
        }

        .cursor-blink {
          color: var(--accent-blue);
          font-weight: bold;
          animation: ripple 0.8s infinite;
          margin-left: 2px;
        }

        /* AI Pipeline State */
        .pipeline-progressbar-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 30px;
        }

        .pipeline-bar-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          overflow: hidden;
        }

        .pipeline-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .pipeline-progress-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted-light);
          align-self: flex-end;
        }

        .pipeline-stepper-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pipeline-step-item {
          display: flex;
          align-items: center;
          gap: 16px;
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }

        .pipeline-step-item.current {
          opacity: 1;
        }

        .pipeline-step-item.done {
          opacity: 0.95;
        }

        .step-status-indicator {
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
        }

        .status-icon.green {
          color: #2ecc71;
        }

        .status-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0, 242, 254, 0.2);
          border-top-color: var(--accent-blue);
          border-radius: 50%;
          animation: spin-slow 1s linear infinite;
        }

        .step-detail-text {
          display: flex;
          flex-direction: column;
        }

        .step-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: white;
        }

        .pipeline-step-item.done .step-name {
          text-decoration: line-through;
          color: rgba(255, 255, 255, 0.6);
        }

        .step-tool {
          font-size: 0.75rem;
          color: var(--text-muted-light);
          margin-top: 1px;
        }

        .pipeline-step-item.current .step-tool {
          color: var(--accent-blue);
        }
      `}</style>
    </div>
  );
}
