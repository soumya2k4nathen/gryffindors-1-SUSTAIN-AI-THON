import React from 'react'
import { Stack } from 'expo-router';

const TeacherLayout = () => {
  return (
      <Stack >
        <Stack.Screen name="dashboard" options={{headerShown:false}}/>
      </Stack>
    )
}

export default TeacherLayout