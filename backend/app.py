import os
from flask import Flask, request, jsonify, session
import firebase_admin
from firebase_admin import credentials, firestore
from config import Config
from datetime import datetime
from model_utils import predict_toxicity
from google.cloud import speech
from diary_processor import process_diary
import io
import pandas as pd
from concurrent.futures import ThreadPoolExecutor, as_completed
from flask_cors import CORS

# Initialize Firebase Admin SDK (only once)
app = Flask(__name__)


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
app.secret_key = "your_secret_key"  # Ensure this is a secure key

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

        # Validate data and handle missing fields
        required_fields = ['name', 'grade', 'email', 'password', 'phone', 'pseudo_name']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        # Organize data
        student_data = {
            'name': data['name'],
            'grade': data['grade'],
            'email': data['email'],
            'password': data['password'],
            'phone': data['phone'],
            'pseudo_name': data['pseudo_name'],
        }

        print(student_data['name'])  # Debugging with the correct field

        # Perform database creation or other logic
        create_user_in_firestore(student_data, 'student')

        return jsonify({"message": "Student created successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
                session['pseudo_name'] = pseudo_name  # Store pseudo_name in session
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


# Post Reply
@app.route('/chat/post', methods=['POST'])
def post_reply():
    try:
        # Ensure the user is logged in
        if 'pseudo_name' not in session:
            return jsonify({"error": "User not logged in"}), 401

        pseudo_name = session['pseudo_name']
        data = request.get_json()
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
        return jsonify({"message": "Posted successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Journal Entry
@app.route('/journal', methods=['POST'])
def journal_entry():
    try:
        # Ensure the user is logged in
        if 'pseudo_name' not in session:
            return jsonify({"error": "User not logged in"}), 401

        pseudo_name = session['pseudo_name']
        data = request.get_json()
        entry_type = data.get('type', 'text')
        date = datetime.now().isoformat()

        if entry_type == 'text':
            content = data['content']
        elif entry_type == 'voice':
            # Simulate voice-to-text conversion (use Google Cloud Speech-to-Text for actual implementation)
            audio_path = data['audio_path']  # Path to the uploaded audio file

            # Assuming you have set up Google Cloud Speech-to-Text properly
            client = speech.SpeechClient()
            with open(audio_path, 'rb') as audio_file:
                content = audio_file.read()
            
            audio = speech.RecognitionAudio(content=content)
            config = speech.RecognitionConfig(
                encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
                sample_rate_hertz=16000,
                language_code="en-US",
            )
            response = client.recognize(config=config, audio=audio)

            # Extract the transcript from the response
            content = " ".join([result.alternatives[0].transcript for result in response.results])

        # Get reference to the user's journal document
        user_journal_ref = db.collection('journal_entries').document(pseudo_name)

        # Fetch the existing journal data to append to 'entries' list
        existing_data = user_journal_ref.get().to_dict()

        # If no existing entries, initialize an empty list
        if not existing_data or 'entries' not in existing_data:
            existing_entries = []
        else:
            existing_entries = existing_data['entries']

        # Create the new journal entry
        new_entry = {
            "content": content,
            "type": entry_type,
            "date": date
        }

        # Append the new entry to the existing entries
        existing_entries.append(new_entry)

        # Save the updated entries list back to Firestore
        user_journal_ref.set({'entries': existing_entries}, merge=True)

        return jsonify({"message": "Journal entry added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/diary/analyze', methods=['POST'])
def analyze_diary():
    try:
        # Ensure the user is logged in
        if 'pseudo_name' not in session:
            return jsonify({"error": "User not logged in"}), 401

        pseudo_name = session['pseudo_name']

        # Fetch journal entries for the logged-in user
        journal_entries_ref = db.collection('journal_entries').document(pseudo_name)
        journal_data = journal_entries_ref.get().to_dict()

        if not journal_data or 'entries' not in journal_data:
            return jsonify({"error": "No journal entries found for the user"}), 404

        # Combine all journal entries into a single text for analysis
        diary_text = " ".join(entry['content'] for entry in journal_data['entries'])

        # Process the diary text using the process_diary model
        df = process_diary(diary_text)

        # Transform the results into a suitable format for Firestore
        diary_analysis = []
        for _, row in df.iterrows():
            diary_analysis.append({
                "text": row['text'],
                "category": row['category'],
                "urgency": row['urgency'],
                "key_activity": row['key_activity'],
                "time_of_day": row['time_of_day'],
                "valid_notification": row['valid_notification']
            })

        # Update the analysis collection for the user
        user_analysis_doc_ref = db.collection('analysis').document(pseudo_name)

        # Fetch existing analysis data (if any)
        existing_analysis = user_analysis_doc_ref.get().to_dict()
        existing_entries = existing_analysis.get('diary_entries', []) if existing_analysis else []

        # Append new analysis results to existing data
        updated_entries = existing_entries + diary_analysis

        # Save the updated analysis data back to Firestore
        user_analysis_doc_ref.set({'diary_entries': updated_entries}, merge=True)

        return jsonify({"message": "Diary analysis completed and saved!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/diary/analysis/daily', methods=['POST'])
def daily_analysis():
    try:
        # Ensure the user is logged in
        if 'pseudo_name' not in session:
            return jsonify({"error": "User not logged in"}), 401

        pseudo_name = session['pseudo_name']

        # Fetch the user's analysis data
        user_analysis_ref = db.collection('analysis').document(pseudo_name)
        analysis_data = user_analysis_ref.get().to_dict()

        if not analysis_data or 'diary_entries' not in analysis_data:
            return jsonify({"error": "No analysis data found for the user"}), 404

        # Convert diary entries to a DataFrame
        df = pd.DataFrame(analysis_data['diary_entries'])

        # Get current date and day
        current_date = datetime.now().strftime("%Y-%m-%d")
        current_day = datetime.now().strftime("%A")

        # Calculate the daily analysis metrics
        new_df = pd.DataFrame({
            "Date": [current_date],
            "Day": [current_day],
            "Academic": df[df['category'] == "academic positive"].shape[0] - df[df['category'] == "academic negative"].shape[0],
            "Health": df[df['category'] == "health positive"].shape[0] - df[df['category'] == "health negative"].shape[0],
            "Social": df[df['category'] == "social positive"].shape[0] - df[df['category'] == "social negative"].shape[0],
            "Need help": df[df['urgency'] == "b"].shape[0],
            "Immediate help needed": 1 if df[df['urgency'] == "c"].shape[0] > 0 else 0,
        })

        # You can print or log the new_df for debugging purposes
        print(new_df)

        # Save the daily analysis data to Firestore
        user_daily_analysis_ref = db.collection('daily_analysis').document(pseudo_name)
        existing_daily_data = user_daily_analysis_ref.get().to_dict()

        # If data exists, append the new analysis, else initialize the list
        if existing_daily_data:
            existing_daily_data['entries'].append(new_df.to_dict(orient="records")[0])
        else:
            existing_daily_data = {'entries': [new_df.to_dict(orient="records")[0]]}

        # Save the updated daily analysis data back to Firestore
        user_daily_analysis_ref.set(existing_daily_data, merge=True)

        return jsonify({"message": "Daily analysis data added successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Logout
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('pseudo_name', None)
    return jsonify({"message": "Logged out successfully!"}), 200

if __name__ == "__main__":
     app.run(debug=True, host='0.0.0.0', port=5000)
