import streamlit as st

if "page" not in st.session_state:
    st.session_state["page"] = "landing"

if st.session_state["page"] == "analyzer":
    st.set_page_config = lambda **kwargs: None
    with open("app.py", "r", encoding="utf-8") as f:
        code = f.read()
    exec(code, globals())
    st.stop()

st.set_page_config(
    page_title="Voice Based Concept Understanding Analyser",
    page_icon="🎤",
    layout="wide"
)

from style_utils import apply_custom_style
apply_custom_style()

st.markdown("""
<style>
.hero {
    background: linear-gradient(135deg, rgba(138, 43, 226, 0.25), rgba(79, 172, 254, 0.25)) !important;
    backdrop-filter: blur(16px) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    padding:40px;
    border-radius:20px;
    color:white;
    text-align:center;
}

.feature {
    background: rgba(255, 255, 255, 0.03) !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    padding:20px;
    border-radius:15px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2) !important;
    text-align:center;
    height:250px;
    color: #f3f4f6 !important;
}

.feature h2, .feature h1, .feature p {
    color: #f3f4f6 !important;
}

.footer {
    text-align:center;
    color: #9ca3af !important;
    margin-top:50px;
}
</style>
""", unsafe_allow_html=True)

# --------------------------
# HERO
# --------------------------

st.markdown("""
<div class='hero'>

# 🎤 Voice Based Concept Understanding Analyser

### AI Powered Educational Assessment Platform

### Transform Spoken Explanations into Intelligent Insights

</div>

""", unsafe_allow_html=True)

st.write("")

# --------------------------
# ABOUT
# --------------------------

col1,col2=st.columns([2,1])

with col1:

    st.header("📖 About Project")

    st.write("""

Voice Based Concept Understanding Analyser is an Artificial Intelligence based educational platform.

Instead of evaluating students using only written examinations, the system analyses spoken explanations.

The application combines Speech Recognition, Natural Language Processing and Generative AI to determine how well a student understands a concept.

It provides semantic analysis, AI fact verification, speech quality analysis and detailed evaluation reports.

""")

with col2:

    st.image(
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700",
        use_container_width=True
    )

st.divider()

# --------------------------
# FEATURES
# --------------------------

st.header("✨ Key Features")

c1,c2,c3=st.columns(3)

with c1:

    st.markdown("""

<div class='feature'>

# 🎤

## Speech Recognition

Convert student speech into text using Whisper AI.

</div>

""",unsafe_allow_html=True)

with c2:

    st.markdown("""

<div class='feature'>

# 🤖

## AI Fact Verification

Gemini evaluates factual correctness.

</div>

""",unsafe_allow_html=True)

with c3:

    st.markdown("""

<div class='feature'>

# 📊

## Semantic Analysis

Sentence-BERT compares conceptual understanding.

</div>

""",unsafe_allow_html=True)

st.write("")

c4,c5,c6=st.columns(3)

with c4:

    st.markdown("""

<div class='feature'>

# 📄

## Smart Reports

Generate professional evaluation reports.

</div>

""",unsafe_allow_html=True)

with c5:

    st.markdown("""

<div class='feature'>

# 📈

## Audio Analysis

Analyze pauses, RMS energy and waveform.

</div>

""",unsafe_allow_html=True)

with c6:

    st.markdown("""

<div class='feature'>

# 🧠

## Intelligent Feedback

Receive strengths and improvement suggestions.

</div>

""",unsafe_allow_html=True)

st.divider()

# --------------------------
# HOW IT WORKS
# --------------------------

st.header("⚙️ How It Works")

st.image(
"https://miro.medium.com/v2/resize:fit:1200/1*Y6T4YkB0M9v9A1i6A2NQfQ.png",
use_container_width=True
)

st.write("""

1️⃣ Student enters the topic

↓

2️⃣ Uploads voice explanation

↓

3️⃣ Whisper converts speech into text

↓

4️⃣ Gemini generates reference definition

↓

5️⃣ Sentence-BERT compares meanings

↓

6️⃣ Gemini verifies facts

↓

7️⃣ Audio quality is analysed

↓

8️⃣ Final report is generated

""")

st.divider()

# --------------------------
# TECHNOLOGIES
# --------------------------

st.header("💻 Technologies Used")

st.write("""

- Gemini AI

- Whisper AI

- Sentence-BERT

- Librosa

- Python

- Streamlit

- ReportLab

""")

st.divider()

# --------------------------
# APPLICATIONS
# --------------------------

st.header("🎯 Applications")

st.write("""

✅ Educational Institutions

✅ Colleges

✅ Universities

✅ Online Learning

✅ Interview Assessment

✅ Corporate Training

""")

st.divider()

# --------------------------
# BUTTON
# --------------------------

st.markdown("<div class='big-btn'>",unsafe_allow_html=True)

if st.button("🚀 START ANALYSIS"):
    st.session_state["page"] = "analyzer"
    st.rerun()

st.markdown("</div>",unsafe_allow_html=True)

st.write("")

st.markdown("""

<div class='footer'>

© 2026 Voice Based Concept Understanding Analyser

Powered by Gemini • Whisper • Sentence-BERT • Librosa

</div>

""",unsafe_allow_html=True)