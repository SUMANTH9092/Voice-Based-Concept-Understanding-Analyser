"""Unit tests for transcriber.py — Speech-to-Text Engine."""

import unittest
import os
import tempfile
import wave
import struct
from unittest.mock import patch, MagicMock
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from app.transcriber import transcribe


def _create_dummy_wav(path: str, duration_sec: float = 1.0, sample_rate: int = 16000):
    """Create a minimal silent WAV file for testing purposes."""
    n_samples = int(sample_rate * duration_sec)
    with wave.open(path, "w") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(struct.pack("<" + "h" * n_samples, *([0] * n_samples)))


class TestTranscriber(unittest.TestCase):

    def test_transcribe_raises_file_not_found(self):
        """transcribe() must raise FileNotFoundError for non-existent audio files."""
        with self.assertRaises(FileNotFoundError):
            transcribe("/non/existent/path/audio.wav")

    @patch("app.transcriber.whisper.load_model")
    def test_transcribe_returns_string(self, mock_load_model):
        """transcribe() must return a non-empty string for valid audio."""
        mock_model = MagicMock()
        mock_model.transcribe.return_value = {"text": "  Machine learning is a subset of AI.  "}
        mock_load_model.return_value = mock_model

        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
            tmp_path = f.name

        try:
            _create_dummy_wav(tmp_path)
            result = transcribe(tmp_path, model_size="base")
            self.assertIsInstance(result, str)
            self.assertEqual(result, "Machine learning is a subset of AI.")
        finally:
            os.remove(tmp_path)

    @patch("app.transcriber.whisper.load_model")
    def test_transcribe_strips_whitespace(self, mock_load_model):
        """transcribe() must strip leading/trailing whitespace from the transcript."""
        mock_model = MagicMock()
        mock_model.transcribe.return_value = {"text": "   Hello world.   "}
        mock_load_model.return_value = mock_model

        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
            tmp_path = f.name

        try:
            _create_dummy_wav(tmp_path)
            result = transcribe(tmp_path)
            self.assertEqual(result, "Hello world.")
        finally:
            os.remove(tmp_path)

    @patch("app.transcriber.whisper.load_model")
    def test_transcribe_raises_runtime_error_on_whisper_failure(self, mock_load_model):
        """transcribe() must raise RuntimeError if Whisper raises an internal exception."""
        mock_model = MagicMock()
        mock_model.transcribe.side_effect = Exception("Whisper internal error")
        mock_load_model.return_value = mock_model

        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
            tmp_path = f.name

        try:
            _create_dummy_wav(tmp_path)
            with self.assertRaises(RuntimeError):
                transcribe(tmp_path)
        finally:
            os.remove(tmp_path)


if __name__ == "__main__":
    unittest.main()
