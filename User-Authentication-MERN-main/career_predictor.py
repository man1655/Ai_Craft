import sys
import os
import json
import re
import PyPDF2

# ------------------ Skill Categories ------------------ #
skill_categories = {
    "frontend": [
        'html', 'css', 'javascript', 'typescript', 'react', 'vue.js', 'angular',
        'sass', 'bootstrap', 'redux'
    ],
    "backend": [
        'node.js', 'django', 'flask', 'spring', 'express.js', 'ruby on rails',
        'php', 'asp.net', 'laravel', 'go'
    ],
    "mern": [
        'mongodb', 'express.js', 'react', 'node.js', 'redux', 'graphql',
        'jwt', 'docker', 'rest api', 'aws'
    ],
    "ai_ml": [
        'python', 'tensorflow', 'pytorch', 'scikit-learn', 'keras', 'xgboost',
        'lightgbm', 'catboost', 'nlp', 'computer vision'
    ],
    "devops": [
        'docker', 'kubernetes', 'jenkins', 'ansible', 'terraform', 'git',
        'ci/cd', 'prometheus', 'grafana', 'aws'
    ]
}

# Flatten all skill names
all_skills = set()
for skills in skill_categories.values():
    all_skills.update(skills)
all_skills = list(all_skills)

# ------------------ Utility Functions ------------------ #

def normalize_skill(skill):
    return skill.lower().replace('.', '').replace('-', '').replace(' ', '')

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
    return list(set(found_skills))

def extract_resume_skills(resume_path):
    text = extract_text_from_pdf(resume_path)
    return extract_skills(text, all_skills)

# ------------------ Career Path Predictor ------------------ #

def predict_career_path(resume_skills):
    normalized_resume_skills = set(normalize_skill(s) for s in resume_skills)

    career_map = {
        "Frontend Developer": skill_categories["frontend"],
        "Backend Developer": skill_categories["backend"],
        "MERN Full Stack Developer": skill_categories["mern"],
        "AI/ML Engineer": skill_categories["ai_ml"],
        "DevOps Engineer": skill_categories["devops"]
    }

    career_scores = {}

    for role, required_skills in career_map.items():
        normalized_required = set(normalize_skill(s) for s in required_skills)
        matched = normalized_resume_skills.intersection(normalized_required)
        missing = normalized_required - normalized_resume_skills

        score = len(matched)
        match_percentage = round((score / len(normalized_required)) * 100, 2)

        career_scores[role] = {
            "match_score": score,
            "match_percent": match_percentage,
            "matched_skills": list(matched),
            "missing_skills": list(missing)
        }

    # Get the role with the highest match score
    best_fit = max(career_scores.items(), key=lambda x: x[1]["match_score"])

    return {
        "best_fit_role": best_fit[0],
        "match_percent": best_fit[1]["match_percent"],
        "matched_skills": best_fit[1]["matched_skills"],
        "missing_skills": best_fit[1]["missing_skills"]
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
        resume_skills = extract_resume_skills(resume_path)

    career_prediction = predict_career_path(resume_skills)

    result = {
        "extracted_skills": sorted(resume_skills),
        "career_prediction": career_prediction
    }

    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
