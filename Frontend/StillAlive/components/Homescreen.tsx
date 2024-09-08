import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ToggleSwitch from "./ToggleSwitch"; // Adjust the import path as needed
import { useFonts } from "expo-font";
import { useTheme } from "./ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

const GradientButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <LinearGradient
      colors={["#31473A", "#4A6E5E"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  const { theme, toggleTheme } = useTheme();

  const toggle = () => {
    toggleTheme(); // Toggle theme using the context
  };

  const [fontsLoaded] = useFonts({
    "DeliciousHandrawn-Regular": require("../assets/fonts/DeliciousHandrawn-Regular.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const containerStyle = {
    backgroundColor: theme === "dark" ? "#111" : "#FFF",
  };

  return (
    <View style={[styles.screen, containerStyle]}>
      <Image
        source={
          theme === "dark"
            ? require("../assets/images/Desfinalfull.png")
            : require("../assets/images/Designer.png")
        }
        style={styles.image}
      />
      <View style={styles.container}>
        <ToggleSwitch isDarkMode={theme === "dark"} onToggle={toggleTheme} />
        <Text
          style={[
            styles.header1,
            { color: theme === "dark" ? "#EEE" : "#31473A" },
          ]}
        >
          Still Alive?
        </Text>
        <Text
          style={[
            styles.text,
            { color: theme === "dark" ? "#DDD" : "#31473A" },
          ]}
        >
          Let's set up some things that you might want to do once you can't
          answer this question anymore
        </Text>
        <GradientButton
          title="Get Started"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
    zIndex: -1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  header1: {
    fontSize: 45,
    marginBottom: 20,
    fontFamily: "DeliciousHandrawn-Regular",
    position: "absolute",
    top: 200,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 100,
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#31473A",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#EDF4F2",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    paddingHorizontal: 20,
  },
  image: {
    position: "absolute",
    width: 300,
    height: 250,
    bottom: 0,
    right: 1,
    zIndex: -1,
  },
});
