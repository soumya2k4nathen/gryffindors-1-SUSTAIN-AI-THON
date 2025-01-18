import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useRole } from './RoleContext'; 
import { Redirect, router } from 'expo-router';

const Splash = () => {
  const { setUserRole } = useRole(); 

  const handleRoleSelection = (role) => {
    setUserRole(role);
    router.push('/sign-in')
  };

  return (
    <View style={styles.container}>
      <Text>Splash Screen</Text>
      <Button
        title="Student"
        onPress={() => handleRoleSelection('student')}
      />
      <Button
        title="Teacher"
        onPress={() => handleRoleSelection('teacher')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
