import requests
import pandas as pd
from concurrent.futures import ThreadPoolExecutor, as_completed

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
    input_text = (
        f"Classify the following text into categories: neutral, academic positive, health positive, "
        f"social positive, academic negative, health negative, or social negative. Text: {sentence_group}"
    )
    return query_huggingface_api(input_text)

def urgency_categorization(sentence_group):
    input_text = (
        f"Categorize the sentence as:\n"
        f"a. No Emergency\n"
        f"b. Need Help\n"
        f"c. Need Immediate Help.\n"
        f"Text: {sentence_group}"
    )
    return query_huggingface_api(input_text)

def extract_key_activity(sentence_group):
    input_text = (
        f"Analyze the text: \"{sentence_group}\"\n"
        f"Generate a motivational notification suggesting an activity that boosted happiness. "
        f"Do not repeat or rephrase the input directly. Output an action-oriented suggestion in simple language."
    )
    return query_huggingface_api(input_text)

def time_of_day_classification(key_activity):
    input_text = (
        f"Analyze the following activity: \"{key_activity}\" and determine the most suitable time of day for this activity "
        f"based on common habits and energy levels. Choose from 'morning,' 'evening,' 'night,' or 'anytime.' Provide only the time category as the output."
    )
    return query_huggingface_api(input_text)

def validate_notification(key_activity):
    input_text = (
        f"Is the following activity a valid motivational notification that could make someone feel better any random day? "
        f"Answer 'Yes' or 'No'. Activity: \"{key_activity}\""
    )
    return query_huggingface_api(input_text)

def group_linked_sentences(text):
    linking_words = {"this", "that", "these", "those", "it", "such"}
    sentences = text.split(". ")  # Simplified for this example
    grouped_sentences = []
    current_group = []

    for sentence in sentences:
        sentence_text = sentence.strip()

        if any(sentence_text.lower().startswith(word) for word in linking_words):
            current_group.append(sentence_text)
        else:
            if current_group:
                grouped_sentences.append(" ".join(current_group))
            current_group = [sentence_text]

    if current_group:
        grouped_sentences.append(" ".join(current_group))

    return grouped_sentences

def process_group(group):
    """
    Process a single group of sentences to classify, categorize urgency, extract key activities, and classify time of day.
    """
    try:
        category = classify_sentence_group(group)
        urgency = urgency_categorization(group)
        key_activity = extract_key_activity(group)
        time_of_day = time_of_day_classification(key_activity)
        valid_notification = validate_notification(key_activity)
        return {
            "text": group,
            "category": category,
            "urgency": urgency,
            "key_activity": key_activity,
            "time_of_day": time_of_day,
            "valid_notification": valid_notification
        }
    except Exception as e:
        print(f"Error processing group: {group}, Error: {e}")
        return {
            "text": group,
            "category": None,
            "urgency": None,
            "key_activity": None,
            "time_of_day": None,
            "valid_notification": None
        }

def process_diary(diary_text, max_workers=5):
    """
    Processes the diary text using parallel API calls.
    """
    grouped_sentences = group_linked_sentences(diary_text)
    results = []

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_group = {executor.submit(process_group, group): group for group in grouped_sentences}

        for future in as_completed(future_to_group):
            result = future.result()
            results.append(result)

    return pd.DataFrame(results)
