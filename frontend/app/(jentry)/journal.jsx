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
<<<<<<< HEAD
      type: "text",
      content: content,
    };
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/journal", // Update to your backend URL
        journalEntry,
        {
          headers: {
            pseudo_name: "example_user", // Replace with actual pseudo_name or user ID
          },
        }
      );
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error saving journal entry:", error.response?.data || error.message);
=======
      type: "text", // Optional, defaults to "text" if not provided
      content: content, // Content entered by the user
    };

    // The pseudo_name can be fetched from authentication logic (e.g., session or authentication token)
    const pseudoName = 'john_doe'; // Replace with the actual logged-in user's pseudo_name

    try {
      const response = await axios.post('http://192.168.178.158:5000/journal', journalEntry, {
        headers: {
          'Content-Type': 'application/json',
          'pseudo_name': pseudoName, // Send the pseudo_name in the header
        }
      });
      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error saving journal entry:', error);
>>>>>>> feaa9fd9325891df4cf38d781a94702874d99b2c
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
