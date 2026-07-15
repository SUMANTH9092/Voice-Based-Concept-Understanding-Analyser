# Contributing Guidelines - Voice-Based Concept Understanding Analyser

Thank you for your interest in contributing to the Voice-Based Concept Understanding Analyser (VBCUA)! We welcome contributions to enhance the platform's accuracy, usability, and feature set.

---

## 1. Code of Conduct
By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any unacceptable behavior to the project maintainers via the GitHub Issues page.

---

## 2. Getting Started

1. **Fork the Repository**: Create a personal copy of the repository on GitHub.
2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/your-username/Voice-Based-Concept-Understanding-Analyser.git
   cd Voice-Based-Concept-Understanding-Analyser
   ```
3. **Set Up Local Environment**: Follow the detailed local developer environment configuration in the [Setup Guide](07_Project_Documentation/Project_Report.md).
4. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/your-awesome-feature
   ```

---

## 3. Standards & Best Practices

- **Python Styling**: We adhere to standard PEP 8 formatting guidelines. Please use a linter such as `flake8` before submitting PRs.
- **Imports**: Use absolute package path imports wherever possible. Keep imports organized (standard library → third-party → local).
- **Testing**: Ensure that you run the full `unittest` suite and that all tests pass before opening a Pull Request.
- **Docstrings**: Add clear docstrings to all new functions, classes, and modules following the Google Python docstring format.
- **Audio File Handling**: Ensure all audio-related contributions properly handle supported formats (`.wav`, `.mp3`, `.m4a`, `.ogg`) and edge cases like empty files or corrupt audio.

---

## 4. Submitting Changes

1. **Commit Messages**: Write clear, concise commit messages using the imperative mood (e.g., `Add filler word detection for Hindi language`).
2. **Pull Requests**: Submit PRs to the `main` branch. Include:
   - A clear description of what the PR changes.
   - The issue number it resolves (e.g., `Closes #12`).
   - Before/after screenshots if your change affects the UI.
3. **Review Process**: A project maintainer will review your PR within 48 hours. Be responsive to feedback.

---

## 5. Reporting Issues

Use the GitHub Issue templates provided:
- **Bug Report**: For reporting incorrect behaviour, crashes, or unexpected transcription results.
- **Feature Request**: For proposing new analysis features, UI improvements, or integrations.

---

## 6. Development Setup

```bash
# Navigate to the development directory
cd 05_Project_Development

# Install all dependencies
pip install -r requirements.txt

# Run the application
streamlit run main.py

# Run tests
python -m unittest discover -s tests
```

---

We appreciate every contribution, whether it's a bug fix, a new feature, or improved documentation. Thank you for helping make VBCUA better!
