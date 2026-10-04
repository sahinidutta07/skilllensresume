"""SkillLens Flask API: resume analysis via the local ML pipeline."""

from pathlib import Path
import sys

from flask import Flask, jsonify, request
from flask_cors import CORS

ROOT_DIR = Path(__file__).resolve().parent.parent
ML_DIR = ROOT_DIR / "ml"
for path in (ROOT_DIR, ML_DIR):
    if str(path) not in sys.path:
        sys.path.insert(0, str(path))

from predict import predict_resume  # noqa: E402

app = Flask(__name__)
CORS(app)


@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "SkillLens API"})


@app.post("/analyze")
def analyze():
    if not request.is_json:
        return jsonify({"error": "Request body must be JSON."}), 400

    payload = request.get_json(silent=True) or {}
    resume_text = payload.get("resume_text")

    if resume_text is None:
        return jsonify({"error": "Field 'resume_text' is required."}), 400
    if not isinstance(resume_text, str) or not resume_text.strip():
        return jsonify({"error": "Field 'resume_text' must be a non-empty string."}), 400

    try:
        result = predict_resume(resume_text.strip())
    except FileNotFoundError:
        return jsonify({"error": "Model artifacts are missing. Train the model first."}), 500
    except Exception:
        return jsonify({"error": "Failed to analyze resume."}), 500

    return jsonify(
        {
            "predicted_role": result["predicted_role"],
            "match_score": result["match_score"],
            "detected_skills": result["detected_skills"],
            "missing_skills": result["missing_skills"],
            "similarity_scores": result["similarity_scores"],
        }
    )


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
