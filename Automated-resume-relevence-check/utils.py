from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(resume_text, jd_text):
    # Clean text
    resume_text = resume_text.lower().strip()
    jd_text = jd_text.lower().strip()

    # Vectorize and compare
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume_text, jd_text])
    score = cosine_similarity(vectors[0:1], vectors[1:2])[0][0] * 100
    score = round(score, 2)

    # Verdict
    if score >= 75:
        verdict = "High Fit ✅"
    elif score >= 50:
        verdict = "Medium Fit ⚠️"
    else:
        verdict = "Low Fit ❌"

    # Suggestions (very basic)
    suggestions = "Add more skills or keywords mentioned in the job description."

    return {
        "score": score,
        "verdict": verdict,
        "suggestions": suggestions
    }
