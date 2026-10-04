"""Load saved artifacts and predict a role, match score, skills, and gaps."""

from pathlib import Path
import sys

import joblib
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

ML_DIR = Path(__file__).resolve().parent
if str(ML_DIR) not in sys.path:
    sys.path.insert(0, str(ML_DIR))

from skill_extractor import extract_skills, skill_coverage, skill_gap

ROOT_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = ROOT_DIR / "models"


def load_artifacts():
    vectorizer = joblib.load(MODELS_DIR / "tfidf_vectorizer.joblib")
    classifier = joblib.load(MODELS_DIR / "role_classifier.joblib")
    encoder = joblib.load(MODELS_DIR / "label_encoder.joblib")
    centroids = joblib.load(MODELS_DIR / "role_centroids.joblib")
    return vectorizer, classifier, encoder, centroids


def _role_similarities(resume_vector, centroids):
    scores = {}
    for role, centroid in centroids.items():
        scores[role] = float(cosine_similarity(resume_vector, centroid)[0, 0])
    return scores


def predict_resume(resume_text):
    """
    Analyze resume text and return role prediction plus skill-gap details.

    Returns:
        dict with predicted_role, match_score, detected_skills,
        missing_skills, and similarity_scores.
    """
    vectorizer, classifier, encoder, centroids = load_artifacts()
    detected_skills = extract_skills(resume_text)
    resume_vector = vectorizer.transform([resume_text])

    predicted_index = int(classifier.predict(resume_vector)[0])
    predicted_role = encoder.inverse_transform([predicted_index])[0]
    probabilities = classifier.predict_proba(resume_vector)[0]
    confidence = float(np.max(probabilities))

    similarity_scores = _role_similarities(resume_vector, centroids)
    cosine_to_role = similarity_scores.get(predicted_role, 0.0)
    coverage = skill_coverage(detected_skills, predicted_role)

    # Explainable blend: skill overlap + cosine similarity + classifier confidence.
    match_score = round(100.0 * (0.5 * coverage + 0.3 * cosine_to_role + 0.2 * confidence), 2)
    match_score = max(0.0, min(100.0, match_score))

    rounded_similarities = {
        role: round(score, 4) for role, score in sorted(similarity_scores.items())
    }

    return {
        "predicted_role": predicted_role,
        "match_score": match_score,
        "detected_skills": detected_skills,
        "missing_skills": skill_gap(detected_skills, predicted_role),
        "similarity_scores": rounded_similarities,
    }


if __name__ == "__main__":
    sample = (
        "Frontend intern with HTML CSS JavaScript React Git. "
        "Built landing pages and reusable components."
    )
    result = predict_resume(sample)
    print("Sample resume:")
    print(sample)
    print()
    for key, value in result.items():
        print(f"{key}: {value}")
