"""
audio_processor.py — Vocal Analytics Engine using Librosa.

Extracts vocal metrics from audio files: filler word detection,
pause detection, and RMS energy analysis.
"""

import librosa
import numpy as np
import re


# Common English filler words to detect in the transcript
FILLER_WORDS = [
    "um", "uh", "like", "you know", "basically", "actually", "literally",
    "so", "right", "well", "kind of", "sort of", "i mean", "you see"
]


def detect_filler_words(transcript: str) -> dict:
    """
    Detect and count filler words in the transcript text.

    Args:
        transcript (str): The transcribed text from the audio.

    Returns:
        dict: A dictionary with keys:
            - 'filler_words_detected' (list[str]): List of unique filler words found.
            - 'filler_word_count' (int): Total count of all filler word occurrences.
    """
    transcript_lower = transcript.lower()
    detected = []
    total_count = 0

    for word in FILLER_WORDS:
        pattern = r'\b' + re.escape(word) + r'\b'
        matches = re.findall(pattern, transcript_lower)
        if matches:
            detected.append(word)
            total_count += len(matches)

    return {
        "filler_words_detected": detected,
        "filler_word_count": total_count
    }


def analyse_audio(audio_path: str, top_db: float = 30.0) -> dict:
    """
    Perform full vocal analytics on an audio file using Librosa.

    Metrics computed:
        - Pause count and average pause duration (via silence interval detection)
        - RMS energy (average root mean square energy of the signal)

    Args:
        audio_path (str): Path to the audio file (.wav, .mp3, .m4a, .ogg).
        top_db (float): Threshold in decibels below the reference to classify as silence. Defaults to 30.

    Returns:
        dict: A dictionary with keys:
            - 'pause_count' (int): Number of detected silent intervals.
            - 'avg_pause_duration_sec' (float): Mean duration of detected pauses in seconds.
            - 'rms_energy' (float): Average RMS energy of the audio signal.
    """
    y, sr = librosa.load(audio_path, sr=None, mono=True)

    # Detect non-silent intervals to identify pauses
    non_silent_intervals = librosa.effects.split(y, top_db=top_db)

    pause_count = 0
    pause_durations = []

    if len(non_silent_intervals) > 1:
        for i in range(1, len(non_silent_intervals)):
            pause_start = non_silent_intervals[i - 1][1]
            pause_end = non_silent_intervals[i][0]
            pause_duration_sec = (pause_end - pause_start) / sr
            if pause_duration_sec > 0.3:  # Only count pauses longer than 300ms
                pause_count += 1
                pause_durations.append(pause_duration_sec)

    avg_pause_duration = round(float(np.mean(pause_durations)), 2) if pause_durations else 0.0

    # Compute RMS energy
    rms = librosa.feature.rms(y=y)
    avg_rms = round(float(np.mean(rms)), 4)

    return {
        "pause_count": pause_count,
        "avg_pause_duration_sec": avg_pause_duration,
        "rms_energy": avg_rms
    }
