import requests
import spacy

import pandas as pd
nlp = spacy.load("en_core_web_sm")
API_TOKEN = "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"
API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large"

headers = {"Authorization": f"Bearer {API_TOKEN}"}

def query_huggingface_api(input_text):
    """
    Sends a request to the Hugging Face API with the given input text.
    """
    payload = {"inputs": input_text}
    response = requests.post(API_URL, headers=headers, json=payload)
    
    if response.status_code == 200:
        return response.json()[0]["generated_text"] 
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

def classify_sentence_group(sentence_group):
    """
    Classifies a sentence group into specific categories using the Hugging Face API.
    """
    input_text = (
        f"Classify the following text into categories: neutral, academic positive, health positive, "
        f"social positive, academic negative, health negative, or social negative. Text: {sentence_group}"
    )
    return query_huggingface_api(input_text)

def urgency_categorization(sentence_group):
    """
    Categorizes the urgency level of a sentence group using the Hugging Face API.
    """
    input_text = (
        f"Categorize the sentence as:\n"
        f"a. No Emergency\n"
        f"b. Help needed (the person is sad / anxious)\n"
        f"c. Need Immediate Help.\n"
        f"Text: {sentence_group}"
    )
    return query_huggingface_api(input_text)

def extract_key_activity(sentence_group):
    """
    Extracts the key activity from a sentence group using the Hugging Face API.
    """
    input_text = f"What did the person do in little detail (without any i/my)? Text: {sentence_group}"
    return query_huggingface_api(input_text)

def group_linked_sentences(text):
    linking_words = {"this", "that", "these", "those", "it", "such"}
    doc = nlp(text)
    grouped_sentences = []
    current_group = []

    for sent in doc.sents:
        sentence_text = sent.text.strip()

        # If the sentence starts with a linking word, keep it with the previous group
        if any(sentence_text.lower().startswith(word) for word in linking_words):
            current_group.append(sentence_text)
        else:
            # Start a new group if there's content in the current group
            if current_group:
                grouped_sentences.append(" ".join(current_group))
            # Create a new group with the current sentence
            current_group = [sentence_text]

    # Add the last group if it exists
    if current_group:
        grouped_sentences.append(" ".join(current_group))

    return grouped_sentences 

def process_diary(diary_text):
    """
    Processes the diary text by classifying, categorizing urgency, and extracting key activities.
    """
    grouped_sentences = group_linked_sentences(diary_text)
    data = []

    for group in grouped_sentences:
        if group.strip():  # Skip empty strings
            category = classify_sentence_group(group)
            urgency = urgency_categorization(group)
            key_activity = extract_key_activity(group)
            data.append({
                "text": group,
                "category": category,
                "urgency": urgency,
                "key_activity": key_activity
            })

    return pd.DataFrame(data)

