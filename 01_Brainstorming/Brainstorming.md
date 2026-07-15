# Brainstorming Session Notes: VBCUA

## 1. Feature Brainstorming & Prioritization

During the initial brainstorming, we mapped out several potential features and classified them using the MoSCoW framework:

### Must-Have
- Audio file upload interface (WAV, MP3, M4A support).
- OpenAI Whisper integration for automatic speech-to-text transcription.
- Sentence-BERT semantic similarity scoring against a reference concept.
- Categorical understanding grade (Excellent / Good / Needs Improvement / Poor).
- Filler word detection and count (um, uh, like, you know, basically).
- Waveform visualization of the uploaded audio.
- PDF report generation summarizing all metrics.

### Should-Have
- Pause detection and analysis using Librosa.
- RMS energy analysis to assess vocal confidence.
- Session history log to track improvement over multiple attempts.
- Spectrogram visualization alongside the waveform.

### Could-Have
- Multi-language concept evaluation using Whisper's multilingual models.
- Real-time in-browser audio recording (no file upload required).
- LLM-based natural language improvement suggestions (e.g., via Gemini API).
- Educator portal to assign concepts to multiple students and view class-wide analytics.

### Won't-Have (For MVP)
- Cloud user authentication and multi-user accounts.
- Automated grading system integration with LMS platforms (e.g., Moodle, Canvas).
- Live real-time transcription (streaming Whisper).

---

## 2. Technical Stack Brainstorming

### Speech Recognition Options
- *Google Cloud Speech-to-Text*: High accuracy but requires cloud subscription and API key.
- *DeepSpeech*: Open-source, but lower accuracy for domain-specific vocabulary.
- *OpenAI Whisper*: **Selected** — Open-source, runs locally, multilingual, highly accurate even for technical vocabulary.

### Semantic Analysis Options
- *TF-IDF + Cosine Similarity*: Simple but ignores semantic meaning; poor for paraphrased answers.
- *spaCy Word Vectors*: Better than TF-IDF but less context-aware than transformer models.
- *Sentence-BERT (`all-MiniLM-L6-v2`)*: **Selected** — Fast, accurate, purpose-built for semantic similarity tasks.

### Audio Processing Options
- *PyDub*: Good for audio file manipulation but lacks spectral analysis.
- *SoundFile + NumPy*: Low-level, requires manual feature extraction.
- *Librosa*: **Selected** — Industry-standard for audio analysis; supports waveform, spectrogram, RMS, and silence detection.

### Frontend Options
- *React / Next.js*: High flexibility, but requires significant JS development and API glue-code.
- *Flask + Jinja2*: Simple backend-rendered UI, limited interactivity.
- *Streamlit*: **Selected** — Highly reactive, Python-native, handles file upload state and live visualizations cleanly with minimal code.

### PDF Generation Options
- *WeasyPrint*: HTML-to-PDF conversion, complex dependencies.
- *FPDF2*: Lightweight but limited layout control.
- *ReportLab*: **Selected** — Professional-grade PDF generation with full layout control for tables and charts.

---

## 3. Architecture Brainstorming

### Monolith vs. Microservices
- Given the project scope (single-user local tool), a **monolithic Python application** with clear module separation is the right architectural choice.
- Separation of concerns is maintained via dedicated modules: `transcriber.py`, `analyser.py`, `audio_processor.py`, `visualizer.py`, `pdf_generator.py`.

### Data Storage
- For MVP, in-memory processing is sufficient — no persistent storage needed unless session history is required.
- Optional SQLite database for session history logging, keeping it lightweight and dependency-free.
