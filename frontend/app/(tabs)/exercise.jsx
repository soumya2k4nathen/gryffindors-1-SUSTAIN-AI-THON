import React, { useState, useEffect } from 'react';
import {  TouchableOpacity,StyleSheet, Text, View, Button, Animated, Easing } from 'react-native';

const GuidedBreathing = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [cycleCount, setCycleCount] = useState(0); 
  const [timer, setTimer] = useState(null);
  const [x, setx] = useState("Ready?");

  const breathAnimation = useState(new Animated.Value(1))[0]; 

  const breathPattern = { inhale: 4, hold: 7, exhale: 8 }; 
  
  const updateMsg = (inst) =>{
    setx(inst);
  };

  const animateBreath = (pattern) => {
    updateMsg("Inhale");
    Animated.timing(breathAnimation, {
      toValue: 1.5, 
      duration: pattern.inhale * 1000, 
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      updateMsg("Hold");
      Animated.timing(breathAnimation, {
        toValue: 1.5, 
        duration: pattern.hold * 1000, 
        useNativeDriver: false,
        easing: Easing.linear,
      }).start(() => {
        updateMsg("Exhale");
        Animated.timing(breathAnimation, {
          toValue: 1,
          duration: pattern.exhale * 1000, 
          useNativeDriver: false,
          easing: Easing.linear,
        }).start();
      });
    });
  };

  const startBreathing = () => {
    setIsBreathing(true);
    setCycleCount(0); 
    animateBreath(breathPattern);

    setTimer(setInterval(() => {
      if (cycleCount < 3) {
        setCycleCount(prev => prev + 1);
        animateBreath(breathPattern);
      } else {
        stopBreathing();
      }
    }, (breathPattern.inhale + breathPattern.hold + breathPattern.exhale) * 1000));
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    clearInterval(timer); 
    setTimer(null); 
    breathAnimation.setValue(1); 
    updateMsg("Ready?");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hey There!</Text>

      <Animated.View
        style={[styles.circle, { transform: [{ scale: breathAnimation }] }]}
      >
        <Text style={styles.breathInstruction}>
          {x}
        </Text>
      </Animated.View>

      <TouchableOpacity
        style={[styles.butt, { backgroundColor: isBreathing ? "#AB185A" : "#4F033D" }]} 
        onPress={isBreathing ? stopBreathing : startBreathing}
      >
        <Text style={styles.buttonText}>
          {isBreathing ? "Stop Breathing Exercise" : "Start Breathing Exercise"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.instructions}>
        "Breathe in for 4 seconds, hold for 7 seconds, breathe out for 8 seconds."
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 100,
    justifyContent: "center",
    allignItem : "center",
    color: '#39333e',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#AB185A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  breathInstruction: {
    color: '#f4f4f4', fontWeight: 'bold',
    fontSize: 18,
  },
  instructions: {
    fontSize: 16,
    marginTop: 22,
    textAlign: 'center',
    color: '#888',
  },
  butt: {
    padding: 14,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 95
  },
  buttonText: {
    color: '#fff',  
    fontSize: 16,
  },
});

export default GuidedBreathing;
