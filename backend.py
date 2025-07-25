from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to talk to backend

# Load the emotion detection model
emotion_classifier = pipeline("text-classification", model="joeddav/distilbert-base-uncased-go-emotions-student", top_k=None)

NEGATIVE_EMOTIONS = {"fear", "sadness", "grief", "nervousness", "disappointment", "disapproval", "remorse", "embarrassment", "disgust", "anger"}
MODERATE_EMOTIONS = {"annoyance", "confusion", "realization"}
POSITIVE_EMOTIONS = {"joy", "love", "excitement", "optimism", "gratitude", "relief", "amusement", "admiration", "caring"}

WEIGHTS = {"negative": 1.7, "moderate": 0.8, "positive": 0}
SPECIFIC_NEGATIVE_EMOTIONS = {"fear", "sadness", "grief"}

def calculate_depression_score(top_emotions):
    weighted_sum = 0
    for emotion, score in top_emotions:
        if emotion in SPECIFIC_NEGATIVE_EMOTIONS:
            weight = 2
        elif emotion in NEGATIVE_EMOTIONS:
            weight = WEIGHTS["negative"]
        elif emotion in MODERATE_EMOTIONS:
            weight = WEIGHTS["moderate"]
        else:
            weight = WEIGHTS["positive"]
        weighted_sum += weight * score
    depression_score = min(round(weighted_sum * 100, 2), 100)
    return max(depression_score, 10)

def detect_emotions(text):
    results = emotion_classifier(text)[0]
    emotions = {res["label"]: round(res["score"], 4) for res in results}
    sorted_emotions = sorted(emotions.items(), key=lambda x: x[1], reverse=True)[:5]
    depression_score = calculate_depression_score(sorted_emotions)

    return {
        "top_5_emotions": sorted_emotions,
        "depression_score": depression_score
    }

@app.route("/analyze", methods=["POST"])
def analyze_entry():
    data = request.get_json()
    journal_entry = data.get("journal_entry")

    if not journal_entry:
        return jsonify({"error": "Journal entry is required"}), 400

    result = detect_emotions(journal_entry)

    return jsonify({
        "top_5_emotions": result["top_5_emotions"],
        "depression_score": result["depression_score"]
    })

if __name__ == "__main__":
    app.run(debug=True)