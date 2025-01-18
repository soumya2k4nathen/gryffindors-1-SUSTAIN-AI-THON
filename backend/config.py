import os

class Config:
    FIREBASE_CREDENTIALS = os.getenv('FIREBASE_CREDENTIALS', 'C:/Users/Soumya Renganathen/sustain-ai/sustainai/backend/firebase_credentials.json')
    SECRET_KEY = os.getenv('SECRET_KEY', 'V0lRjsH0-y2rRmlj6yfAklm9Fhs7XxIk1JX5mV4rtjwL4-QF-1xtSxsH3KvHHk46')
    HF_API_KEY = os.getenv("HF_API_KEY", "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")
