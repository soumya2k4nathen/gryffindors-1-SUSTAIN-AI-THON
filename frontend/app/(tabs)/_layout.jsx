import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { Appbar } from 'react-native-paper';  

const TabLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#FAE5D8' }}>
        <Appbar.Content title="Title" />
        <Appbar.Action
          icon="account-circle"
          onPress={() => {
            // Handle profile icon press 
            console.log('Profile clicked');
          }}
        />
      </Appbar.Header>

      {/* Tabs */}
      <Tabs
        screenOptions={{
          headerShown: false, 
          tabBarActiveTintColor: "#522959", 
          tabBarInactiveTintColor: "#B24D69", 
          tabBarStyle: { backgroundColor: "#FAE5D8" },
        }} 
      >
        <Tabs.Screen
          name="excercise"
          options={{
            title: 'Exercise',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="meditation" 
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="ed-content"
          options={{
            title: 'EdContent',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="book-open-page-variant" 
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="home"
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="chatroom"
          options={{
            title: 'Chatroom',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="chat"
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="analysis"
          options={{
            title: 'Analysis',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="chart-line" 
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabLayout;
