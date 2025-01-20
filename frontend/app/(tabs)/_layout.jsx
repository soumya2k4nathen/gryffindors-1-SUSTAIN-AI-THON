import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { Appbar } from 'react-native-paper';  
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const TabLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
       <Appbar.Header style={{ backgroundColor: "#4F033D" }}>
        <Appbar.Content title="Thozha" titleStyle={{ color: "#F4F4F4" }} />
        <Appbar.Action
          icon="account-circle"
          color="#F4F4F4" 
          size={30}
          onPress={() => {
            console.log('Profile clicked');
          }}
        />
      </Appbar.Header>

      {/* Tabs */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FBE4D8",
          tabBarInactiveTintColor: "#F4F4F4",
          tabBarStyle: { 
            backgroundColor: "#4F033D",
            height: 50,
           },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="exercise"
          options={{
            title: 'Exercise',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="meditation"
                size={30} // Increased size
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
                size={30} // Increased size
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
                size={30} // Increased size
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
                size={30} // Increased size
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
                size={30} // Increased size
                color={color}
              />
            ),
          }}
        />
      </Tabs>

    </GestureHandlerRootView>
  );
};

export default TabLayout;
