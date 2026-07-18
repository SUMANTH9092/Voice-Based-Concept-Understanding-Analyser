from gemini_utils import model
import json


def fact_check(reference, student):

    prompt = f"""
You are an expert educational evaluator.

Reference Definition:

{reference}

Student Explanation:

{student}

Evaluate the student's explanation.

Return ONLY valid JSON in this format:

{{
  "correct_points": [
    "...",
    "..."
  ],
  "incorrect_points": [
    "...",
    "..."
  ],
  "missing_points": [
    "...",
    "..."
  ],
  "accuracy_score": 0
}}

Rules:
- accuracy_score must be between 0 and 100.
- Do NOT explain anything outside the JSON.
"""

    response = model.generate_content(prompt)

    # Get response text
    response_text = response.text.strip()

    # Remove markdown if Gemini returns ```json ... ```
    if response_text.startswith("```"):
        response_text = response_text.replace("```json", "")
        response_text = response_text.replace("```", "")
        response_text = response_text.strip()

    # Convert JSON string to Python dictionary
    return json.loads(response_text)