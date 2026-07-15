# Project Planning & Timeline - Voice-Based Concept Understanding Analyser

This document details the development sprints, milestones, and release schedules for the VBCUA application.

---

## 1. Project Milestones

| Milestone | Title | Key Deliverable | Target Date | Status |
| :--- | :--- | :--- | :--- | :--- |
| **M1** | Project Brainstorming & Requirements | Finalized feature scope, architecture design, tech stack selection, and SRS. | Day 1 | Complete |
| **M2** | Core Transcription Module | OpenAI Whisper integration, audio format validation, and transcript display in Streamlit. | Day 2 | Complete |
| **M3** | Semantic Analysis Module | Sentence-BERT integration, cosine similarity computation, and understanding grade logic. | Day 3 | Complete |
| **M4** | Vocal Analytics & Visualization | Librosa-based filler word detection, pause detection, RMS energy, and Matplotlib waveform plots. | Day 4 | Complete |
| **M5** | PDF Report Generation & SDLC Packaging | ReportLab PDF generation, SDLC folder structure migration, CI configuration, and GitHub push. | Day 5 | Complete |

---

## 2. Sprint Timeline

We executed this project in three focused sprints using an agile Scrum framework:

### Sprint 1: Foundation & Transcription (Days 1–2)
- **Goal**: Set up the project skeleton and integrate the Whisper transcription pipeline.
- **Tasks**:
  - Initialize the Streamlit app structure (`main.py`).
  - Set up virtual environment and `requirements.txt`.
  - Implement `transcriber.py` with configurable Whisper model size.
  - Add audio file upload component with format validation.
  - Display transcript text in the Streamlit UI.
  - Write unit tests for `transcriber.py`.

### Sprint 2: Analysis & Vocal Metrics (Days 3–4)
- **Goal**: Implement the semantic analysis and vocal analytics pipeline.
- **Tasks**:
  - Implement `analyser.py` with Sentence-BERT similarity scoring.
  - Define cosine similarity thresholds and understanding grade logic.
  - Implement `audio_processor.py` with Librosa for filler word detection.
  - Add pause detection (silence interval analysis) and RMS energy computation.
  - Implement `visualizer.py` with waveform and spectrogram plots.
  - Integrate all analytics results into the Streamlit dashboard.
  - Write unit tests for `analyser.py` and `audio_processor.py`.

### Sprint 3: PDF Generation, Polish & Release (Day 5)
- **Goal**: Generate the PDF report and finalize the repository for GitHub.
- **Tasks**:
  - Implement `pdf_generator.py` with ReportLab for structured report output.
  - Embed waveform plot image into the PDF report.
  - Add sidebar configuration (Whisper model, similarity threshold, student name).
  - Reorganize code into SDLC folder structure.
  - Write all documentation (SRS, Design, Planning, Testing, Project Report, Demonstration).
  - Configure GitHub Actions CI/CD workflow.
  - Push final codebase to GitHub.

---

## 3. Risk Register

| Risk ID | Description | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **R-01** | Whisper transcription is slow on low-spec machines. | Medium | High | Default to `tiny` or `base` model; document hardware recommendations. |
| **R-02** | Sentence-BERT model download fails in offline environments. | Low | High | Bundle a local model cache path configuration option. |
| **R-03** | Librosa fails to detect pauses on low-quality audio. | Medium | Medium | Implement fallback silence detection using fixed RMS threshold. |
| **R-04** | Audio formats not supported by `soundfile` backend. | Low | Medium | Convert audio to WAV on upload using PyDub as a preprocessing step. |
| **R-05** | ReportLab PDF layout breaks on very long transcripts. | Low | Low | Implement text wrapping and dynamic page overflow handling. |

---

## 4. Resource Plan

| Resource | Role | Tool/Technology |
| :--- | :--- | :--- |
| Python 3.10 | Core Language | All modules |
| OpenAI Whisper | Speech-to-Text | `transcriber.py` |
| Sentence-BERT | Semantic Analysis | `analyser.py` |
| Librosa | Audio Processing | `audio_processor.py` |
| Matplotlib | Visualization | `visualizer.py` |
| ReportLab | PDF Generation | `pdf_generator.py` |
| Streamlit | Frontend Dashboard | `main.py` |
| GitHub Actions | CI/CD | `.github/workflows/python-app.yml` |
