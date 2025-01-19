import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';

const Analysis = () => {
  const [fontsLoaded] = useFonts({
    GreatVibes: GreatVibes_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const handleReport = () => {
    console.log('Report generated');
  };

  return (
    <View
      style={{
        marginTop:15,
        margin: 8,
        borderWidth: 0,
        borderRadius: 20, 
        backgroundColor: '#fff', 
        elevation: 10, 
        shadowColor: '#4F033D',
        shadowOpacity: 10,
        padding: 12,
        height : 150,  
      }}
    >
      <TouchableOpacity onPress={handleReport}>
        <Text style={{ fontFamily: 'GreatVibes', fontSize: 72, color: '#08010E' }}>
          Your Report
        </Text>
      </TouchableOpacity>
    </View>
  );
  
};

export default Analysis;
