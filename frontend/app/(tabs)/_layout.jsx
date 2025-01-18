import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // MaterialCommunityIcons is used by React Native Paper

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#522959", // Active tab color
        tabBarInactiveTintColor: "#B24D69", // Inactive tab color
        tabBarStyle: { backgroundColor: "#FAE5D8" }, // Tab bar background color
      }} 
    >

      {/* Exercise Screen */}
      <Tabs.Screen
        name="excercise"
        options={{
          title: 'Exercise',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="meditation" // Icon for "Exercise"
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Educational Content Screen */}
      <Tabs.Screen
        name="ed-content"
        options={{
          title: 'EdContent',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="book-open-page-variant" // Icon for "Educational Content"
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Home Screen */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="home" // MaterialCommunityIcons name for "home" icon
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Chatroom Screen */}
      <Tabs.Screen
        name="chatroom"
        options={{
          title: 'Chatroom',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="chat" // Icon for "Chatroom"
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Analysis Screen */}
      <Tabs.Screen
        name="analysis"
        options={{
          title: 'Analysis',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="chart-line" // Icon for "Analysis"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
