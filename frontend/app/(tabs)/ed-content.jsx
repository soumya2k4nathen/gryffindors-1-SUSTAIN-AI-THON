import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing the icon library

// Sample Flashcard Data
const flashcards = [
  { front: "Feeling overwhelmed?", back: "Take 5 deep breaths, focus on what you can control, and tackle one task at a time." },
  { front: "Why is sleep important for mental health?", back: "Sleep helps your brain process emotions, improves focus, and reduces anxiety. Aim for 7–9 hours a night." },
  { front: "Coping with stress? Choose wisely!", back: "Healthy coping: Exercise, journaling, talking to someone. Unhealthy coping: Overeating, avoidance, or self-isolation." },
];

const Flashcard = ({ front, back }) => {
  const [showBack, setShowBack] = useState(false);

  const handleToggleCard = () => setShowBack(!showBack);

  return (
    <View style={styles.card}>
      <Text style={styles.cardText} onPress={handleToggleCard}>
        {showBack ? back : front}
      </Text>
      <Text style={styles.toggleText}>{showBack ? 'Tap to see Front' : 'Tap to see Back'}</Text>
    </View>
  );
};

const EdContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSwipeIcon, setShowSwipeIcon] = useState(true);

  const handleGestureEvent = (event) => {
    if (event.nativeEvent.translationY < -100) { // swipe-up gesture
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (event.nativeEvent.translationY > 100) { // swipe-down gesture
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  useEffect(() => {
    // Hide the swipe icon after 3 seconds
    const timer = setTimeout(() => {
      setShowSwipeIcon(false);
    }, 3000);

    // Clear the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <PanGestureHandler onGestureEvent={handleGestureEvent}>
      <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Flashcard
              front={flashcards[currentIndex].front}
              back={flashcards[currentIndex].back}
            />
          </View>


        {showSwipeIcon && (
          <View style={styles.swipeIconContainer}>
            <Icon name="chevron-up" size={30} color="#4F033D" />
            <Text style={styles.swipeText}>Swipe up for next card</Text>
          </View>
        )}

      </View>
    </PanGestureHandler>
  );
};

export default EdContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width - 40,
    height: 300, // Adjusted to allow for swipe
  },
  card: {
    width: '100%',
    height: 500,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  toggleText: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  swipeIconContainer: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  swipeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F033D',
    marginTop: 8,
  },
});
