"""
pdf_generator.py — PDF Report Generation Engine using ReportLab.

Compiles all assessment metrics into a structured, downloadable PDF report.
"""

import os
import io
import matplotlib.pyplot as plt
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
)


def _fig_to_image_bytes(fig: plt.Figure) -> bytes:
    """Convert a Matplotlib figure to PNG bytes for embedding in the PDF."""
    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight", dpi=150)
    buf.seek(0)
    return buf.read()


def generate_report(data: dict, output_path: str) -> str:
    """
    Generate a structured PDF assessment report from the evaluation data.

    Args:
        data (dict): A dictionary containing all assessment results:
            - 'student_name' (str): Optional student name.
            - 'concept_name' (str): Name/title of the concept evaluated.
            - 'transcript' (str): Full Whisper transcript text.
            - 'similarity_score' (float): Cosine similarity score (0.0 – 1.0).
            - 'understanding_grade' (str): Categorical grade.
            - 'filler_words_detected' (list[str]): Detected filler words.
            - 'filler_word_count' (int): Total filler word count.
            - 'pause_count' (int): Number of detected pauses.
            - 'avg_pause_duration_sec' (float): Average pause duration in seconds.
            - 'rms_energy' (float): Average RMS energy.
            - 'waveform_fig' (matplotlib.Figure, optional): Waveform figure to embed.
        output_path (str): Path where the PDF file should be saved.

    Returns:
        str: The absolute path to the generated PDF file.
    """
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=2 * cm,
        leftMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2 * cm
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle("Title", parent=styles["Title"], fontSize=18, spaceAfter=6)
    h2_style = ParagraphStyle("H2", parent=styles["Heading2"], fontSize=13, spaceAfter=4)
    body_style = ParagraphStyle("Body", parent=styles["BodyText"], fontSize=10, leading=14)
    meta_style = ParagraphStyle("Meta", parent=styles["Normal"], fontSize=9,
                                 textColor=colors.grey, spaceAfter=2)

    elements = []

    # Title
    elements.append(Paragraph("VBCUA Assessment Report", title_style))
    elements.append(Paragraph("Voice-Based Concept Understanding Analyser", meta_style))
    elements.append(Spacer(1, 0.3 * cm))

    # Metadata
    student = data.get("student_name", "Anonymous")
    concept = data.get("concept_name", "Unspecified Concept")
    date_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")

    meta_table = Table([
        ["Student Name:", student],
        ["Concept Evaluated:", concept],
        ["Assessment Date:", date_str],
    ], colWidths=[4 * cm, 13 * cm])
    meta_table.setStyle(TableStyle([
        ("FONTSIZE", (0, 0), (-1, -1), 10),
        ("TEXTCOLOR", (0, 0), (0, -1), colors.HexColor("#555555")),
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    elements.append(meta_table)
    elements.append(Spacer(1, 0.5 * cm))

    # Transcript
    elements.append(Paragraph("1. Student Transcript", h2_style))
    transcript_text = data.get("transcript", "No transcript available.")
    elements.append(Paragraph(transcript_text, body_style))
    elements.append(Spacer(1, 0.4 * cm))

    # Assessment Results
    elements.append(Paragraph("2. Assessment Results", h2_style))
    grade = data.get("understanding_grade", "N/A")
    score = data.get("similarity_score", 0.0)
    grade_color = {
        "Excellent": colors.HexColor("#2ecc71"),
        "Good": colors.HexColor("#3498db"),
        "Needs Improvement": colors.HexColor("#f39c12"),
        "Poor": colors.HexColor("#e74c3c"),
    }.get(grade, colors.black)

    results_data = [
        ["Metric", "Value"],
        ["Semantic Similarity Score", f"{score:.4f} / 1.0000"],
        ["Understanding Grade", grade],
        ["Filler Word Count", str(data.get("filler_word_count", 0))],
        ["Filler Words Detected", ", ".join(data.get("filler_words_detected", [])) or "None"],
        ["Pause Count", str(data.get("pause_count", 0))],
        ["Avg. Pause Duration", f"{data.get('avg_pause_duration_sec', 0.0):.2f} seconds"],
        ["RMS Energy (Vocal Confidence)", str(data.get("rms_energy", 0.0))],
    ]
    results_table = Table(results_data, colWidths=[8 * cm, 9 * cm])
    results_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2C3E50")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 10),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F5F7FA")]),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CCCCCC")),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
    ]))
    elements.append(results_table)
    elements.append(Spacer(1, 0.5 * cm))

    # Waveform
    if "waveform_fig" in data and data["waveform_fig"] is not None:
        elements.append(Paragraph("3. Audio Waveform", h2_style))
        img_bytes = _fig_to_image_bytes(data["waveform_fig"])
        img = Image(io.BytesIO(img_bytes), width=16 * cm, height=5 * cm)
        elements.append(img)
        elements.append(Spacer(1, 0.4 * cm))

    # Footer note
    elements.append(Spacer(1, 0.5 * cm))
    elements.append(Paragraph(
        "Generated by Voice-Based Concept Understanding Analyser (VBCUA) | "
        "Powered by OpenAI Whisper & Sentence-BERT",
        meta_style
    ))

    doc.build(elements)
    return os.path.abspath(output_path)
