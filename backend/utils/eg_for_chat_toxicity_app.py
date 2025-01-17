import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Load model and tokenizer from Hugging Face Hub
model_name = "Sk1306/student_chat_toxicity_classifier_model"  # Replace with your actual model path
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Function to predict toxicity
def predict_toxicity(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    probabilities = torch.nn.functional.softmax(logits, dim=-1)
    predicted_class = torch.argmax(probabilities, dim=-1).item()
    return "Non-toxic" if predicted_class == 0 else "Toxic"

# Example usage
if __name__ == "__main__":
    user_input = input("Enter a message: ")
    prediction = predict_toxicity(user_input)
    print(f"The message is: {prediction}")
