# Changelog - Voice-Based Concept Understanding Analyser

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-07-15

### Added
- Professional SDLC documentation structure with 8 phase folders.
- Comprehensive Mermaid diagrams for System Architecture, Application Workflow, and Database Schema.
- GitHub community files: `LICENSE`, `CONTRIBUTING.md`, `CHANGELOG.md`, and `CODE_OF_CONDUCT.md`.
- GitHub Issue templates (`bug_report.md`, `feature_request.md`) for structured bug reporting.
- GitHub Actions workflow (`python-app.yml`) for automated linting and unittest checks on pushes and pull requests.
- Screenshot placeholders under `Screenshots/` folder for UI documentation.
- Full project documentation in `07_Project_Documentation/Project_Report.md`.

### Changed
- Reorganized source code into SDLC-compliant folder structure (`05_Project_Development/`).
- Enhanced `README.md` with detailed system architecture diagrams, API documentation, and installation guide.
- Modularized source code into `app/` sub-packages: `transcriber.py`, `analyser.py`, `audio_processor.py`, `visualizer.py`, and `pdf_generator.py`.

---

## [1.0.0] - 2026-07-08

### Added
- Initial release of the Voice-Based Concept Understanding Analyser.
- OpenAI Whisper integration for automatic speech-to-text transcription.
- Sentence-BERT (`sentence-transformers`) integration for semantic similarity scoring.
- Librosa-based audio processing pipeline for filler word detection, pause detection, and RMS energy analysis.
- Streamlit dashboard with audio upload, real-time waveform visualization, and results display.
- PDF report generation using ReportLab for downloadable assessment summaries.
- Basic `README.md` with project overview and feature list.
- `requirements.txt` with all core dependencies.

### Fixed
- N/A (Initial release)

---

## [Unreleased]

### Planned
- Multi-language concept evaluation using Whisper's multilingual models.
- Educator portal for managing student assessments and batch evaluations.
- Real-time in-browser audio recording support.
- LLM-based natural language feedback generation using Google Gemini API.
- Cloud deployment configuration for AWS/GCP.
