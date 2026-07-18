import whisper

# Load model once
model = whisper.load_model("base")


def speech_to_text(audio_path):
    """
    Convert speech to text.
    """

    result = model.transcribe(audio_path)

    transcript = result["text"]

    return transcript