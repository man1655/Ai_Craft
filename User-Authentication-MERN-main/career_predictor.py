import sys
import os
import json
import re
import io
import PyPDF2
import pandas as pd
import fitz  # PyMuPDF
import pytesseract
from PIL import Image

# --------------- Tesseract Path (update if installed elsewhere) --------------- #
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# ------------------ Load Skills from CSV ------------------ #
skills_file = os.path.join(os.path.dirname(__file__), "predict.csv")

skills_df = pd.read_csv(skills_file, quotechar='"', skipinitialspace=True).fillna("")

# Build role->skills mapping
skill_categories = {}
all_skills = {}

for _, row in skills_df.iterrows():
    role = row["role"].strip().lower()
    base_skill = str(row["skill"]).strip().lower()
    synonyms = [s.strip().lower() for s in str(row["synonyms"]).split(";") if s.strip()]

    if role not in skill_categories:
        skill_categories[role] = []
    skill_categories[role].append(base_skill)

    all_skills[base_skill] = [base_skill] + synonyms


# ------------------ Utility Functions ------------------ #
def normalize_skill(skill):
    return skill.lower().replace(".", "").replace("-", "").replace(" ", "")


def extract_text_from_pdf(pdf_path):
    """Extract text from PDF. Try PyPDF2 first, then fallback to OCR if no text found."""
    text = ""

    # ----------- Try normal text extraction ----------- #
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            content = page.extract_text()
            if content:
                text += content + " "

    # ----------- Fallback to OCR if no text ----------- #
    if not text.strip():
        doc = fitz.open(pdf_path)
        for page_num in range(len(doc)):
            page = doc[page_num]
            pix = page.get_pixmap()
            img = Image.open(io.BytesIO(pix.tobytes("png")))
            ocr_text = pytesseract.image_to_string(img)
            text += ocr_text + " "

    return text.lower()


def extract_resume_skills(text):
    """Find skills from resume text using base skills + synonyms"""
    found = set()
    for base_skill, synonyms in all_skills.items():
        for syn in synonyms:
            if re.search(r"\b" + re.escape(syn) + r"\b", text):
                found.add(base_skill)
    return list(found)


# ------------------ Career Path Predictor ------------------ #
def predict_career_path(resume_skills):
    normalized_resume_skills = set(normalize_skill(s) for s in resume_skills)

    career_scores = {}

    for role, required_skills in skill_categories.items():
        normalized_required = set(normalize_skill(s) for s in required_skills)
        matched = normalized_resume_skills.intersection(normalized_required)
        missing = normalized_required - normalized_resume_skills

        score = len(matched)
        match_percentage = round((score / len(normalized_required)) * 100, 2) if required_skills else 0

        career_scores[role] = {
            "match_score": score,
            "match_percent": match_percentage,
            "matched_skills": list(matched),
            "missing_skills": list(missing),
        }

    # Best role
    best_fit = max(career_scores.items(), key=lambda x: x[1]["match_score"])

    return {
        "best_fit_role": best_fit[0],
        "match_percent": best_fit[1]["match_percent"],
        "matched_skills": best_fit[1]["matched_skills"],
        "missing_skills": best_fit[1]["missing_skills"],
    }


# ------------------ Main Entry ------------------ #
def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python career_predictor.py <resume.pdf>")
        print("  OR")
        print("  python career_predictor.py skills html css javascript react")
        sys.exit(1)

    input_mode = sys.argv[1]

    if input_mode == "skills":
        resume_skills = sys.argv[2:]
    else:
        resume_path = input_mode
        if not os.path.exists(resume_path):
            print("Error: Resume file not found")
            sys.exit(1)
        resume_text = extract_text_from_pdf(resume_path)
        resume_skills = extract_resume_skills(resume_text)

    career_prediction = predict_career_path(resume_skills)

    result = {
        "extracted_skills": sorted(resume_skills),
        "career_prediction": career_prediction,
    }

    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
