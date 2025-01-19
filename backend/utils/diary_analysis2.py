from datetime import datetime
current_date = datetime.now().strftime("%Y-%m-%d")
current_day = datetime.now().strftime("%A")

new_df = pd.DataFrame({
    "Date": [current_date],
    "Day": [current_day],
    "Academic": df[df['category'] == "academic positive"].shape[0]-df[df['category'] == "academic negative"].shape[0],
    "Health": df[df['category'] == "health positive"].shape[0]-df[df['category'] == "health negative"].shape[0],
    "Social": df[df['category'] == "social positive"].shape[0]-df[df['category'] == "social negative"].shape[0],
    "Need help": df[df['urgency'] == "b"].shape[0],
    "Immediate help needed": 1 if df[df['urgency'] == "c"].shape[0]>0 else 0,
})

print(new_df)
