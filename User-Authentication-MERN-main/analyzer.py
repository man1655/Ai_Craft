import sys
import os
import json
import re
import pandas as pd
import PyPDF2
from sentence_transformers import SentenceTransformer, util

# --------------- Resume parsing helper functions ---------------

def extract_text_from_pdf(pdf_path):
    text = ''
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            content = page.extract_text()
            if content:
                text += content + ' '
    return text.lower()

def extract_skills(text, skills_list):
    found_skills = []
    for skill in skills_list:
        if re.search(r'\b' + re.escape(skill.lower()) + r'\b', text):
            found_skills.append(skill)
    return found_skills

def extract_name(text):
    lines = text.strip().split('\n')
    for line in lines:
        if line.strip() and not any(word in line.lower() for word in ['email', 'phone', 'address']):
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

# Skill categories and all skills list
skill_categories = {
    "frontend": [
        'html', 'css', 'javascript', 'typescript', 'react', 'vue.js', 'angular', 'sass', 'bootstrap', 'redux'
    ],
    "backend": [
        'node.js', 'django', 'flask', 'spring', 'express.js', 'ruby on rails', 'php', 'asp.net', 'laravel', 'go'
    ],
    "mern": [
        'mongodb', 'express.js', 'react', 'node.js', 'redux', 'graphql', 'jwt', 'docker', 'rest api', 'aws'
    ],
    "ai_ml": [
        'python', 'tensorflow', 'pytorch', 'scikit-learn', 'keras', 'xgboost', 'lightgbm', 'catboost', 'nlp', 'computer vision'
    ],
    "devops": [
        'docker', 'kubernetes', 'jenkins', 'ansible', 'terraform', 'git', 'ci/cd', 'prometheus', 'grafana', 'aws'
    ]
}
all_skills = set()
for skills in skill_categories.values():
    all_skills.update(skills)
all_skills = list(all_skills)

def extract_resume_skills(text):
    return extract_skills(text, all_skills)

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
        if len(matched_skills_norm) == 0:
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

    # Sort by number of matched skills and match score
    all_matches.sort(key=lambda x: (len(x['matched_skills']), x['match_score']), reverse=True)

    # Top 3 best matches
    top_3 = all_matches[:3]

    return {
        "top_matches": top_3,
        "all_matches": all_matches
    }

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
    resume_skills = extract_resume_skills(resume_text)

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
