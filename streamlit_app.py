import streamlit as st
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from docx import Document
import io
import nltk

# Download stopwords if not present
nltk.download("stopwords", quiet=True)
from nltk.corpus import stopwords
stop_words = set(stopwords.words("english"))

# Function to read .docx file
def read_docx(uploaded_file):
    doc = Document(io.BytesIO(uploaded_file.read()))
    return "\n".join([p.text for p in doc.paragraphs])

# Preprocess text
def preprocess(text):
    text = text.lower()
    tokens = [w for w in text.split() if w.isalpha() and w not in stop_words]
    return " ".join(tokens)

# Main relevance checker
def check_relevance(resume_file, jd_file):
    try:
        resume_text = preprocess(read_docx(resume_file))

        if jd_file.name.endswith(".txt"):
            jd_text = preprocess(jd_file.read().decode("utf-8"))
        else:
            jd_text = preprocess(read_docx(jd_file))

        if not resume_text.strip() or not jd_text.strip():
            return "⚠️ One of the files is empty or unreadable."

        vectorizer = TfidfVectorizer()
        vectors = vectorizer.fit_transform([resume_text, jd_text])
        score = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]

        return f"✅ Relevance Score: {score*100:.2f}%"
    except Exception as e:
        return f"⚠️ Error: {str(e)}"

# Streamlit UI
st.set_page_config(page_title="Resume Relevance Checker", layout="centered")

st.title("📄 Resume Relevance Checker")
st.write("Upload a resume and a job description to calculate their similarity score.")

resume_file = st.file_uploader("Upload Resume (.docx)", type=["docx"])
jd_file = st.file_uploader("Upload Job Description (.docx or .txt)", type=["docx", "txt"])

if st.button("Check Relevance"):
    if resume_file and jd_file:
        result = check_relevance(resume_file, jd_file)
        st.success(result) if "✅" in result else st.error(result)
    else:
        st.warning("Please upload both files.")
