import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton, Divider } from 'react-native-paper';
import axios from 'axios';

const Journal = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const currentDate = new Date().toLocaleDateString();

  const handleSaveEntry = async () => {
    const journalEntry = {

    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title?"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.date}>{currentDate}</Text>

      <Divider style={styles.divider} />
      
      <TextInput
        style={[styles.textArea]}
        placeholder="Tell us about your day..."
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={setContent}
      />
      
      <TouchableOpacity onPress={handleSaveEntry} style={styles.saveButton}>
        <IconButton
          icon="check"
          iconColor="#F4F4F4"
          size={26}
          style={{
            backgroundColor: "#4F033D",
            borderRadius: 25,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    padding: 12,
    fontSize: 24,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginLeft: 12,
  },
  textArea: {
    padding: 12,
    flex: 1, 
    textAlignVertical: 'top', 
    fontSize: 17,
    marginBottom: 16,
    lineHeight: 27.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 12,
  },
  saveButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4F033D',
    borderRadius: 50,
    padding: 10,
  },
});

export default Journal;