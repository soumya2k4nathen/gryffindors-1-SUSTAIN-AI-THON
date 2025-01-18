import os
from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
from config import Config
from datetime import datetime
from model_utils import predict_toxicity

# Initialize Firebase Admin SDK (only once)
def initialize_firebase():
    try:
        firebase_admin.get_app()
    except ValueError:
        cred = credentials.Certificate(Config.FIREBASE_CREDENTIALS)
        firebase_admin.initialize_app(cred)

initialize_firebase()
db = firestore.client()
app = Flask(__name__)
app.config.from_object(Config)

# Helper to create a user in Firestore
def create_user_in_firestore(user_data, role):
    if role == 'student':
        user_ref = db.collection('users').document(user_data['pseudo_name'])
    elif role == 'teacher':
        user_ref = db.collection('users_t').document(user_data['name'])
    user_ref.set({**user_data, 'role': role})

# Student Signup
@app.route('/signup/student', methods=['POST'])
def student_signup():
    try:
        data = request.get_json()
        student_data = {
            'name': data['name'],
            'grade': data['grade'],
            'email': data['email'],
            'password': data['password'],
            'phone': data['phone'],
            'pseudo_name': data['pseudo_name'],
        }
        create_user_in_firestore(student_data, 'student')
        return jsonify({"message": "Student created successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Teacher Signup
@app.route('/signup/teacher', methods=['POST'])
def teacher_signup():
    try:
        data = request.get_json()
        teacher_data = {
            'name': data['name'],
            'grade': data['grade'],
            'email': data['email'],
            'password': data['password'],
        }
        create_user_in_firestore(teacher_data, 'teacher')
        return jsonify({"message": "Teacher created successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Student Login
@app.route('/login/student', methods=['POST'])
def student_login():
    try:
        data = request.get_json()
        pseudo_name = data['pseudo_name']
        password = data['password']

        user_ref = db.collection('users').document(pseudo_name)
        user_doc = user_ref.get()

        if user_doc.exists:
            user_data = user_doc.to_dict()
            if user_data['password'] == password:
                return jsonify({"message": "Student login successful!"}), 200
            else:
                return jsonify({"error": "Invalid password"}), 401
        else:
            return jsonify({"error": "Student not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Teacher Login
@app.route('/login/teacher', methods=['POST'])
def teacher_login():
    try:
        data = request.get_json()
        name = data['name']
        password = data['password']

        user_ref = db.collection('users_t').document(name)
        user_doc = user_ref.get()

        if user_doc.exists:
            user_data = user_doc.to_dict()
            if user_data['password'] == password:
                return jsonify({"message": "Teacher login successful!"}), 200
            else:
                return jsonify({"error": "Invalid password"}), 401
        else:
            return jsonify({"error": "Teacher not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Post Problem
@app.route('/chat/post', methods=['POST'])
def post_problem():
    try:
        data = request.get_json()
        pseudo_name = data['pseudo_name']
        content = data['content']
        date = datetime.now().isoformat()

        # Check for toxicity
        toxicity = predict_toxicity(content)
        if toxicity == "Toxic":
            return jsonify({"message": "Your message was flagged as toxic and cannot be posted."}), 400

        post_data = {
            "pseudo_name": pseudo_name,
            "content": content,
            "date": date
        }
        db.collection('chat_posts').add(post_data)
        return jsonify({"message": "Problem posted successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Post Reply
@app.route('/chat/reply', methods=['POST'])
def post_reply():
    try:
        data = request.get_json()
        pseudo_name = data['pseudo_name']
        content = data['content']
        date = datetime.now().isoformat()

        # Check for toxicity
        toxicity = predict_toxicity(content)
        if toxicity == "Toxic":
            return jsonify({"message": "Your reply was flagged as toxic and cannot be posted."}), 400

        reply_data = {
            "pseudo_name": pseudo_name,
            "content": content,
            "date": date
        }
        db.collection('chat_replies').add(reply_data)
        return jsonify({"message": "Reply posted successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)