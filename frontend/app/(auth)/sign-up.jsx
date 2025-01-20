import React, { useState } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { useRole } from '../RoleContext'; 
import {Link} from 'expo-router';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

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
    //console.log('Signed up as', role, name, email, grade, phone, password, pseudoName);
    // Proceed with further actions like navigation or API call
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

            <CustomTextInput
              label="Name"
              value={name}
              onChangeText={setName}
            />
             <CustomTextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
      <CustomTextInput
        label="Grade"
        value={grade}
        onChangeText={setGrade}
      />
      
      {role === 'student' && (
        <CustomTextInput
          label="Pseudo Name"
          value={pseudoName}
          onChangeText={setPseudoName}
        />
      )}

      {role === 'student' && (
        <CustomTextInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      )}

      <CustomTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomTextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {error ? (
        <Text className="text-red-500 mb-4">{error}</Text>
      ) : null}

     <CustomButton onPress={handleSubmit} label="Sign Up" style={{marginTop:45}} />

        <Link
          href="/sign-in"
          style={{
            marginTop: 15.5,
            textAlign: 'center',
            color: '#AB185A',
            fontSize: 17
          }}
        >
          Sign In
        </Link>
    </View>
    </View>
  );
};

export default SignUp;
