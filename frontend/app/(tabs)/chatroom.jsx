import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { Button, TextInput, IconButton } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import Message from '../components/Message';

const Chatroom = () => {
  const { width } = useWindowDimensions(); // Get screen width
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', user: 'John', text: 'Hello, how are you?' },
    { id: '2', user: 'Jane', text: 'missing the required default export. Ensure a React component is exported as defau' },
  ]);

  // Function to send a message
  const sendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        pseudoname: 'sou', // Replace this with dynamic pseudoname if needed
        content: message,
        date: new Date().toISOString(), // Use ISO format for the date
      };

      try {
        // Send the message to your backend
        const response = await fetch('http://192.168.178.158:5000/chat/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessage),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        // Update the local message list
        setMessages([
          ...messages,
          { id: String(messages.length + 1), user: 'You', text: message },
        ]);
        setMessage(''); // Clear the input field
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Message user={item.user} text={item.text} />
        )}
        contentContainerStyle={{
          paddingBottom: 20,
          padding: 10,
        }}
      />

      {/* Input and Send Button */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 0 }}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
          style={{
            flex: 1,
            marginRight: 10,
            backgroundColor: '#fff',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />
        <IconButton
          icon="send"
          onPress={sendMessage}
          iconColor="#F4F4F4"
          style={{
            backgroundColor: '#4F033D',
            borderRadius: 25,
            padding: 8,
          }}
          size={29} // Adjust the icon size as needed
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chatroom;
