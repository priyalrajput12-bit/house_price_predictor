# Quick API test with Python requests
import requests

payload = {
    "house_size": 1800,
    "bedrooms": 3,
    "bathrooms": 2,
    "floors": 2
}

response = requests.post("http://127.0.0.1:5000/api/predict", json=payload)
print(response.json())
