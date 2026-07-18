from semantic_eval import semantic_similarity

reference = """
Machine Learning is a branch of Artificial Intelligence
that enables computers to learn from data.
"""

student = """
Machine Learning helps computers learn from data.
"""

score = semantic_similarity(student, reference)

print(score)