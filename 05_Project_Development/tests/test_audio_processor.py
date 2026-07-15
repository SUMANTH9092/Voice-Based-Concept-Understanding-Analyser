"""Unit tests for audio_processor.py — Vocal Analytics Engine."""

import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from app.audio_processor import detect_filler_words, analyse_audio


class TestDetectFillerWords(unittest.TestCase):
    """Tests for the detect_filler_words() function."""

    def test_detects_common_filler_words(self):
        """Should detect 'um', 'uh', 'like' in the transcript."""
        transcript = "Um, machine learning is, like, basically a subset of AI, uh, you know."
        result = detect_filler_words(transcript)
        self.assertIn("um", result["filler_words_detected"])
        self.assertIn("like", result["filler_words_detected"])
        self.assertIn("uh", result["filler_words_detected"])

    def test_no_filler_words_in_clean_transcript(self):
        """Clean, academic language should return an empty filler list."""
        transcript = "Machine learning is a subset of artificial intelligence that enables systems to learn from data."
        result = detect_filler_words(transcript)
        self.assertEqual(result["filler_word_count"], 0)
        self.assertEqual(result["filler_words_detected"], [])

    def test_filler_word_count_accuracy(self):
        """Should correctly count multiple occurrences of the same filler word."""
        transcript = "Um, this is um, really um important."
        result = detect_filler_words(transcript)
        self.assertEqual(result["filler_word_count"], 3)

    def test_case_insensitive_detection(self):
        """Filler word detection must be case-insensitive."""
        transcript = "UM, I think this is, Like, you know, really cool."
        result = detect_filler_words(transcript)
        self.assertIn("um", result["filler_words_detected"])
        self.assertIn("like", result["filler_words_detected"])

    def test_returns_dict_with_correct_keys(self):
        """Result must always be a dict with 'filler_words_detected' and 'filler_word_count'."""
        result = detect_filler_words("some text")
        self.assertIn("filler_words_detected", result)
        self.assertIn("filler_word_count", result)
        self.assertIsInstance(result["filler_words_detected"], list)
        self.assertIsInstance(result["filler_word_count"], int)

    def test_empty_transcript_returns_zero(self):
        """Empty transcript should return zero filler words."""
        result = detect_filler_words("")
        self.assertEqual(result["filler_word_count"], 0)
        self.assertEqual(result["filler_words_detected"], [])


if __name__ == "__main__":
    unittest.main()
