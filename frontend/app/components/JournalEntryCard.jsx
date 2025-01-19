import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const JournalEntryCard = ({ date, title }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 6,
    borderRadius: 8, 
    padding: 16, 
    shadowColor: "#4F033D", 
    shadowOpacity: 5,
    shadowRadius: 4, 
    elevation: 5, 
  },
  title: {
    fontSize: 17, // equivalent to text-lg
    fontWeight: 'bold', 
    color: '#524D56',
  },
  date: {
    marginTop: 5,
    fontSize: 14.5,
    color: '#6b7280', 
  },
});

export default JournalEntryCard;
