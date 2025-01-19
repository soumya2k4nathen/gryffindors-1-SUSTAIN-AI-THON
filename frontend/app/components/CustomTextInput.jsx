import React from 'react';
import { TextInput } from 'react-native-paper';

const CustomTextInput = ({ label, value, onChangeText, secureTextEntry = false }) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      activeUnderlineColor="#4F033D"
      underlineColor="#08010e"
      style={{
        marginBottom: 10,
        //backgroundColor: '#b89ab1',
        backgroundColor:'#f4f4f4',
        //color: '#08010e'
      }}
    />
  );
};

export default CustomTextInput;