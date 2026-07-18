from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)
from reportlab.lib.styles import getSampleStyleSheet


def generate_report(
    filename,
    topic,
    reference,
    transcript,
    similarity,
    ai_accuracy,
    audio,
    fillers,
    final_score,
    level
):

    styles = getSampleStyleSheet()

    doc = SimpleDocTemplate(filename)

    story = []

    story.append(
        Paragraph(
            "<b>Voice Based Concept Understanding Analyser</b>",
            styles["Title"]
        )
    )

    story.append(Spacer(1,20))

    story.append(
        Paragraph(f"<b>Topic:</b> {topic}",styles["Normal"])
    )

    story.append(Spacer(1,10))

    story.append(
        Paragraph("<b>Reference Definition</b>",styles["Heading2"])
    )

    story.append(
        Paragraph(reference,styles["Normal"])
    )

    story.append(Spacer(1,10))

    story.append(
        Paragraph("<b>Student Transcript</b>",styles["Heading2"])
    )

    story.append(
        Paragraph(transcript,styles["Normal"])
    )

    story.append(Spacer(1,10))

    story.append(
        Paragraph(f"<b>Semantic Similarity:</b> {similarity}%",styles["Normal"])
    )

    story.append(
        Paragraph(f"<b>AI Accuracy:</b> {ai_accuracy}%",styles["Normal"])
    )

    story.append(
        Paragraph(f"<b>Duration:</b> {audio['duration']} sec",styles["Normal"])
    )

    story.append(
        Paragraph(f"<b>Pause Ratio:</b> {audio['pause_ratio']}",styles["Normal"])
    )

    story.append(
        Paragraph(f"<b>RMS Energy:</b> {audio['rms_energy']}",styles["Normal"])
    )

    story.append(
        Paragraph(f"<b>Total Fillers:</b> {fillers}",styles["Normal"])
    )

    story.append(
        Paragraph(f"<b>Final Score:</b> {final_score}/100",styles["Normal"])
    )

    story.append(
        Paragraph(f"<b>Understanding Level:</b> {level}",styles["Normal"])
    )

    doc.build(story)