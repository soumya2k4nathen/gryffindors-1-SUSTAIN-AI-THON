import os

class Config:
<<<<<<< HEAD
    FIREBASE_CREDENTIALS = os.getenv('FIREBASE_CREDENTIALS', 'C:/Users/Soumya Renganathen/sustain-ai/sustainai/backend/firebase_credentials.json')
=======
    FIREBASE_CREDENTIALS = os.getenv('FIREBASE_CREDENTIALS', 'C:/sustainai/backend/firebase_credentials.json')
>>>>>>> feaa9fd9325891df4cf38d781a94702874d99b2c
    SECRET_KEY = os.getenv('SECRET_KEY', 'V0lRjsH0-y2rRmlj6yfAklm9Fhs7XxIk1JX5mV4rtjwL4-QF-1xtSxsH3KvHHk46')
    HF_API_KEY = os.getenv("HF_API_KEY", "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")
