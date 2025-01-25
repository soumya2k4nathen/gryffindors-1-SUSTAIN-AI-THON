import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRole } from '../contexts/RoleContext'; // Adjust path if necessary
import { router } from 'expo-router';
import CustomButton from './components/CustomButton'; // Ensure this path is correct

const Splash = () => {
  const { setUserRole } = useRole();

  const handleRoleSelection = (role) => {
    setUserRole(role);
    router.push('/sign-in');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login as</Text>
      <CustomButton onPress={() => handleRoleSelection('student')} label="Student" style={styles.button} />
      <CustomButton onPress={() => handleRoleSelection('teacher')} label="Teacher" style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 35,
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    color: '#524D56',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
  },
});

export default Splash;
