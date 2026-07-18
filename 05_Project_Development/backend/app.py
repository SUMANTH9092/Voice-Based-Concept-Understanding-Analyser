import os
import streamlit as st

from speech_to_text import speech_to_text
from gemini_utils import get_reference_definition
from semantic_eval import semantic_similarity
from audio_utils import extract_audio_features, save_waveform
from scoring_engine import detect_fillers, evaluate_understanding
from fact_checker import fact_check
from report_generator import generate_report
from style_utils import apply_custom_style

# -------------------------------------------------------
# Page Configuration
# -------------------------------------------------------
st.set_page_config(
    page_title="Voice Based Concept Understanding Analyser",
    layout="wide"
)

# Apply custom dark glassmorphic styling and load background image from frontend assets
apply_custom_style("../frontend/public/images/WhatsApp Image 2026-07-05 at 7.11.04 PM.jpeg")

# Highlighted and Centered Page Header (matches React landing page design)
st.markdown("""
<div style="text-align: center; margin-top: 10px; margin-bottom: 2.5rem;">
    <h1 style="
        font-family: 'Outfit', sans-serif;
        font-weight: 800;
        font-size: 2.8rem !important;
        background: linear-gradient(135deg, #00f2fe 0%, #9b51e0 50%, #f857a6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 10px;
        text-shadow: 0 0 30px rgba(138, 43, 226, 0.3);
        display: inline-block;
    ">🎤 Voice Based Concept Understanding Analyser</h1>
    <h4 style="
        font-family: 'Outfit', sans-serif;
        font-weight: 500;
        color: #c084fc !important;
        font-size: 1.1rem !important;
        letter-spacing: 2px;
        margin-top: 0px;
        text-transform: uppercase;
    ">AI Powered Educational Assessment Platform</h4>
</div>
""", unsafe_allow_html=True)

# Initialize session state variables
if "current_topic" not in st.session_state:
    st.session_state["current_topic"] = ""
if "reference" not in st.session_state:
    st.session_state["reference"] = None
if "analysis_results" not in st.session_state:
    st.session_state["analysis_results"] = None

# Create the two-column dashboard structure
col_left, col_right = st.columns([1, 1.8], gap="large")

# -------------------------------------------------------
# LEFT COLUMN: Configuration and Input Controls
# -------------------------------------------------------
with col_left:
    st.markdown('<h3 style="margin-top:0px; margin-bottom: 15px;">⚙️ Evaluation Config</h3>', unsafe_allow_html=True)
    
    topic = st.text_input(
        "Enter Topic",
        value=st.session_state["current_topic"],
        placeholder="Example: Machine Learning"
    )
    
    # Rerun if topic changed to clear cache
    if topic != st.session_state["current_topic"]:
        st.session_state["current_topic"] = topic
        st.session_state["reference"] = None
        st.session_state["analysis_results"] = None
        st.rerun()
        
    # Generate reference definition block
    if topic:
        if st.session_state["reference"]:
            st.info("📖 Reference definition generated.")
            with st.expander("Preview Reference Definition"):
                st.write(st.session_state["reference"])
        else:
            st.markdown('<div class="secondary-btn">', unsafe_allow_html=True)
            if st.button("Generate Reference"):
                with st.spinner("Generating reference definition from Gemini..."):
                    st.session_state["reference"] = get_reference_definition(topic)
                st.rerun()
            st.markdown('</div>', unsafe_allow_html=True)
            
    st.write("")
    st.markdown('<h3 style="margin-top:10px; margin-bottom: 15px;">🎙️ Spoken Explanation</h3>', unsafe_allow_html=True)
    
    uploaded_file = st.file_uploader(
        "Upload Audio",
        type=["wav", "mp3", "m4a"]
    )
    
    if uploaded_file is not None:
        os.makedirs("uploads", exist_ok=True)
        save_path = os.path.join("uploads", uploaded_file.name)
        
        with open(save_path, "wb") as f:
            f.write(uploaded_file.getbuffer())
            
        st.success("✅ Audio uploaded successfully!")
        st.audio(save_path)
        
        # Analyze CTA Button
        if st.button("🚀 Analyze Understanding"):
            if not topic:
                st.error("Please specify a topic first.")
            else:
                with st.spinner("Analyzing explanation details (Transcription, Semantic Similarity, Facts & Audio metrics)..."):
                    # 1. Speech To Text (Whisper)
                    transcript = speech_to_text(save_path)
                    
                    # 2. Reference Definition (Gemini)
                    if not st.session_state["reference"]:
                        st.session_state["reference"] = get_reference_definition(topic)
                    reference = st.session_state["reference"]
                    
                    # 3. Semantic Similarity (Sentence-BERT)
                    similarity = semantic_similarity(transcript, reference)
                    
                    # 4. Fact Verification (Gemini Evaluator)
                    fact_result = fact_check(reference, transcript)
                    
                    # 5. Acoustic features & Waveform creation
                    audio_features = extract_audio_features(save_path)
                    waveform_path = save_waveform(save_path)
                    
                    # 6. Speech fluency & Fillers detection
                    fillers, total_fillers = detect_fillers(transcript)
                    words = len(transcript.split())
                    filler_ratio = total_fillers / words if words > 0 else 0
                    
                    # 7. Evaluate aggregate scores
                    final_score, level = evaluate_understanding(
                        semantic_score=similarity,
                        ai_accuracy=fact_result["accuracy_score"],
                        filler_ratio=filler_ratio,
                        audio=audio_features
                    )
                    
                    # 8. Generate evaluation PDF report
                    os.makedirs("reports", exist_ok=True)
                    report_path = os.path.join("reports", "evaluation_report.pdf")
                    generate_report(
                        report_path,
                        topic,
                        reference,
                        transcript,
                        similarity,
                        fact_result["accuracy_score"],
                        audio_features,
                        total_fillers,
                        final_score,
                        level
                    )
                    
                    # Store variables in session state to maintain state across pages
                    st.session_state["analysis_results"] = {
                        "topic": topic,
                        "reference": reference,
                        "transcript": transcript,
                        "similarity": similarity,
                        "fact_result": fact_result,
                        "audio_features": audio_features,
                        "waveform_path": waveform_path,
                        "fillers": fillers,
                        "total_fillers": total_fillers,
                        "final_score": final_score,
                        "level": level,
                        "report_path": report_path
                    }
                st.rerun()

# -------------------------------------------------------
# RIGHT COLUMN: Results Dashboard View
# -------------------------------------------------------
with col_right:
    results = st.session_state["analysis_results"]
    
    if results is None:
        st.markdown("""
        <div class="placeholder-panel">
            <div class="placeholder-icon">📊</div>
            <div class="placeholder-title">Awaiting Evaluation</div>
            <div class="placeholder-desc">
                Enter your target <strong>Topic</strong> and upload the student's spoken explanation on the left. Click <strong>Analyze Understanding</strong> to generate the comprehensive evaluation dashboard.
            </div>
        </div>
        """, unsafe_allow_html=True)
    else:
        # Title and PDF download button row
        col_title, col_download = st.columns([2.5, 1], gap="medium")
        with col_title:
            st.markdown(f"## Evaluation Report: <span class='main-gradient-text'>{results['topic']}</span>", unsafe_allow_html=True)
        with col_download:
            with open(results["report_path"], "rb") as pdf:
                st.download_button(
                    label="📄 Download Report",
                    data=pdf,
                    file_name=f"Evaluation_Report_{results['topic'].replace(' ', '_')}.pdf",
                    mime="application/pdf"
                )
        
        # Dashboard Score Summary Grid
        m1, m2, m3, m4 = st.columns(4)
        m1.metric("Final Score", f"{results['final_score']}/100", help="Aggregated grade computed from semantic, factual, and speech fluency parameters.")
        m2.metric("Semantic Similarity", f"{results['similarity']}%", help="Sentence-BERT cosine similarity comparing student's explanation meaning against gold reference standard.")
        m3.metric("AI Accuracy", f"{results['fact_result']['accuracy_score']}%", help="Gemini verification rating checking correct assertions versus flawed details.")
        m4.metric("Fluency (Pause Ratio)", f"{results['audio_features']['pause_ratio']:.2f}", help="Proportion of silence detected in explanation. Optimal speech maintains minor pauses.")

        # Understanding Level Banner Card
        if results["level"] == "Excellent Understanding":
            st.success(f"🌟 **Excellent Understanding** — The explanation is highly accurate, covers the core concepts cleanly, and presents excellent flow.")
        elif results["level"] == "Strong Understanding":
            st.success(f"🟢 **Strong Understanding** — Clear command of the topic with minor omissions or speech fillers.")
        elif results["level"] == "Moderate Understanding":
            st.warning(f"🟡 **Moderate Understanding** — Conceptual knowledge is present, but shows gaps, slight inaccuracies, or minor speaking hesitation.")
        else:
            st.error(f"🔴 **Poor Understanding** — Major factual discrepancies or missing context details. Targeted study is recommended.")
            
        # Segment Tabs
        tab1, tab2, tab3 = st.tabs(["📖 Content Evaluation", "🎤 Speech Analysis", "🤖 AI Fact Checks"])
        
        # TAB 1: Content Evaluation (Definitions side-by-side)
        with tab1:
            col_ref, col_trans = st.columns(2, gap="medium")
            
            with col_ref:
                st.markdown(f"""
                <div class="glass-card" style="height: 100%; margin-bottom: 0px;">
                    <h3 style="margin-top:0px;">📖 Reference Definition</h3>
                    <p style="color: #f3f4f6; font-size: 1rem; line-height: 1.6; margin-bottom:0px;">{results["reference"]}</p>
                </div>
                """, unsafe_allow_html=True)
                
            with col_trans:
                st.markdown(f"""
                <div class="glass-card" style="height: 100%; margin-bottom: 0px;">
                    <h3 style="margin-top:0px;">📝 Student Transcript</h3>
                    <p style="color: #f3f4f6; font-size: 1rem; line-height: 1.6; margin-bottom:0px;">{results["transcript"]}</p>
                </div>
                """, unsafe_allow_html=True)
                
        # TAB 2: Speech Analysis (Acoustics, waveform, fillers)
        with tab2:
            st.write("### 📈 Audio Waveform")
            st.image(results["waveform_path"])
            st.write("")
            
            col_acous, col_fillers = st.columns([1.2, 1], gap="medium")
            
            with col_acous:
                st.write("### 📊 Acoustic Metrics")
                st.markdown(f"""
                <div class="stat-grid">
                    <div class="stat-card">
                        <div class="stat-label">Duration</div>
                        <div class="stat-value">{results['audio_features']['duration']} s</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">RMS Energy</div>
                        <div class="stat-value">{results['audio_features']['rms_energy']:.4f}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Pause Ratio</div>
                        <div class="stat-value">{results['audio_features']['pause_ratio']:.4f}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Filler Count</div>
                        <div class="stat-value">{results['total_fillers']}</div>
                    </div>
                </div>
                """, unsafe_allow_html=True)
                
            with col_fillers:
                st.write("### 🗣️ Speech Fluency")
                if results["fillers"]:
                    st.write("Detected speaking fillers details:")
                    st.json(results["fillers"])
                else:
                    st.success("Fluency evaluation: Exceptional speaking control. No filler words detected.")

        # TAB 3: AI Fact Checks (Claims list)
        with tab3:
            st.write("### 🤖 Fact Verification & Quality Audits")
            
            # Correct Points
            st.write("#### ✅ Verified Assertions")
            if results["fact_result"]["correct_points"]:
                for point in results["fact_result"]["correct_points"]:
                    st.markdown(f'<div class="fact-box fact-correct">✔️ {point}</div>', unsafe_allow_html=True)
            else:
                st.write("No assertions were explicitly verified against the reference data model.")
                
            st.write("")
            
            # Incorrect Points
            st.write("#### ❌ Incorrect or Inaccurate Assertions")
            if results["fact_result"]["incorrect_points"]:
                for point in results["fact_result"]["incorrect_points"]:
                    st.markdown(f'<div class="fact-box fact-incorrect">❌ {point}</div>', unsafe_allow_html=True)
            else:
                st.success("No fact discrepancies or incorrect statements detected.")
                
            st.write("")
            
            # Missing Concepts
            st.write("#### 📌 Omitted Core Concepts")
            if results["fact_result"]["missing_points"]:
                for point in results["fact_result"]["missing_points"]:
                    st.markdown(f'<div class="fact-box fact-missing">⚠️ {point}</div>', unsafe_allow_html=True)
            else:
                st.success("Perfect coverage! No omitted standard reference facts found.")