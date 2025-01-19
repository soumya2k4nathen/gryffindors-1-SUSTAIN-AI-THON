// Message.js
import React from 'react';
import { Text, View} from 'react-native';
import { useWindowDimensions } from 'react-native';
import { Card } from 'react-native-paper';

const Message = ({ user, text }) => {
  const { width } = useWindowDimensions(); 

  return (
    <View
      style={{
        alignItems: user === 'You' ? 'flex-end' : 'flex-start',
        marginBottom: 8,
      }}
    >
      <Card
        style={{
          maxWidth: width * 0.8, 
          borderRadius: 16,
          backgroundColor: user === 'You' ? '#AB185A' : '#B24D69',
          margin: 1.5,
        }}
      >
        <Card.Content>
          <Text style={{ color: '#ebedeb', fontWeight: 'bold',
            fontSize: 17,
           }}>{user}</Text>
          <Text style={{ color: user === 'You' ? '#F4F4F4' : "#fdfeff",
            fontSize: 16,
           }}>
            {text}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Message;
