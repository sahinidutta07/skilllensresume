"""Train a TF-IDF + Logistic Regression role classifier and save artifacts."""

from pathlib import Path

import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

ML_DIR = Path(__file__).resolve().parent
ROOT_DIR = ML_DIR.parent
DATASET_PATH = ML_DIR / "dataset.csv"
MODELS_DIR = ROOT_DIR / "models"


def load_dataset():
    df = pd.read_csv(DATASET_PATH)
    df["resume_text"] = df["resume_text"].astype(str).str.strip()
    df["role"] = df["role"].astype(str).str.strip()
    return df


def build_role_centroids(X, y_labels):
    """Mean TF-IDF vector per role for cosine similarity matching."""
    centroids = {}
    for role in sorted(set(y_labels)):
        mask = [label == role for label in y_labels]
        centroids[role] = X[mask].mean(axis=0)
    return centroids


def main():
    df = load_dataset()
    texts = df["resume_text"].tolist()
    roles = df["role"].tolist()

    encoder = LabelEncoder()
    y = encoder.fit_transform(roles)

    vectorizer = TfidfVectorizer(
        lowercase=True,
        stop_words="english",
        ngram_range=(1, 2),
        min_df=1,
    )
    X = vectorizer.fit_transform(texts)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.25, random_state=42, stratify=y
    )

    clf = LogisticRegression(max_iter=1000)
    clf.fit(X_train, y_train)
    y_pred = clf.predict(X_test)
    holdout_accuracy = accuracy_score(y_test, y_pred)

    print(f"Holdout accuracy: {holdout_accuracy:.3f}")
    print(classification_report(y_test, y_pred, target_names=encoder.classes_, zero_division=0))

    # Refit on all labeled examples so the saved model uses the full small dataset.
    clf.fit(X, y)
    centroids = build_role_centroids(X, roles)

    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(vectorizer, MODELS_DIR / "tfidf_vectorizer.joblib")
    joblib.dump(clf, MODELS_DIR / "role_classifier.joblib")
    joblib.dump(encoder, MODELS_DIR / "label_encoder.joblib")
    joblib.dump(centroids, MODELS_DIR / "role_centroids.joblib")

    print(f"Saved artifacts to {MODELS_DIR}")
    for name in [
        "tfidf_vectorizer.joblib",
        "role_classifier.joblib",
        "label_encoder.joblib",
        "role_centroids.joblib",
    ]:
        path = MODELS_DIR / name
        print(f"  {name}: {path.stat().st_size} bytes")


if __name__ == "__main__":
    main()
