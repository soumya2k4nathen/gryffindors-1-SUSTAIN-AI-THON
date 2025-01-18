import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const Analysis = () => {
  const handleReport = () => {
    console.log('Report generated');
  };

  return (
    <View >
      <Card >
        <Card.Content>
          <TouchableOpacity  onPress={handleReport}>
            <Text >Your Report</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
};



export default Analysis;