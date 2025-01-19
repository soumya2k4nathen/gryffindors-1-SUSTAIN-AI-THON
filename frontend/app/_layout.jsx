import { Stack } from 'expo-router';
import { RoleProvider } from './RoleContext';

const RootLayout = () => {
  return (
    <RoleProvider>
      <Stack >
        <Stack.Screen name="index" options={{headerShown:false}}/>
        <Stack.Screen name="(auth)" options={{headerShown:false}}/>
        <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
        <Stack.Screen name="(jentry)" options={{headerShown:false}}/>
      </Stack>
    </RoleProvider>
  )
}

export default RootLayout

