import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useRole } from './RoleContext'; 
import { Redirect, router } from 'expo-router';
import CustomButton from './components/CustomButton';

const Splash = () => {
  const { setUserRole } = useRole(); 

  const handleRoleSelection = (role) => {
    setUserRole(role);
    router.push('/sign-in')
  };

  return (
    <View style={{flex:1,justifyContent: 'center', margin: 35}}>
      <Text style={{fontSize: 17, textAlign:'center', color:'#524D56', fontWeight:"bold"}}> Login as </Text>
      <CustomButton onPress={() => handleRoleSelection('student')} label="Student" style={{marginTop:20}} />
      <CustomButton onPress={() => handleRoleSelection('teacher')} label="Teacher" style={{marginTop:20}} />
    </View>
  );
};


export default Splash;
