import torch
from transformers import RobertaTokenizer, RobertaForSequenceClassification

# Load the model and tokenizer only once
def load_model(model_path):
    tokenizer = RobertaTokenizer.from_pretrained(model_path)
    model = RobertaForSequenceClassification.from_pretrained(model_path)
    return tokenizer, model

# Function to predict toxicity
def predict_toxicity(text, tokenizer, model):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    probabilities = torch.nn.functional.softmax(logits, dim=-1)
    predicted_class = torch.argmax(probabilities, dim=-1).item()
    return "Non-toxic" if predicted_class == 0 else "Toxic"
