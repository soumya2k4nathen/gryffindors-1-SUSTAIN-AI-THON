import React from 'react'
import { Stack } from 'expo-router';

const JEntryLayout = () => {
  return (
      <Stack >
        <Stack.Screen name="journal" options={{headerShown:false}}/>
      </Stack>
    )
}

export default JEntryLayout