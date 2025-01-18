import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper'; 
import { useRole } from '../RoleContext'; 
import {Link} from 'expo-router';

const SignUp = () => {
  const { role } = useRole(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [phone, setPhone] = useState('');
  const [pseudoName, setPseudoName] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // Validate if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Additional validation for required fields
    if (!name || !email || !grade || !password || (role === 'student' && !pseudoName)) {
      setError('Please fill in all the fields');
      return;
    }

    // Handle the sign-up logic here
    console.log('Signed up as', role, name, email, grade, phone, password, pseudoName);
    // Proceed with further actions like navigation or API call
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl mb-4">Sign Up as {role}</Text>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        className="w-full mb-4"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="w-full mb-4"
      />
      <TextInput
        label="Grade"
        value={grade}
        onChangeText={setGrade}
        className="w-full mb-4"
      />
      
      {role === 'student' && (
        <TextInput
          label="Pseudo Name"
          value={pseudoName}
          onChangeText={setPseudoName}
          className="w-full mb-4"
        />
      )}

      {role === 'student' && (
        <TextInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          className="w-full mb-4"
        />
      )}

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full mb-4"
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        className="w-full mb-4"
      />

      {error ? (
        <Text className="text-red-500 mb-4">{error}</Text>
      ) : null}

      <Button
        mode="contained"
        onPress={handleSubmit}
        className="w-full py-3"
      >
        Sign Up
      </Button>
      <Link href="/sign-in">Sign In</Link>
    </View>
  );
};

export default SignUp;
