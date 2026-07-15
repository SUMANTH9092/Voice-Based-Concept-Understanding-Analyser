# Project Testing Report - Voice-Based Concept Understanding Analyser

This document details the test strategy, test cases, execution results, and bug tracking for the VBCUA application.

---

## 1. Test Strategy

The VBCUA test suite uses Python's built-in `unittest` framework with mock-based unit testing to isolate dependencies (Whisper model, Sentence-BERT, Librosa). This ensures tests run quickly without requiring actual ML model inference.

### Test Layers
| Layer | Scope | Framework |
| :--- | :--- | :--- |
| Unit Tests | Individual functions/modules | `unittest` + `unittest.mock` |
| Integration Tests | Full pipeline from audio to results | Manual / Streamlit UI |

---

## 2. Test Cases Specification

### Transcriber Unit Tests (`test_transcriber.py`)
| Test Case ID | Feature | Description | Inputs | Expected Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-TR-01** | File Not Found | Raise error for missing audio files. | Non-existent path | `FileNotFoundError` | Passed |
| **TC-TR-02** | Valid Transcription | Return transcript string for valid audio. | Silent WAV file + Mock Whisper | Stripped transcript string | Passed |
| **TC-TR-03** | Whitespace Stripping | Transcript output must be stripped. | Mock returns `"  text  "` | `"text"` | Passed |
| **TC-TR-04** | Whisper Failure | Raise `RuntimeError` if Whisper fails. | Mock throws exception | `RuntimeError` | Passed |

### Analyser Unit Tests (`test_analyser.py`)
| Test Case ID | Feature | Description | Inputs | Expected Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-AN-01** | Excellent Grade | Score >= 0.90 yields 'Excellent'. | score=0.95 | `"Excellent"` | Passed |
| **TC-AN-02** | Good Grade | Score in [threshold, 0.90) yields 'Good'. | score=0.80 | `"Good"` | Passed |
| **TC-AN-03** | Needs Improvement Grade | Score in [0.50, threshold) yields 'Needs Improvement'. | score=0.60 | `"Needs Improvement"` | Passed |
| **TC-AN-04** | Poor Grade | Score < 0.50 yields 'Poor'. | score=0.20 | `"Poor"` | Passed |
| **TC-AN-05** | Custom Threshold | Custom threshold shifts grade boundary. | score=0.65, threshold=0.60 | `"Good"` | Passed |
| **TC-AN-06** | Identical Similarity | Identical sentences score >= 0.95. | Same sentence both inputs | score >= 0.95 | Passed |
| **TC-AN-07** | Low Similarity | Unrelated sentences score < 0.60. | Unrelated sentences | score < 0.60 | Passed |
| **TC-AN-08** | Score Range | Similarity score always in [0.0, 1.0]. | Any inputs | 0.0 <= score <= 1.0 | Passed |

### Audio Processor Unit Tests (`test_audio_processor.py`)
| Test Case ID | Feature | Description | Inputs | Expected Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-AP-01** | Filler Word Detection | Detects 'um', 'uh', 'like'. | Transcript with filler words | List contains detected words | Passed |
| **TC-AP-02** | Clean Transcript | No filler words in academic language. | Clean academic transcript | `filler_word_count = 0` | Passed |
| **TC-AP-03** | Count Accuracy | Correctly counts multiple occurrences. | 3× "um" in transcript | `filler_word_count = 3` | Passed |
| **TC-AP-04** | Case Insensitive | Detection is case-insensitive. | `"UM"`, `"Like"` | Both detected | Passed |
| **TC-AP-05** | Return Structure | Result dict has correct keys. | Any input | Keys: `filler_words_detected`, `filler_word_count` | Passed |
| **TC-AP-06** | Empty Transcript | Empty input returns zero. | `""` | `filler_word_count = 0` | Passed |

---

## 3. Test Execution

Run the full test suite:
```bash
cd 05_Project_Development
python -m unittest discover -s tests -v
```

Expected output:
```
test_detects_common_filler_words (tests.test_audio_processor.TestDetectFillerWords) ... ok
test_no_filler_words_in_clean_transcript (tests.test_audio_processor.TestDetectFillerWords) ... ok
...
----------------------------------------------------------------------
Ran 18 tests in 12.345s

OK
```

---

## 4. Bug Tracker

| Bug ID | Description | Severity | Status | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-01** | Whisper fails on M4A files without ffmpeg installed | High | Fixed | Added ffmpeg requirement to documentation and error handling. |
| **BUG-02** | Cosine similarity returned negative values for short single-word inputs | Medium | Fixed | Added `max(0.0, ...)` clamp in `compute_similarity()`. |
| **BUG-03** | Waveform plot overlapped spectrogram in single-column layout | Low | Fixed | Separated into Streamlit tabs for independent rendering. |
| **BUG-04** | PDF report line overflow for very long transcripts | Low | Fixed | Added ReportLab paragraph wrap with `body_style` paragraph style. |
