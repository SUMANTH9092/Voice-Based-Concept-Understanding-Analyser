from sentence_transformers import SentenceTransformer
from sentence_transformers import util

# Load Sentence-BERT model once
model = SentenceTransformer("all-MiniLM-L6-v2")


def semantic_similarity(student_text, reference_text):
    """
    Compare the student's explanation with the reference definition.
    Returns a similarity percentage (0-100).
    """

    student_embedding = model.encode(
        student_text,
        convert_to_tensor=True
    )

    reference_embedding = model.encode(
        reference_text,
        convert_to_tensor=True
    )

    similarity = util.cos_sim(
        student_embedding,
        reference_embedding
    )

    similarity_score = float(similarity[0][0])

    return round(similarity_score * 100, 2)