import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native'; 
import { IconButton } from 'react-native-paper';
import JournalEntryCard from '../components/JournalEntryCard';
import {router} from 'expo-router';

const Home = () => {
  const [entries, setEntries] = useState([
    { date: '2025-01-19', title: 'My First Journal Entry' },
    { date: '2025-01-20', title: 'Learning React Native' },
    { date: '2025-01-21', title: 'Designing UI with NativeWind' },
    { date: '2025-01-19', title: 'My First Journal Entry' },
    { date: '2025-01-20', title: 'Learning React Native' },
    { date: '2025-01-21', title: 'Designing UI with NativeWind' },
    { date: '2025-01-20', title: 'Learning React Native' },
    { date: '2025-01-21', title: 'Designing UI with NativeWind' },
  ]);

  const handleAddNote = () => {
    console.log('Add note clicked');
    router.push('/journal')
  };

  const handleVoiceRecord = () => {
    console.log('Voice record button clicked');
    // Handle voice recording functionality here
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {entries.map((entry, index) => (
          <JournalEntryCard key={index} date={entry.date} title={entry.title} />
        ))}
      </ScrollView>

      {/* Add Note Button */}
      <IconButton
        icon="plus"
        iconColor="white"
        size={32}
        style={styles.addButton}
        onPress={handleAddNote}
      />

      {/* Voice Record Button */}
      <IconButton
        icon="microphone"
        iconColor="white"
        size={32}
        style={styles.voiceRecordButton}
        onPress={handleVoiceRecord}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  scrollContainer: {
    width: '100%',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#4F033D',
    position: 'absolute',
    bottom: 20, 
    right: 20,
    borderRadius: 50,
    zIndex: 1,
  },
  voiceRecordButton: {
    backgroundColor: '#4F033D',  
    position: 'absolute',
    bottom: 20, 
    left: 20,  
    borderRadius: 50,
    zIndex: 1,
  },
});

export default Home;
