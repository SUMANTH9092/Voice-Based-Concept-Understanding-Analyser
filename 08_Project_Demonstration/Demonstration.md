# Project Demonstration - Voice-Based Concept Understanding Analyser

This document outlines the presentation slide structure, live demonstration script, and walkthrough video placeholders for VBCUA.

---

## 1. Walkthrough Demo Video Placeholder

A full walkthrough showing VBCUA's features has been recorded as a demonstration:
- **Recorded walkthrough name**: `vbcua_demonstration.webp`
- **Video Placeholder**: `[Walkthrough Demonstration Video Link]` *(To be uploaded to YouTube/Google Drive for public release)*

---

## 2. Live Demonstration Script

Use the following step-by-step script to showcase VBCUA during live review calls, academic presentations, or project vivas:

### Setup Phase
1. Open a terminal and run:
   ```bash
   cd 05_Project_Development
   streamlit run main.py
   ```
2. Navigate to `http://localhost:8501` in your browser.
3. Walk the audience through the sidebar configuration:
   - Whisper Model Size selection (`tiny` → `base` → `small`).
   - Similarity Threshold slider.
   - Student Name and Concept Name fields.

---

### Step 1: Full Assessment Demonstration (Strong Understanding)

1. In the **Concept Name** field, enter: `Machine Learning`
2. In the **Reference Concept** text area, paste:
   > *"Machine learning is a subset of artificial intelligence that enables systems to automatically learn and improve from experience without being explicitly programmed, by using algorithms that analyze data to identify patterns."*
3. Upload the provided sample audio file (`sample_strong_explanation.wav`) of a student explaining Machine Learning clearly and accurately.
4. Click **Analyse Concept Understanding**.
5. Show the audience:
   - **High similarity score** (e.g., 0.85 → "Good" grade)
   - **Low filler word count** (0–2 filler words)
   - **Clean waveform** with minimal silent gaps
   - **PDF download button**

---

### Step 2: Weak Understanding Demonstration

1. Keep the same reference concept.
2. Upload a sample audio file (`sample_weak_explanation.wav`) of a student giving a vague or off-topic explanation.
3. Click **Analyse Concept Understanding**.
4. Show the contrast:
   - **Low similarity score** (e.g., 0.35 → "Poor" grade)
   - **High filler word count** (many "um", "uh", "like" instances)
   - **Fragmented waveform** with long silent pauses

---

### Step 3: PDF Report Download

1. After the strong understanding demonstration, click **⬇️ Download PDF Report**.
2. Open the downloaded PDF and show:
   - Student name, concept name, and timestamp
   - Full transcript text
   - Similarity score and understanding grade in the results table
   - Filler word and pause metrics
   - Embedded waveform visualization
3. Emphasize: *"This is a complete, professional assessment report generated in seconds — entirely offline, with no data uploaded to any external server."*

---

## 3. Presentation Slide Structure

| Slide # | Title | Content |
| :--- | :--- | :--- |
| 1 | Project Title & Team | VBCUA — Voice-Based Concept Understanding Analyser |
| 2 | Problem Statement | Subjectivity in oral assessments; no vocal analytics; scalability issues |
| 3 | Proposed Solution | AI-powered pipeline: Whisper + Sentence-BERT + Librosa + ReportLab |
| 4 | System Architecture | Architecture Mermaid diagram from Design.md |
| 5 | Key Features | Waveform, filler detection, similarity scoring, PDF reports |
| 6 | Technology Stack | Python, Whisper, SBERT, Librosa, Streamlit, ReportLab |
| 7 | Live Demo | Demonstrate full assessment flow (Steps 1–3 above) |
| 8 | Testing Results | Summary table from Testing.md (18 tests, all passing) |
| 9 | Results & Grading Scale | Similarity score → grade mapping table |
| 10 | Future Enhancements | Multi-language, educator portal, real-time recording, LLM feedback |
| 11 | Conclusion | Summary and project impact |
| 12 | Q&A | Open for questions |

---

## 4. Screenshots Reference

All UI screenshots should be placed in the `Screenshots/` folder and referenced from `README.md`:

| Screenshot File | Description |
| :--- | :--- |
| `dashboard.png` | Main Streamlit dashboard showing upload section and sidebar |
| `waveform.png` | Waveform visualization tab |
| `similarity_score.png` | Results section showing score, grade, and metrics |
| `filler_detection.png` | Filler word warning alert in the UI |
| `pdf_report.png` | Preview of the generated PDF assessment report |
