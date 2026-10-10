from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
from pathlib import Path

app = Flask(__name__)

MODEL_PATH = Path(__file__).resolve().parent / "Linearmodel.pkl"

with open(MODEL_PATH, "rb") as file:
    model = pickle.load(file)

FEATURES = [
    "House Size (sqft)",
    "Number of Bedrooms",
    "Number of Bathrooms",
    "Number of Floors",
]

@app.get("/")
def home():
    return render_template("index.html")

@app.post("/api/predict")
def predict():
    try:
        data = request.get_json(force=True)

        values = [
            float(data["house_size"]),
            float(data["bedrooms"]),
            float(data["bathrooms"]),
            float(data["floors"]),
        ]

        if any(v < 0 for v in values):
            return jsonify({"error": "Values cannot be negative."}), 400

        # Keep feature order exactly the same as model training:
        # House Size, Bedrooms, Bathrooms, Floors
        prediction = float(model.predict(np.array([values]))[0])

        return jsonify({
            "prediction": round(prediction, 2),
            "currency": "₹",
            "features": dict(zip(FEATURES, values))
        })

    except KeyError as exc:
        return jsonify({"error": f"Missing input: {exc.args[0]}"}), 400
    except ValueError:
        return jsonify({"error": "Please enter valid numeric values."}), 400
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500

@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "model": "LinearRegression"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
