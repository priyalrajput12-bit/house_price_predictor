# HousePrice AI — Flask + HTML/CSS/JavaScript

A complete house-price prediction web application using your uploaded
`Linearmodel.pkl` Linear Regression model.

## Model inputs

The frontend and API use the exact training feature order:

1. House Size (sqft)
2. Number of Bedrooms
3. Number of Bathrooms
4. Number of Floors

The Flask API sends these values to the trained model and returns the predicted price.

## Project structure

```text
house_price_predictor/
├── app.py
├── Linearmodel.pkl
├── requirements.txt
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## Run locally

### 1. Create a virtual environment

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

macOS/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Start Flask

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

## API

### POST `/api/predict`

Example JSON:

```json
{
  "house_size": 1800,
  "bedrooms": 3,
  "bathrooms": 2,
  "floors": 2
}
```

Example response:

```json
{
  "prediction": 372642.61,
  "currency": "₹"
}
```

## Important

The pickle was created with scikit-learn 1.6.1, so the requirements pin that
version for compatibility. Do not replace the model with a different file
unless it was trained with the same four features and order.
