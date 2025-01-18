import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper'; // React Native Paper components
import { useWindowDimensions } from 'react-native'; // To calculate screen width for dynamic message width

const Chatroom = () => {
  const { width } = useWindowDimensions(); // Get screen width
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', user: 'John', text: 'Hello, how are you?' },
    { id: '2', user: 'Jane', text: 'I am doing well, thanks!' },
  ]);

  // Function to send a message
  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: String(messages.length + 1), user: 'You', text: message },
      ]);
      setMessage(''); // Clear the input field after sending the message
    }
  };

  return (
    <View className="flex-1 bg-[#FAE5D8]">
      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            className={`mb-2 ${
              item.user === 'You' ? 'items-end' : 'items-start'
            }`}
          >
            <Card
              className={`p-2 ${
                item.user === 'You' ? 'bg-[#522959]' : 'bg-[#B24D69]'
              }`}
              style={{
                maxWidth: width * 0.8, // Message bubble takes up 80% max width
                borderRadius: 16,
              }}
            >
              <Card.Content>
                <Text
                  className={`${
                    item.user === 'You' ? 'text-white' : 'text-white'
                  } font-bold`}
                >
                  {item.user}
                </Text>
                <Text className={`
                    {item.user === 'You' ? 'text-white' : 'text-black'}`}
                    >
                      {item.text}
                    </Text>
                  </Card.Content>
                </Card>
              </View>
            )}
            className="flex-1 mt-2 px-4"
            contentContainerStyle={{ paddingBottom: 20 }} // Add padding for bottom of the list
          />
    
          {/* Input and Send Button */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-row items-center p-4 border-t-2 border-gray-300"
          >
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message"
              className="flex-1 mr-4 border-gray-400 border p-2 rounded-lg bg-white"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              style={{ backgroundColor: '#ffffff' }}
            />
            <Button
              mode="contained"
              onPress={sendMessage}
              className="bg-[#522959] p-2 rounded-lg"
              labelStyle={{ color: 'white' }}
            >
              Send
            </Button>
          </KeyboardAvoidingView>
        </View>
      );
    };
    
    export default Chatroom;
    