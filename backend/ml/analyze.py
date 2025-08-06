import sys
import json
import os
import fitz  # PyMuPDF for PDFs
import docx
from sentence_transformers import SentenceTransformer, util

# ------------------- TEXT EXTRACTION -------------------
def extract_text(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    text = ""
    if ext == ".pdf":
        pdf_doc = fitz.open(file_path)
        for page in pdf_doc:
            text += page.get_text()
    elif ext in [".docx", ".doc"]:
        doc = docx.Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"
    return text.strip()

resume_path = sys.argv[1] if len(sys.argv) > 1 else None
resume_text = extract_text(resume_path)

# ------------------- PREDEFINED JOB ROLES -------------------
job_roles = {
    "Data Scientist": ["python", "machine learning", "deep learning", "statistics", "pandas", "numpy", "tensorflow", "scikit-learn", "data analysis"],
    "Frontend Developer": ["html", "css", "javascript", "react", "angular", "typescript", "ui", "frontend", "tailwind"],
    "Backend Developer": ["node.js", "express", "mongodb", "api", "sql", "rest", "backend", "authentication"],
    "AI Engineer": ["artificial intelligence", "neural networks", "computer vision", "nlp", "transformers", "deep learning", "pytorch"],
    "DevOps Engineer": ["docker", "kubernetes", "ci/cd", "aws", "jenkins", "terraform", "cloud"]
}

# ------------------- DETECT JOB ROLE -------------------
model = SentenceTransformer('all-MiniLM-L6-v2')
best_role = None
best_score = 0

resume_emb = model.encode(resume_text, convert_to_tensor=True)

for role, keywords in job_roles.items():
    desc = f"A {role} skilled in " + ", ".join(keywords)
    role_emb = model.encode(desc, convert_to_tensor=True)
    similarity = float(util.cos_sim(resume_emb, role_emb)[0][0])
    if similarity > best_score:
        best_score = similarity
        best_role = role

# ------------------- SCORE & MISSING KEYWORDS -------------------
role_keywords = job_roles[best_role]
missing_keywords = [kw for kw in role_keywords if kw.lower() not in resume_text.lower()]
score = round(best_score * 100, 2)

# ------------------- SUMMARY -------------------
summary = " ".join(resume_text.split()[:50]) + "..."

# ------------------- OUTPUT -------------------
result = {
    "detected_role": best_role,
    "score": score,
    "missing_keywords": missing_keywords,
    "summary": summary
}

print(json.dumps(result))
