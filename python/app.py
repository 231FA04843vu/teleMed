from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import numpy as np
import os
import uuid

app = Flask(__name__)
CORS(app)

# Load your trained models
cnn_tumor = load_model(r'C:\Users\alla rakesh chowdary\OneDrive\Desktop\lowband-care-main\python\image process (1).h5')
cnn_skin = load_model(r'C:\Users\alla rakesh chowdary\OneDrive\Desktop\lowband-care-main\python\tumourdet.h5')

# Class labels
tumor_classes = ['glioma_tumor', 'meningioma_tumor', 'no_tumor', 'pituitary_tumor']
skin_classes = ['malignant','benign']

# Upload folder setup
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def preprocess_image(file_path, target_size=(32, 32)):
    """Load and preprocess image for prediction."""
    img = image.load_img(file_path, target_size=target_size)
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def save_file(file):
    """Save uploaded file safely with a unique name."""
    ext = os.path.splitext(file.filename)[1]
    unique_name = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_FOLDER, unique_name)
    file.save(file_path)
    return file_path

@app.route('/tumor', methods=['POST'])
def predict_tumor():
    if 'img' not in request.files:
        return jsonify({'error': 'No file part in the request. Available keys: ' + ', '.join(request.files.keys())}), 400
    
    file = request.files['img']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        file_path = save_file(file)
        img_array = preprocess_image(file_path)
        pred = cnn_tumor.predict(img_array)
        predicted_class = tumor_classes[np.argmax(pred)]
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

    return jsonify({'prediction': predicted_class})

@app.route('/skin', methods=['POST'])
def predict_skin():
    if 'img' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['img']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        file_path = save_file(file)
        img_array = preprocess_image(file_path)
        pred = cnn_skin.predict(img_array)
        predicted_class = skin_classes[np.argmax(pred)]
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

    return jsonify({'prediction': predicted_class})

if __name__ == '__main__':
    app.run(debug=True)
