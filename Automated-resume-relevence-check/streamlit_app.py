import streamlit as st
from utils import calculate_similarity

st.set_page_config(page_title="Automated Resume Relevance Checker", layout="centered")

st.title("🤖 Automated Resume Relevance Checker")

st.markdown("Upload a resume and a job description to see how well they match!")

resume_file = st.file_uploader("Upload Resume (.txt)", type=["txt"])
jd_file = st.file_uploader("Upload Job Description (.txt)", type=["txt"])

if resume_file and jd_file:
    resume_text = resume_file.read().decode("utf-8")
    jd_text = jd_file.read().decode("utf-8")

    with st.spinner("Analyzing..."):
        result = calculate_similarity(resume_text, jd_text)

    st.subheader("📊 Relevance Score:")
    st.progress(result['score'] / 100)
    st.success(f"{result['score']} / 100")

    st.subheader("📌 Verdict:")
    st.info(result['verdict'])

    st.subheader("🧩 Suggestions to Improve:")
    st.write(result['suggestions'])
