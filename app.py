from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load your trained model
model = joblib.load('admission_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    features = [
        data['gre'],
        data['toefl'],
        data['university_rating'],
        data['sop'],
        data['lor'],
        data['cgpa'],
        data['research']
    ]
    prediction = model.predict([features])[0]
    return jsonify({'probability': float(prediction)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)