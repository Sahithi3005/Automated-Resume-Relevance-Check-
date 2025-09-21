# streamlit_app.py
import streamlit as st
import pandas as pd
import numpy as np
import spacy
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import requests
import joblib
from io import BytesIO
from docx import Document

# -----------------------------
# Setup
# -----------------------------
st.set_page_config(page_title="Resume Relevance Checker", layout="wide")
st.title("📝 Automated Resume Relevance Checker")

# Download NLTK stopwords (if not already)
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

# Load SpaCy model externally if needed
@st.cache_resource
def load_spacy_model():
    return spacy.load("en_core_web_sm")

nlp = load_spacy_model()

# -----------------------------
# Helper Functions
# -----------------------------
def read_docx(file):
    """Extract text from a .docx file"""
    doc = Document(file)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return "\n".join(full_text)

def preprocess_text(text):
    """Lowercase, remove stopwords, simple tokenization"""
    text = text.lower()
    tokens = [word for word in text.split() if word.isalpha() and word not in stop_words]
    return " ".join(tokens)

def calculate_similarity(resume_text, jd_text):
    """Compute cosine similarity between resume and job description"""
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume_text, jd_text])
    similarity = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]
    return similarity

# -----------------------------
# User Uploads
# -----------------------------
st.header("Upload Files")
resume_file = st.file_uploader("Upload Resume (.docx)", type=["docx"])
jd_file = st.file_uploader("Upload Job Description (.docx or .txt)", type=["docx", "txt"])

if st.button("Check Relevance"):
    if not resume_file or not jd_file:
        st.warning("Please upload both Resume and Job Description files.")
    else:
        # Read Resume
        resume_text = read_docx(resume_file)
        resume_text = preprocess_text(resume_text)
        
        # Read Job Description
        if jd_file.type == "text/plain":
            jd_text = jd_file.read().decode("utf-8")
        else:
            jd_text = read_docx(jd_file)
        jd_text = preprocess_text(jd_text)
        
        # Compute similarity
        similarity_score = calculate_similarity(resume_text, jd_text)
        st.success(f"✅ Resume Relevance Score: **{similarity_score*100:.2f}%**")
        
        # Simple feedback
        if similarity_score > 0.7:
            st.info("This resume is highly relevant for the job description.")
        elif similarity_score > 0.4:
            st.info("This resume is moderately relevant for the job description.")
        else:
            st.info("This resume is less relevant. Consider updating skills/keywords.")

