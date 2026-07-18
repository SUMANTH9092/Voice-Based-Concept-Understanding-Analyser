import re

# -----------------------------
# Filler Word Detection
# -----------------------------

FILLER_WORDS = [
    "um",
    "uh",
    "like",
    "actually",
    "basically",
    "you know",
    "hmm",
    "so",
    "well",
    "okay",
    "ok"
]


def detect_fillers(text):

    text = text.lower()

    filler_count = {}

    total = 0

    for word in FILLER_WORDS:

        pattern = r"\b" + re.escape(word) + r"\b"

        matches = re.findall(pattern, text)

        count = len(matches)

        if count > 0:
            filler_count[word] = count
            total += count

    return filler_count, total


# -----------------------------
# Final Score Calculation
# -----------------------------
def evaluate_understanding(semantic_score, ai_accuracy, filler_ratio, audio):

    # Combine Semantic Similarity and AI Accuracy
    ai_score = (semantic_score * 0.7) + (ai_accuracy * 0.3)

    bonus = 0

    # Good voice energy
    if audio["rms_energy"] > 0.05:
        bonus += 5

    # Less pauses
    if audio["pause_ratio"] < 0.20:
        bonus += 5

    # Less filler words
    if filler_ratio < 0.05:
        bonus += 5

    final_score = round(ai_score + bonus)

    if final_score > 100:
        final_score = 100

    if final_score >= 85:
        level = "Strong Understanding"

    elif final_score >= 60:
        level = "Moderate Understanding"

    else:
        level = "Poor Understanding"

    return final_score, level