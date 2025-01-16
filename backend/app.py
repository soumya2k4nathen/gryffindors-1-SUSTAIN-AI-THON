import os
from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore, auth
from config import Config

# Initialize Firebase Admin SDK
def initialize_firebase():
    cred = credentials.Certificate(Config.FIREBASE_CREDENTIALS)
    firebase_admin.initialize_app(cred)

initialize_firebase()

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Firestore client
db = firestore.client()

# Function to create a new student or teacher in Firestore
def create_user_in_firestore(user_data, role):
    if role == 'student':
        user_ref = db.collection('users').document(user_data['pseudo_name'])  # For students
    elif role == 'teacher':
        user_ref = db.collection('users_t').document(user_data['name'])  # For teachers (in users_t collection)
    user_ref.set({**user_data, 'role': role})

# Signup route for students
@app.route('/signup/student', methods=['POST'])
def student_signup():
    try:
        data = request.get_json()
        pseudo_name = data['pseudo_name']
        student_data = {
            'name': data['name'],
            'grade': data['grade'],
            'email': data['email'],
            'password': data['password'],  # You should hash the password in a real app
            'phone': data['phone'],
            'pseudo_name': pseudo_name
        }
        create_user_in_firestore(student_data, 'student')
        return jsonify({"message": "Student created successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Signup route for teachers
@app.route('/signup/teacher', methods=['POST'])
def teacher_signup():
    try:
        data = request.get_json()
        teacher_data = {
            'name': data['name'],
            'grade': data['grade'],
            'email': data['email'],
            'password': data['password'],  # You should hash the password in a real app
        }
        create_user_in_firestore(teacher_data, 'teacher')
        return jsonify({"message": "Teacher created successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Login route for students
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
            if user_data['password'] == password:  # Validate password (consider hashing it)
                return jsonify({"message": "Student login successful!"}), 200
            else:
                return jsonify({"error": "Invalid password"}), 401
        else:
            return jsonify({"error": "Student not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Login route for teachers
@app.route('/login/teacher', methods=['POST'])
def teacher_login():
    try:
        data = request.get_json()
        name = data['name']
        password = data['password']

        # Querying 'users_t' collection for teacher data
        user_ref = db.collection('users_t').document(name)  # teachers are in 'users_t'
        user_doc = user_ref.get()

        if user_doc.exists:
            user_data = user_doc.to_dict()
            if user_data['password'] == password:  # Validate password (consider hashing it)
                return jsonify({"message": "Teacher login successful!"}), 200
            else:
                return jsonify({"error": "Invalid password"}), 401
        else:
            return jsonify({"error": "Teacher not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
