import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRole } from '../RoleContext'; 
import { Link } from 'expo-router';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios'; 

const SignUp = () => {
  const { role } = useRole(); // Get role from context
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [phone, setPhone] = useState('');
  const [pseudoName, setPseudoName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.178.158:5000/signup/student', {
        name: name,
        grade: grade,
        email: email,
        password: password,
        phone: phone,
        pseudo_name: pseudoName
      });
  
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error during sign-up:", error);
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
      <View
        style={{
          padding: 16,
          width: '100%',
          maxWidth: 400,
        }}
      >
        {/* Name Field */}
        <CustomTextInput
          label="Name"
          value={name}
          onChangeText={setName}
        />

        {/* Email Field */}
        <CustomTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Grade Field */}
        <CustomTextInput
          label="Grade"
          value={grade}
          onChangeText={setGrade}
        />

        {/* Pseudo Name Field (only for students) */}
        {role === 'student' && (
          <CustomTextInput
            label="Pseudo Name"
            value={pseudoName}
            onChangeText={setPseudoName}
          />
        )}

        {/* Phone Field (optional, for both roles) */}
        <CustomTextInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Password Field */}
        <CustomTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Confirm Password Field */}
        <CustomTextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* Error message */}
        {error ? (
          <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
        ) : null}

        {/* Sign Up Button */}
        <CustomButton onPress={handleSubmit} label="Sign Up" style={{ marginTop: 45 }} />

        {/* Link to Sign In */}
        <Link
          href="/sign-in"
          style={{
            marginTop: 15.5,
            textAlign: 'center',
            color: '#AB185A',
            fontSize: 17,
          }}
        >
          Already have an account? Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
