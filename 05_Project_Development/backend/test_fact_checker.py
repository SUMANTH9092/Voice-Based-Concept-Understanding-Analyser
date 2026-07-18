from fact_checker import fact_check

reference = """
Machine Learning is a subset of Artificial Intelligence
that enables computers to learn from data.
"""

student = """
Machine Learning is a programming language.
It helps computers learn from data.
"""

result = fact_check(reference, student)

print(result)