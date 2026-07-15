"""Unit tests for analyser.py — Semantic Similarity Engine."""

import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from app.analyser import compute_similarity, get_understanding_grade


class TestGetUnderstandingGrade(unittest.TestCase):
    """Tests for the get_understanding_grade() grading function."""

    def test_excellent_grade(self):
        """Scores >= 0.90 should yield 'Excellent'."""
        self.assertEqual(get_understanding_grade(0.95), "Excellent")
        self.assertEqual(get_understanding_grade(0.90), "Excellent")

    def test_good_grade(self):
        """Scores >= threshold (0.75) and < 0.90 should yield 'Good'."""
        self.assertEqual(get_understanding_grade(0.80), "Good")
        self.assertEqual(get_understanding_grade(0.75), "Good")

    def test_needs_improvement_grade(self):
        """Scores >= 0.50 and < threshold should yield 'Needs Improvement'."""
        self.assertEqual(get_understanding_grade(0.60), "Needs Improvement")
        self.assertEqual(get_understanding_grade(0.50), "Needs Improvement")

    def test_poor_grade(self):
        """Scores < 0.50 should yield 'Poor'."""
        self.assertEqual(get_understanding_grade(0.20), "Poor")
        self.assertEqual(get_understanding_grade(0.0), "Poor")

    def test_custom_threshold(self):
        """Custom threshold should shift the Good/Needs Improvement boundary."""
        self.assertEqual(get_understanding_grade(0.65, threshold=0.60), "Good")
        self.assertEqual(get_understanding_grade(0.55, threshold=0.60), "Needs Improvement")

    def test_boundary_values(self):
        """Test exact boundary values for each grade tier."""
        self.assertEqual(get_understanding_grade(0.8999), "Good")
        self.assertEqual(get_understanding_grade(0.7500), "Good")
        self.assertEqual(get_understanding_grade(0.7499), "Needs Improvement")
        self.assertEqual(get_understanding_grade(0.4999), "Poor")


class TestComputeSimilarity(unittest.TestCase):
    """Tests for the compute_similarity() function (integration-level)."""

    def test_identical_sentences_high_similarity(self):
        """Identical or near-identical sentences should have similarity close to 1.0."""
        text = "Machine learning is a method of data analysis that automates analytical model building."
        score = compute_similarity(text, text)
        self.assertGreaterEqual(score, 0.95)

    def test_unrelated_sentences_low_similarity(self):
        """Completely unrelated sentences should have a low similarity score."""
        sentence_a = "The sky is blue and the grass is green."
        sentence_b = "Quantum entanglement describes a correlation between quantum states."
        score = compute_similarity(sentence_a, sentence_b)
        self.assertLess(score, 0.60)

    def test_score_is_between_zero_and_one(self):
        """The similarity score must always be in [0.0, 1.0]."""
        score = compute_similarity("hello world", "deep learning neural networks")
        self.assertGreaterEqual(score, 0.0)
        self.assertLessEqual(score, 1.0)

    def test_score_is_float(self):
        """The similarity score must be a float."""
        score = compute_similarity("test input", "test reference")
        self.assertIsInstance(score, float)


if __name__ == "__main__":
    unittest.main()
