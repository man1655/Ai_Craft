import sys
import os
import json
import re
import pandas as pd
import PyPDF2
import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import io
from rapidfuzz import fuzz
from sentence_transformers import SentenceTransformer, util

# Path to Tesseract (adjust if installed elsewhere)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# --------------- Resume parsing helper functions ---------------

def extract_text_from_pdf(pdf_path):
    text = ''
    # Try normal text extraction
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            content = page.extract_text()
            if content:
                text += content + ' '

    # If no text found, fallback to OCR
    if not text.strip():
        doc = fitz.open(pdf_path)
        for page_num in range(len(doc)):
            page = doc[page_num]
            pix = page.get_pixmap()
            img = Image.open(io.BytesIO(pix.tobytes("png")))
            ocr_text = pytesseract.image_to_string(img)
            text += ocr_text + " "

    return text.lower()

# --------- Load Skills from CSV ---------
skills_file = os.path.join(os.path.dirname(__file__), "skills.csv")
if not os.path.exists(skills_file):
    print("Error: skills.csv not found!", file=sys.stderr)
    sys.exit(1)

skills_df = pd.read_csv(skills_file)

def extract_skills(text, threshold=85):
    found = set()
    words = re.split(r'[\s,;/\n]', text.lower())
    for _, row in skills_df.iterrows():
        base = str(row['skill']).strip().lower()
        synonyms = [base] + str(row.get('synonyms', '')).split(',')
        for syn in synonyms:
            syn = syn.strip().lower()
            if not syn:
                continue
            for word in words:
                if fuzz.ratio(syn, word) >= threshold:
                    found.add(base)
    return list(found)

# --------- Other Extractors ---------
def extract_name(text):
    lines = text.strip().split('\n')
    for line in lines:
        if line.strip() and not any(word in line.lower() for word in ['email', 'phone', 'address', 'contact']):
            return line.strip().title()
    return "Not Found"

def extract_phone_number(text):
    match = re.search(r'(\+?\d[\d\s\-]{7,15}\d)', text)
    return match.group(0) if match else "Not Found"

def extract_email(text):
    match = re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b', text)
    return match.group(0) if match else "Not Found"

def extract_education(text):
    degrees = ['bachelor', 'master', 'phd', 'b\.tech', 'm\.tech', 'b\.sc', 'm\.sc', 'mba', 'bca', 'mca']
    found_degrees = []
    for degree in degrees:
        if re.search(r'\b' + degree + r'\b', text, re.IGNORECASE):
            found_degrees.append(degree.upper().replace('\\.', '.'))
    return list(set(found_degrees)) or ["Not Found"]

# --------- Job Matching ---------
def normalize_skill(skill):
    return skill.lower().replace('.', '').replace('-', '').replace(' ', '')

def recommend_companies_by_skills(resume_skills, jobs_df):
    model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')

    normalized_resume_skills = set(normalize_skill(s) for s in resume_skills)
    resume_input = "Skills: " + ', '.join(resume_skills)
    embeddings_resume = model.encode(resume_input, convert_to_tensor=True)

    all_matches = []

    for _, job in jobs_df.iterrows():
        skills_raw = job.get('required_skills', '')
        if not isinstance(skills_raw, str) or not skills_raw.strip():
            continue

        job_skills = [s.strip() for s in skills_raw.split(',')]
        normalized_job_skills = set(normalize_skill(s) for s in job_skills)

        matched_skills_norm = normalized_resume_skills.intersection(normalized_job_skills)
        if not matched_skills_norm:
            continue

        matched_skills = [s for s in job_skills if normalize_skill(s) in matched_skills_norm]

        job_skills_text = "Skills: " + ', '.join(job_skills)
        embeddings_job = model.encode(job_skills_text, convert_to_tensor=True)
        score = util.cos_sim(embeddings_resume, embeddings_job).item()

        all_matches.append({
            "company_name": job.get('company_name', 'Unknown'),
            "job_title": job.get('job_title', 'Unknown'),
            "match_score": round(score * 100, 2),
            "matched_skills": matched_skills,
            "required_skills": skills_raw
        })

    all_matches.sort(key=lambda x: (len(x['matched_skills']), x['match_score']), reverse=True)
    return {"top_matches": all_matches[:3], "all_matches": all_matches}

# --------- Main ---------
def main():
    if len(sys.argv) < 2:
        print("Usage: python analyzer.py <resume_pdf_path>", file=sys.stderr)
        sys.exit(1)

    resume_path = sys.argv[1]
    job_dataset_path = os.path.join(os.path.dirname(__file__), 'Job.csv')

    if not os.path.exists(job_dataset_path):
        print("Error: job dataset not found at", job_dataset_path, file=sys.stderr)
        sys.exit(1)

    resume_text = extract_text_from_pdf(resume_path)
    name = extract_name(resume_text)
    phone = extract_phone_number(resume_text)
    email = extract_email(resume_text)
    education = extract_education(resume_text)
    resume_skills = extract_skills(resume_text)

    jobs_df = pd.read_csv(job_dataset_path)
    recommendations = recommend_companies_by_skills(resume_skills, jobs_df)

    result = {
        "name": name,
        "phone": phone,
        "email": email,
        "education": education,
        "skills": sorted(resume_skills),
        "top_3_matched_jobs": recommendations["top_matches"],
        "all_matched_jobs": recommendations["all_matches"]
    }

    print(json.dumps(result, indent=2))

if __name__ == '__main__':
    main()
