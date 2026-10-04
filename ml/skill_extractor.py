"""Predefined technical skill vocabulary and resume skill extraction."""

import re

# Canonical skill name -> aliases that may appear in resume text.
SKILL_ALIASES = {
    "HTML": ["html", "html5"],
    "CSS": ["css", "css3"],
    "JavaScript": ["javascript", "js"],
    "TypeScript": ["typescript", "ts"],
    "React": ["react", "react.js", "reactjs"],
    "Redux": ["redux"],
    "Vue": ["vue", "vue.js", "vuejs"],
    "Angular": ["angular"],
    "Tailwind": ["tailwind", "tailwindcss"],
    "Webpack": ["webpack"],
    "Accessibility": ["accessibility", "a11y", "wcag"],
    "Node.js": ["node.js", "nodejs", "node"],
    "Express": ["express", "express.js", "expressjs"],
    "REST API": ["rest api", "rest apis", "restful", "rest"],
    "GraphQL": ["graphql"],
    "MongoDB": ["mongodb", "mongo"],
    "SQL": ["sql", "mysql", "postgresql", "postgres", "sqlite"],
    "Redis": ["redis"],
    "Microservices": ["microservices", "microservice"],
    "Authentication": ["authentication", "oauth", "jwt"],
    "Java": ["java"],
    "Spring": ["spring", "spring boot"],
    "Python": ["python"],
    "Django": ["django"],
    "Flask": ["flask"],
    "FastAPI": ["fastapi"],
    "Git": ["git", "github", "gitlab"],
    "Docker": ["docker"],
    "AWS": ["aws", "amazon web services"],
    "Pandas": ["pandas"],
    "NumPy": ["numpy"],
    "Scikit-learn": ["scikit-learn", "sklearn", "scikit learn"],
    "Matplotlib": ["matplotlib"],
    "Seaborn": ["seaborn"],
    "Jupyter": ["jupyter", "jupyter notebook"],
    "Statistics": ["statistics", "statistical analysis"],
    "EDA": ["eda", "exploratory data analysis"],
    "Feature Engineering": ["feature engineering"],
    "TensorFlow": ["tensorflow"],
    "PyTorch": ["pytorch"],
    "MLOps": ["mlops"],
    "Model Deployment": ["model deployment", "model serving"],
    "Excel": ["excel", "microsoft excel"],
    "Tableau": ["tableau"],
    "Power BI": ["power bi", "powerbi"],
    "Data Visualization": ["data visualization", "data visualisation"],
}

ROLE_REQUIRED_SKILLS = {
    "Full Stack Developer": [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Express",
        "SQL",
        "HTML",
        "CSS",
        "Git",
        "REST API",
    ],
    "Data Scientist": [
        "Python",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "SQL",
        "Statistics",
        "Matplotlib",
        "Jupyter",
        "Feature Engineering",
        "EDA",
    ],
    "Machine Learning Engineer": [
        "Python",
        "Scikit-learn",
        "TensorFlow",
        "PyTorch",
        "MLOps",
        "Docker",
        "AWS",
        "Feature Engineering",
        "Model Deployment",
        "SQL",
    ],
    "Frontend Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Redux",
        "Tailwind",
        "Webpack",
        "Accessibility",
        "Git",
    ],
    "Backend Developer": [
        "Python",
        "Java",
        "Node.js",
        "Express",
        "SQL",
        "REST API",
        "Authentication",
        "Redis",
        "Git",
        "Microservices",
    ],
    "Data Analyst": [
        "SQL",
        "Excel",
        "Tableau",
        "Power BI",
        "Python",
        "Pandas",
        "Data Visualization",
        "Statistics",
        "EDA",
        "Git",
    ],
}

ROLES = list(ROLE_REQUIRED_SKILLS.keys())


def _build_alias_patterns():
    """Longer aliases first so 'node.js' matches before 'node'."""
    patterns = []
    for canonical, aliases in SKILL_ALIASES.items():
        for alias in sorted(aliases, key=len, reverse=True):
            escaped = re.escape(alias)
            patterns.append((re.compile(rf"(?<![A-Za-z0-9_+]){escaped}(?![A-Za-z0-9_+])", re.I), canonical))
    patterns.sort(key=lambda item: len(item[0].pattern), reverse=True)
    return patterns


_ALIAS_PATTERNS = _build_alias_patterns()


def extract_skills(text):
    """Return sorted unique canonical skills found in free-form resume text."""
    if not text:
        return []
    found = set()
    for pattern, canonical in _ALIAS_PATTERNS:
        if pattern.search(text):
            found.add(canonical)
    return sorted(found)


def skill_gap(detected_skills, role):
    """Return required skills for a role that are missing from the resume."""
    required = ROLE_REQUIRED_SKILLS.get(role, [])
    detected = set(detected_skills)
    return [skill for skill in required if skill not in detected]


def skill_coverage(detected_skills, role):
    """Fraction of required role skills present in the resume."""
    required = ROLE_REQUIRED_SKILLS.get(role, [])
    if not required:
        return 0.0
    detected = set(detected_skills)
    matched = sum(1 for skill in required if skill in detected)
    return matched / len(required)
