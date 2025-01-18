from diary_processor import process_diary

# Sample diary text
diary_text = """
Today was a very busy day. I woke up early for my morning class, and it was a bit of a struggle to stay awake. The professor covered a lot of material, and I tried my best to keep up, but I found myself drifting off at times. After class, I grabbed a quick bite to eat and then headed to the library to study for an upcoming exam. I spent a few hours reviewing notes, and I felt a little more prepared. In the afternoon, I went for a run to clear my mind. It felt good to get some fresh air, and I had a chance to think about the things I needed to improve on in my studies. Later in the day, I caught up with some friends over video call. We talked about everything—work, life, and some funny moments from the past week. It was nice to catch up, but I was still feeling a bit overwhelmed with the amount of studying I have to do. In the evening, I did some light reading before bed. I'm hoping that tomorrow I can manage my time better and focus more on my studies, but it's always hard to balance everything. I'm trying to stay positive and motivated, but sometimes it feels like there's just too much to do.
"""

# Process the diary text
df = process_diary(diary_text)

# Display the resulting DataFrame
print(df)
