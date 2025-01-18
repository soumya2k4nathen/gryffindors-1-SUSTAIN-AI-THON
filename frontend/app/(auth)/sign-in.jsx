import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useRole } from '../RoleContext'; 
import { Link,router } from 'expo-router'; // For navigation

const SignIn = () => {
  const { role } = useRole(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Handle the sign-in logic here, for example, validate the username and password
    console.log('Signed in as', role, username, password);
    router.push('/home')
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl mb-4">Sign In as {role}</Text>
      
      {role === 'student' ? (
        <>
          <TextInput
            label="Pseudoname"
            value={username}
            onChangeText={setUsername}
            className="w-full mb-4"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="w-full mb-4"
          />
        </>
      ) : (
        <>
          <TextInput
            label="Name"
            value={username}
            onChangeText={setUsername}
            className="w-full mb-4"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="w-full mb-4"
          />
        </>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        className="w-full py-3"
      >
        Sign In
      </Button>
      
      <Link href="/sign-up" className="mt-4 text-blue-500">
        Don’t have an Account? Sign Up
      </Link>
    </View>
  );
};

export default SignIn;
