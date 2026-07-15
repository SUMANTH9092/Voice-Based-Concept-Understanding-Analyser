"""
visualizer.py — Waveform & Spectrogram Visualization Engine.

Generates Matplotlib figures for audio waveform and Mel spectrogram
visualization of uploaded audio files.
"""

import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np


def plot_waveform(audio_path: str) -> plt.Figure:
    """
    Generate an amplitude waveform plot for the given audio file.

    Args:
        audio_path (str): Path to the audio file.

    Returns:
        matplotlib.figure.Figure: A Matplotlib figure containing the waveform plot.
    """
    y, sr = librosa.load(audio_path, sr=None, mono=True)
    duration = librosa.get_duration(y=y, sr=sr)
    time = np.linspace(0, duration, num=len(y))

    fig, ax = plt.subplots(figsize=(10, 3))
    ax.plot(time, y, color="#4F8EF7", linewidth=0.6, alpha=0.85)
    ax.set_xlabel("Time (seconds)", fontsize=11)
    ax.set_ylabel("Amplitude", fontsize=11)
    ax.set_title("Audio Waveform", fontsize=13, fontweight="bold")
    ax.axhline(y=0, color="gray", linewidth=0.5, linestyle="--")
    ax.set_xlim([0, duration])
    fig.tight_layout()
    return fig


def plot_spectrogram(audio_path: str) -> plt.Figure:
    """
    Generate a Mel spectrogram plot for the given audio file.

    Args:
        audio_path (str): Path to the audio file.

    Returns:
        matplotlib.figure.Figure: A Matplotlib figure containing the spectrogram.
    """
    y, sr = librosa.load(audio_path, sr=None, mono=True)
    mel_spec = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128, fmax=8000)
    mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)

    fig, ax = plt.subplots(figsize=(10, 4))
    img = librosa.display.specshow(mel_spec_db, sr=sr, x_axis="time", y_axis="mel",
                                   fmax=8000, ax=ax, cmap="viridis")
    fig.colorbar(img, ax=ax, format="%+2.0f dB")
    ax.set_title("Mel Spectrogram", fontsize=13, fontweight="bold")
    ax.set_xlabel("Time (seconds)", fontsize=11)
    ax.set_ylabel("Frequency (Hz)", fontsize=11)
    fig.tight_layout()
    return fig
