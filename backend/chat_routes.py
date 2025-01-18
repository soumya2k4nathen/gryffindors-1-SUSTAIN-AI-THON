from flask import Blueprint, request, jsonify
from firebase_admin import firestore  # Import firestore (already initialized in app.py)
from datetime import datetime
from model_utils import predict_toxicity
from config import Config

# Firestore client (already initialized in app.py)
db = firestore.client()

# Create a Blueprint for chat
chat_bp = Blueprint("chat", __name__)

# Post a new problem
@chat_bp.route('/chat/post', methods=['POST'])
def post_problem():
    try:
        data = request.get_json()
        pseudo_name = data['pseudo_name']
        content = data['content']
        date = datetime.now().isoformat()

        post_data = {
            "pseudo_name": pseudo_name,
            "content": content,
            "date": date
        }

        db.collection('chat_posts').add(post_data)  # Save post to Firestore
        return jsonify({"message": "Problem posted successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Post a reply
@chat_bp.route('/chat/reply', methods=['POST'])
def post_reply():
    try:
        data = request.get_json()
        pseudo_name = data['pseudo_name']
        content = data['content']
        date = datetime.now().isoformat()

        # Check for toxicity
        toxicity = predict_toxicity(content)
        if toxicity == "Toxic":
            return jsonify({"error": "Reply is toxic and cannot be posted"}), 403

        reply_data = {
            "pseudo_name": pseudo_name,
            "content": content,
            "date": date
        }

        db.collection('chat_replies').add(reply_data)  # Save reply to Firestore
        return jsonify({"message": "Reply posted successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
