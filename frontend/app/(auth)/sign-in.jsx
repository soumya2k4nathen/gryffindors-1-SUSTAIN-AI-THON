import React, { useState } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useRole } from '../RoleContext';
import { Link, router } from 'expo-router';
import CustomTextInput from '../components/CustomTextInput'; // Import the new component
import CustomButton from '../components/CustomButton';

const SignIn = () => {
  const { role } = useRole();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Signed in as', role, username, password);
    if (role === 'student') {
      router.push('/home');
    } else if (role === 'teacher') {
      router.push('/dashboard');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      {/* Center the content and prevent stretching */}
      <View
        style={{
          padding: 16,
          width: '100%', // Keep a fixed width for the content
          maxWidth: 400, // Optional: constrain max width for larger screens
        }}
      >

        {role === 'student' ? (
          <>
            <CustomTextInput
              label="Pseudoname"
              value={username}
              onChangeText={setUsername}
            />
            <CustomTextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </>
        ) : (
          <>
            <CustomTextInput
              label="Name"
              value={username}
              onChangeText={setUsername}
            />
            <CustomTextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </>
        )}

        <CustomButton onPress={handleSubmit} label="Sign In" style={{marginTop:50}}/>

        <Link
          href="/sign-up"
          style={{
            marginTop: 18,
            textAlign: 'center',
            color: '#AB185A',
            fontSize: 17
          }}
        >
          Don’t have an Account? Sign Up
        </Link>
      </View>
   </View>
  );
};

export default SignIn;
