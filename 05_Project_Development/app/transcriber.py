"""
transcriber.py — Speech-to-Text Engine using OpenAI Whisper.

Handles loading of the Whisper model and transcription of audio files.
"""

import whisper
import os


def transcribe(audio_path: str, model_size: str = "base") -> str:
    """
    Transcribe an audio file to text using OpenAI Whisper.

    Args:
        audio_path (str): Absolute or relative path to the audio file.
        model_size (str): Whisper model size. Options: 'tiny', 'base', 'small', 'medium', 'large'.
                          Defaults to 'base' for a balance of speed and accuracy.

    Returns:
        str: The transcribed text from the audio file.

    Raises:
        FileNotFoundError: If the audio file does not exist at the specified path.
        RuntimeError: If Whisper fails to process the audio file.
    """
    if not os.path.exists(audio_path):
        raise FileNotFoundError(f"Audio file not found: {audio_path}")

    try:
        model = whisper.load_model(model_size)
        result = model.transcribe(audio_path)
        return result["text"].strip()
    except Exception as e:
        raise RuntimeError(f"Whisper transcription failed: {e}") from e
