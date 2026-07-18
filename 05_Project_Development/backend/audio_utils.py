import librosa
import numpy as np
import matplotlib.pyplot as plt
import os


def extract_audio_features(audio_path):

    y, sr = librosa.load(audio_path)

    duration = librosa.get_duration(y=y, sr=sr)

    rms = librosa.feature.rms(y=y)[0]

    rms_energy = float(np.mean(rms))

    silence_threshold = 0.02

    silent_frames = np.sum(np.abs(y) < silence_threshold)

    pause_ratio = silent_frames / len(y)

    return {
        "duration": round(duration, 2),
        "rms_energy": round(rms_energy, 4),
        "pause_ratio": round(float(pause_ratio), 4)
    }


def save_waveform(audio_path):

    os.makedirs("waveform", exist_ok=True)

    y, sr = librosa.load(audio_path)

    plt.figure(figsize=(10,3))

    plt.plot(y)

    plt.title("Audio Waveform")

    plt.xlabel("Samples")

    plt.ylabel("Amplitude")

    image_path = "waveform/waveform.png"

    plt.savefig(image_path)

    plt.close()

    return image_path