import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ToggleSwitch = ({ isDarkMode, onToggle }) => {
  const translateX = useRef(new Animated.Value(isDarkMode ? 50 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isDarkMode ? 50 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDarkMode]);

  const borderColor = isDarkMode ? "#d3d3d3" : "#222";

  return (
    <TouchableOpacity style={styles.switch} onPress={onToggle}>
      <LinearGradient
        colors={["#00000000", "#00000000"]}
        start={[0, 0]}
        end={[1, 1]}
        style={[styles.gradientBackground, {}]}
      >
        <View style={[styles.iconContainer, {}]}>
          <MaterialCommunityIcons
            name="weather-sunny"
            size={24}
            color={isDarkMode ? "#d3d3d3" : "white"}
            style={styles.sunIcon}
          />
          <MaterialCommunityIcons
            name="moon-waning-crescent"
            size={24}
            color={isDarkMode ? "#FFF" : "#d3d3d3"}
            style={styles.moonIcon}
          />
        </View>
      </LinearGradient>
      <Animated.View
        style={[
          styles.slider,
          {
            backgroundColor: "#31473A",
            transform: [{ translateX }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switch: {
    position: "absolute",
    top: 36,
    right: 10,
    width: 100,
    height: 34,
    flexDirection: "row",
    alignItems: "center",
  },
  gradientBackground: {
    height: 34,
    width: 100,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1, // Ensure the gradient background is below the icons
  },
  slider: {
    position: "absolute",
    top: 0.5,
    height: 33,
    width: 47,
    backgroundColor: "transparent",
    borderRadius: 30,
    zIndex: 0, // Ensure the slider is below the icons
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100, // Adjust to fit the slider width
    height: 34,
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    borderWidth: 0,
    borderRadius: 30,
    zIndex: 2, // Ensure the icons are above the slider
  },
  sunIcon: {
    position: "absolute",
    left: 12,
  },
  moonIcon: {
    position: "absolute",
    right: 12,
  },
});

export default ToggleSwitch;
