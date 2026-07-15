"""
main.py — Streamlit Application Entry Point for VBCUA.

Launches the Voice-Based Concept Understanding Analyser dashboard.
"""

import os
import tempfile
import streamlit as st

from app.transcriber import transcribe
from app.analyser import compute_similarity, get_understanding_grade
from app.audio_processor import detect_filler_words, analyse_audio
from app.visualizer import plot_waveform, plot_spectrogram
from app.pdf_generator import generate_report

# ─────────────────────────────────────────────────────────────────────────────
# Page Configuration
# ─────────────────────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="VBCUA — Voice-Based Concept Understanding Analyser",
    page_icon="🎙️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ─────────────────────────────────────────────────────────────────────────────
# Sidebar Configuration
# ─────────────────────────────────────────────────────────────────────────────
with st.sidebar:
    st.title("⚙️ Configuration")
    st.markdown("---")

    student_name = st.text_input("Student Name (Optional)", placeholder="e.g., Sumanth Kumar")
    concept_name = st.text_input("Concept Name", placeholder="e.g., Machine Learning")

    st.markdown("---")
    st.subheader("🔧 Model Settings")
    whisper_model = st.selectbox(
        "Whisper Model Size",
        options=["tiny", "base", "small", "medium"],
        index=1,
        help="Larger models are more accurate but slower. 'base' recommended for most use cases."
    )
    similarity_threshold = st.slider(
        "Similarity Threshold for 'Good' Grade",
        min_value=0.50,
        max_value=0.95,
        value=0.75,
        step=0.05,
        help="The minimum cosine similarity score required for a 'Good' understanding grade."
    )

    st.markdown("---")
    st.caption("Voice-Based Concept Understanding Analyser v1.1.0")
    st.caption("Powered by OpenAI Whisper & Sentence-BERT")

# ─────────────────────────────────────────────────────────────────────────────
# Main Dashboard
# ─────────────────────────────────────────────────────────────────────────────
st.title("🎙️ Voice-Based Concept Understanding Analyser")
st.markdown(
    "*Upload a voice recording and enter a reference concept to receive an AI-powered assessment "
    "of conceptual understanding, vocal fluency, and confidence metrics.*"
)
st.markdown("---")

col1, col2 = st.columns([1, 1])

with col1:
    st.subheader("📂 Upload Audio")
    audio_file = st.file_uploader(
        "Upload your voice recording",
        type=["wav", "mp3", "m4a", "ogg"],
        help="Supported formats: WAV, MP3, M4A, OGG. Max duration: 5 minutes."
    )

with col2:
    st.subheader("📖 Reference Concept")
    reference_concept = st.text_area(
        "Enter the correct concept definition",
        height=150,
        placeholder="e.g., Machine learning is a subset of artificial intelligence that enables systems to automatically learn from experience without being explicitly programmed."
    )

st.markdown("---")

# ─────────────────────────────────────────────────────────────────────────────
# Processing & Analysis
# ─────────────────────────────────────────────────────────────────────────────
if st.button("🚀 Analyse Concept Understanding", use_container_width=True, type="primary"):
    if not audio_file:
        st.error("❌ Please upload an audio file before analysing.")
    elif not reference_concept.strip():
        st.error("❌ Please provide a reference concept definition.")
    else:
        with st.spinner("🔄 Processing... This may take a moment depending on audio length and model size."):
            # Save uploaded audio to a temp file
            with tempfile.NamedTemporaryFile(delete=False, suffix=f".{audio_file.name.split('.')[-1]}") as tmp:
                tmp.write(audio_file.read())
                tmp_audio_path = tmp.name

            try:
                # Step 1: Transcription
                st.info("📝 Step 1/4: Transcribing audio with OpenAI Whisper...")
                transcript = transcribe(tmp_audio_path, model_size=whisper_model)

                # Step 2: Semantic Analysis
                st.info("🔍 Step 2/4: Computing semantic similarity with Sentence-BERT...")
                similarity_score = compute_similarity(transcript, reference_concept.strip())
                grade = get_understanding_grade(similarity_score, threshold=similarity_threshold)

                # Step 3: Vocal Analytics
                st.info("🎵 Step 3/4: Analysing vocal patterns with Librosa...")
                filler_data = detect_filler_words(transcript)
                audio_metrics = analyse_audio(tmp_audio_path)

                # Step 4: Visualization
                st.info("📊 Step 4/4: Generating waveform visualizations...")
                waveform_fig = plot_waveform(tmp_audio_path)
                spectrogram_fig = plot_spectrogram(tmp_audio_path)

                # ─── Display Results ───────────────────────────────────────
                st.markdown("---")
                st.subheader("📋 Assessment Results")

                grade_colors = {
                    "Excellent": "🟢",
                    "Good": "🔵",
                    "Needs Improvement": "🟡",
                    "Poor": "🔴"
                }

                col_a, col_b, col_c, col_d = st.columns(4)
                col_a.metric("Similarity Score", f"{similarity_score:.4f}")
                col_b.metric("Understanding Grade", f"{grade_colors.get(grade, '')} {grade}")
                col_c.metric("Filler Words", str(filler_data["filler_word_count"]))
                col_d.metric("Pause Count", str(audio_metrics["pause_count"]))

                col_e, col_f = st.columns(2)
                col_e.metric("Avg. Pause Duration", f"{audio_metrics['avg_pause_duration_sec']:.2f}s")
                col_f.metric("RMS Energy (Confidence)", str(audio_metrics["rms_energy"]))

                st.markdown("---")

                # Transcript
                st.subheader("📝 Transcript")
                st.info(transcript)

                # Filler Words
                if filler_data["filler_words_detected"]:
                    st.warning(
                        f"⚠️ **Filler Words Detected**: {', '.join(filler_data['filler_words_detected'])} "
                        f"(Total occurrences: {filler_data['filler_word_count']})"
                    )

                st.markdown("---")

                # Visualizations
                st.subheader("📈 Audio Visualization")
                tab1, tab2 = st.tabs(["Waveform", "Spectrogram"])
                with tab1:
                    st.pyplot(waveform_fig)
                with tab2:
                    st.pyplot(spectrogram_fig)

                # PDF Report
                st.markdown("---")
                st.subheader("📄 Download Assessment Report")
                report_data = {
                    "student_name": student_name or "Anonymous",
                    "concept_name": concept_name or "Unspecified",
                    "transcript": transcript,
                    "similarity_score": similarity_score,
                    "understanding_grade": grade,
                    **filler_data,
                    **audio_metrics,
                    "waveform_fig": waveform_fig
                }

                with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as pdf_tmp:
                    pdf_path = pdf_tmp.name

                generate_report(report_data, pdf_path)

                with open(pdf_path, "rb") as pdf_file:
                    st.download_button(
                        label="⬇️ Download PDF Report",
                        data=pdf_file,
                        file_name=f"VBCUA_Report_{student_name or 'Assessment'}.pdf",
                        mime="application/pdf",
                        use_container_width=True
                    )

            except Exception as e:
                st.error(f"❌ An error occurred during analysis: {str(e)}")
            finally:
                # Cleanup temp file
                if os.path.exists(tmp_audio_path):
                    os.remove(tmp_audio_path)

else:
    # Landing state
    st.info(
        "👆 Upload an audio file, enter a reference concept, and click **Analyse Concept Understanding** to begin."
    )
    with st.expander("ℹ️ How it works"):
        st.markdown("""
        1. **Upload Audio**: Provide a voice recording (WAV, MP3, M4A, or OGG format).
        2. **Enter Reference Concept**: Paste the textbook definition of the concept being evaluated.
        3. **Configure Settings**: Use the sidebar to select the Whisper model size and grading threshold.
        4. **Click Analyse**: The system will:
           - 🎙️ Transcribe your speech using **OpenAI Whisper**
           - 📊 Score semantic accuracy using **Sentence-BERT**
           - 🔍 Detect filler words, pauses, and vocal energy using **Librosa**
           - 📄 Generate a downloadable **PDF assessment report**
        """)
