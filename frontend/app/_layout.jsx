import { Stack } from 'expo-router';
import { RoleProvider } from '../contexts/RoleContext'; // Ensure this path is correct

const RootLayout = () => {
  return (
    <RoleProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(jentry)" options={{ headerShown: false }} />
        <Stack.Screen name="(teacher)" options={{ headerShown: false }} />
      </Stack>
    </RoleProvider>
  );
};

export default RootLayout;
