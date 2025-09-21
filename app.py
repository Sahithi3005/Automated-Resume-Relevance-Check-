import streamlit as st
from PyPDF2 import PdfReader
import docx2txt

# -----------------------------
# Helper functions
# -----------------------------

def read_pdf(file):
    pdf_reader = PdfReader(file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() + "\n"
    return text

def read_docx(file):
    return docx2txt.process(file)

def extract_text(file):
    if file.name.endswith(".pdf"):
        return read_pdf(file)
    elif file.name.endswith(".docx"):
        return read_docx(file)
    else:
        return None

def calculate_relevance(jd_text, resume_text, skills):
    jd_words = set(jd_text.lower().split())
    resume_words = set(resume_text.lower().split())
    
    matched_skills = [skill for skill in skills if skill.lower() in resume_words]
    missing_skills = [skill for skill in skills if skill.lower() not in resume_words]
    
    score = int((len(matched_skills) / len(skills)) * 100) if skills else 0
    
    if score >= 75:
        verdict = "High"
    elif score >= 40:
        verdict = "Medium"
    else:
        verdict = "Low"
    
    return score, verdict, matched_skills, missing_skills

# -----------------------------
# Streamlit UI
# -----------------------------

st.set_page_config(page_title="Resume Relevance Checker", page_icon="📄", layout="wide")

st.title("📄 Automated Resume Relevance Check System")
st.markdown("Upload a Job Description (JD) and a Resume to see the matching score.")

# Upload JD
st.subheader("Step 1: Upload Job Description (JD)")
jd_file = st.file_uploader("Upload JD (PDF/DOCX)", type=["pdf", "docx"])

jd_text = ""
skills_list = ["python", "sql", "pandas", "numpy", "machine learning", "excel", "power bi", "r"]

if jd_file:
    jd_text = extract_text(jd_file)
    st.success("JD uploaded successfully!")
    st.text_area("Extracted JD Content", jd_text[:1000] + "..." if len(jd_text) > 1000 else jd_text, height=200)

# Upload Resume
st.subheader("Step 2: Upload Resume")
resume_file = st.file_uploader("Upload Resume (PDF/DOCX)", type=["pdf", "docx"])

if resume_file:
    resume_text = extract_text(resume_file)
    st.success("Resume uploaded successfully!")
    st.text_area("Extracted Resume Content", resume_text[:1000] + "..." if len(resume_text) > 1000 else resume_text, height=200)

    if jd_text:
        # Calculate Relevance
        score, verdict, matched, missing = calculate_relevance(jd_text, resume_text, skills_list)
        
        st.subheader("📊 Relevance Analysis")
        st.metric("Relevance Score", f"{score}%")
        st.metric("Verdict", verdict)
        
        st.markdown("**✅ Matched Skills:** " + (", ".join(matched) if matched else "None"))
        st.markdown("**❌ Missing Skills:** " + (", ".join(missing) if missing else "None"))
