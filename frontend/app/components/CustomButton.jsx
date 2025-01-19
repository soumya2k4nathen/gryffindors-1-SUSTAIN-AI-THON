import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = ({ onPress, label, style }) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: "#4F033D",
          padding: 16,
          borderRadius: 10,
          alignItems: 'center',
        },
        style, // This allows custom styles to be applied
      ]}
      onPress={onPress}
    >
      <Text style={{ color: '#fff', fontSize: 18.5 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
