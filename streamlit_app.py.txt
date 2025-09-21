import streamlit as st
from utils import calculate_similarity

st.set_page_config(page_title="Automated Resume Relevance Checker", layout="wide")

st.title("📄 Automated Resume Relevance Checker")
st.markdown("Upload your **Resume** and a **Job Description** to check relevance using AI similarity.")

# File uploaders
col1, col2 = st.columns(2)

with col1:
    resume_file = st.file_uploader("Upload Resume", type=["txt", "pdf"], key="resume")
with col2:
    jd_file = st.file_uploader("Upload Job Description", type=["txt", "pdf"], key="jd")

resume_text = ""
jd_text = ""

# Convert uploaded files to text
def read_file(file):
    if file is None:
        return ""
    if file.name.endswith(".txt"):
        return file.read().decode("utf-8")
    elif file.name.endswith(".pdf"):
        try:
            from PyPDF2 import PdfReader
            reader = PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
            return text
        except Exception:
            return ""
    return ""

if resume_file:
    resume_text = read_file(resume_file)

if jd_file:
    jd_text = read_file(jd_file)

# Process button
if st.button("🔍 Check Relevance"):
    if resume_text and jd_text:
        score = calculate_similarity(resume_text, jd_text)
        st.success(f"✅ Resume Relevance Score: **{score}%**")
        if score >= 70:
            st.markdown("🎉 Great! Your resume strongly matches the JD.")
        elif score >= 40:
            st.markdown("⚠️ Moderate match. Consider tailoring your resume.")
        else:
            st.markdown("❌ Low match. Revise resume to align better with JD.")
    else:
        st.error("Please upload both Resume and Job Description files.")

st.divider()
st.markdown("⚡ *Built with Streamlit | TF-IDF + Cosine Similarity*")