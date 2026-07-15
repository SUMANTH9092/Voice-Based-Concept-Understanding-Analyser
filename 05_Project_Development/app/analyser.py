"""
analyser.py — Semantic Similarity Engine using Sentence-BERT.

Computes cosine similarity between the student's transcript and
the reference concept definition to produce a conceptual understanding score.
"""

from sentence_transformers import SentenceTransformer, util


# Load the model once at module level to avoid repeated loading overhead
_model = None


def _get_model() -> SentenceTransformer:
    """Lazily load and cache the Sentence-BERT model."""
    global _model
    if _model is None:
        _model = SentenceTransformer("all-MiniLM-L6-v2")
    return _model


def compute_similarity(transcript: str, reference: str) -> float:
    """
    Compute cosine similarity between the student's transcript and the reference concept.

    Args:
        transcript (str): The Whisper-transcribed student explanation.
        reference (str): The reference/gold-standard concept definition.

    Returns:
        float: Cosine similarity score between 0.0 and 1.0.
    """
    model = _get_model()
    embeddings = model.encode([transcript, reference], convert_to_tensor=True)
    score = util.cos_sim(embeddings[0], embeddings[1]).item()
    return round(max(0.0, min(1.0, score)), 4)


def get_understanding_grade(score: float, threshold: float = 0.75) -> str:
    """
    Convert a cosine similarity score into a categorical understanding grade.

    Grading Scale:
        - Excellent:         score >= 0.90
        - Good:              threshold <= score < 0.90
        - Needs Improvement: 0.50 <= score < threshold
        - Poor:              score < 0.50

    Args:
        score (float): Cosine similarity score from compute_similarity().
        threshold (float): The minimum score for a "Good" grade. Defaults to 0.75.

    Returns:
        str: One of 'Excellent', 'Good', 'Needs Improvement', or 'Poor'.
    """
    if score >= 0.90:
        return "Excellent"
    elif score >= threshold:
        return "Good"
    elif score >= 0.50:
        return "Needs Improvement"
    else:
        return "Poor"
