# Mount Google Drive to access shared folders
from google.colab import drive
drive.mount('/content/drive')

# Path to the shared folder in the friend's Google Drive (modify this path as necessary)
# Replace 'your-folder-id' with the actual folder ID from the shared link
MODEL_PATH = '/content/drive/MyDrive/SharedFolderName/student_chat_toxicity_classifier'

# Importing necessary functions from the script
from utils.toxicity_model import load_model, predict_toxicity

# Load the model and tokenizer
tokenizer, model = load_model(MODEL_PATH)

# Example: Using the model
if __name__ == "__main__":
    user_input = input("Enter a message: ")
    prediction = predict_toxicity(user_input, tokenizer, model)
    print(f"The message is: {prediction}")
