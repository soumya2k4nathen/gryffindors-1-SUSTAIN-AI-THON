import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Load model and tokenizer from Hugging Face Hub
model_name = "Sk1306/student_chat_toxicity_classifier_model"  # Replace with your actual model path
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

def predict_toxicity(text):
    """
    Predicts the toxicity of the given text using a Hugging Face model locally.

    Args:
        text (str): The input text to evaluate.

    Returns:
        str: "Non-toxic" if the prediction label is 0, otherwise "Toxic".
    """
    # Tokenize the input text
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
    
    # Run the model inference without updating gradients
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Get the model's logits
    logits = outputs.logits
    
    # Apply softmax to get probabilities
    probabilities = torch.nn.functional.softmax(logits, dim=-1)
    
    # Get the predicted class (0 for Non-toxic, 1 for Toxic)
    predicted_class = torch.argmax(probabilities, dim=-1).item()
    
    # Return result based on the predicted class
    return "Non-toxic" if predicted_class == 0 else "Toxic"

# Example usage
if __name__ == "__main__":
    text_input = input("Enter a message: ")
    prediction = predict_toxicity(text_input)
    print(f"The message is: {prediction}")
