import pandas as pd
from transformers import T5Tokenizer, T5ForConditionalGeneration

# Load T5 model and tokenizer
model_name = "google/flan-t5-large"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

def classify_sentence_group(sentence_group):
    input_text = f"1.Classify the following text into categories: neutral, academic positive, health positive, social positive, academic negative, health negative, or social negative. Text: {sentence_group}"
    inputs = tokenizer(input_text, return_tensors="pt", padding=True, truncation=True)
    outputs = model.generate(inputs["input_ids"], max_length=50)
    category = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return category

def urgency_categorization(sentence_group):
    input_text = f"3. Categorize the sentence as:\n" \
                 f"   a No Emergency\n" \
                 f"   b Need Help\n" \
                 f"   c Need Immediate Help.\n" \
                 f"Text: {sentence_group}"
    inputs = tokenizer(input_text, return_tensors="pt", padding=True, truncation=True)
    outputs = model.generate(inputs["input_ids"], max_length=50)
    urgency = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return urgency

def extract_key_activity(sentence_group):
    input_text = f"1. What did the person do in little detail(without any i/my)?\nText: {sentence_group}"
    inputs = tokenizer(input_text, return_tensors="pt", padding=True, truncation=True)
    outputs = model.generate(inputs["input_ids"], max_length=50)
    key_activity = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return key_activity

def group_linked_sentences(diary_text):
    # Split sentences by '. ' for simplicity
    return diary_text.split(". ")

def process_diary(diary_text):
    grouped_sentences = group_linked_sentences(diary_text)
    data = []

    for group in grouped_sentences:
        category = classify_sentence_group(group)
        urgency = urgency_categorization(group)
        key_activity = extract_key_activity(group)
        data.append({"text": group, "category": category, "urgency": urgency, "key_activity": key_activity})

    return pd.DataFrame(data)
