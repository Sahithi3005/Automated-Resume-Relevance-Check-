import streamlit as st
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from docx import Document
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

st.set_page_config(page_title="Resume Relevance Checker")
st.title("📝 Resume Relevance Checker (Quick Version)")

def read_docx(file):
    doc = Document(file)
    return "\n".join([p.text for p in doc.paragraphs])

def preprocess(text):
    text = text.lower()
    tokens = [w for w in text.split() if w.isalpha() and w not in stop_words]
    return " ".join(tokens)

def similarity(resume, jd):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume, jd])
    return cosine_similarity(vectors[0:1], vectors[1:2])[0][0]

resume_file = st.file_uploader("Upload Resume (.docx)", type=["docx"])
jd_file = st.file_uploader("Upload Job Description (.docx or .txt)", type=["docx", "txt"])

if st.button("Check Relevance"):
    if not resume_file or not jd_file:
        st.warning("Upload both files!")
    else:
        resume_text = preprocess(read_docx(resume_file))
        if jd_file.type == "text/plain":
            jd_text = preprocess(jd_file.read().decode("utf-8"))
        else:
            jd_text = preprocess(read_docx(jd_file))
        score = similarity(resume_text, jd_text)
        st.success(f"Relevance Score: {score*100:.2f}%")
