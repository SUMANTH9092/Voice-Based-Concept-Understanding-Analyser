import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Get API key
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

# Configure Gemini
genai.configure(api_key=API_KEY)

# Load Gemini model
model = genai.GenerativeModel("gemini-2.5-flash")


def get_reference_definition(topic):
    """
    Get a concise educational definition for the given topic.
    """

    prompt = f"""
You are an educational assistant.

Provide a clear, concise definition of the topic below.

Rules:
- Maximum 120 words.
- Include only the important concepts.
- Do not use bullet points.
- Return only the definition.

Topic:
{topic}
"""

    response = model.generate_content(prompt)

    return response.text.strip()