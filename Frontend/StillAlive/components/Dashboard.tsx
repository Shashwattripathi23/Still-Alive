import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { useTheme } from "./ThemeContext";

import Icon from "react-native-vector-icons/MaterialIcons";
import ToggleComp from "./togglecomp";

export default function Dashboard({ navigation }) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const transY = useRef(new Animated.Value(-150));

  useEffect(() => {
    if (isMenuOpen)
      Animated.timing(transY.current, {
        toValue: 0,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    else {
      Animated.timing(transY.current, {
        toValue: -200,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isMenuOpen]);

  const toggle = () => {
    toggleTheme();
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    // Toggle menu open/close
  };

  return (
    <View style={[styles.screen, containerStyle]}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={toggleMenu}
          style={[
            styles.overlay,
            {
              backgroundColor:
                theme === "dark"
                  ? isMenuOpen
                    ? "rgba(0, 0, 0, .5)"
                    : "#000"
                  : isMenuOpen
                  ? "rgba(0, 0, 0, .2)"
                  : "#FFF",
              opacity: isMenuOpen ? 1.5 : 0,
              display: isMenuOpen ? "flex" : "none",
              zIndex: 75,
            },
          ]}
        ></TouchableOpacity>
        {/* <ToggleSwitch isDarkMode={theme === "dark"} onToggle={toggleTheme} /> */}
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.header1,
              { color: theme === "dark" ? "#EEE" : "#31473A" },
            ]}
          >
            Still Alive?
          </Text>
        </View>
        <Animated.View
          style={[
            styles.menuContainer,
            {
              transform: [{ translateX: transY.current }],
              width: "50%",
              height: "100%",
              backgroundColor: isMenuOpen
                ? theme === "dark"
                  ? "#222"
                  : "#EEE"
                : "transparent",
            },
          ]}
        >
          <View style={styles.menu}>
            <Text
              style={[
                styles.menuItem,
                { color: theme === "dark" ? "#EEE" : "#111" },
              ]}
            >
              Settings
            </Text>

            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                // borderWidth: 1,
                // backgroundColor: "white",
                justifyContent: "space-between",
                borderBottomWidth: 0.2,
                // elevation: 1,
              }}
            >
              <Text
                style={[
                  styles.menuItem2,
                  { color: theme === "dark" ? "#EEE" : "#111" },
                ]}
              >
                Theme
              </Text>
              <ToggleComp isDarkMode={theme === "dark"} onToggle={toggle} />
            </View>
            <Text
              style={[
                styles.menuItem,
                { color: theme === "dark" ? "#EEE" : "#111" },
              ]}
            >
              Privacy Policy
            </Text>
            <Text
              style={[
                styles.menuItem,
                { color: theme === "dark" ? "#EEE" : "#111" },
              ]}
            >
              Terms of Service
            </Text>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                // borderWidth: 1,
                // backgroundColor: "white",
                justifyContent: "flex-start",
                borderBottomWidth: 0.2,
                // backgroundColor: "white",
                // elevation: 1,
              }}
            >
              <Text
                style={[
                  styles.menuItem,
                  {
                    color: theme === "dark" ? "#EEE" : "#111",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                ]}
              >
                Logout
              </Text>
              <Icon
                name="logout"
                size={20}
                color={theme === "dark" ? "#EEE" : "#111"}
                style={{
                  position: "absolute",
                  top: 5,
                  left: 70,
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              />
            </View>
          </View>

          <TouchableOpacity onPress={toggleMenu}>
            <Icon
              name={isMenuOpen ? "menu-open" : "menu"} // Change icon based on menu state
              size={30}
              color={theme === "dark" ? "#EEE" : "#111"}
              style={{
                position: "absolute",
                top: 0,
                right: isMenuOpen ? 0 : -50,
              }}
            />
          </TouchableOpacity>
        </Animated.View>

        <View
          style={[
            styles.profileContainer,
            {
              backgroundColor: theme === "dark" ? "#222" : "#FFF",
            },
          ]}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   alignSelf: "center",

              borderWidth: 0.2,
              width: "30%",
              top: 15,
              padding: 10,
              //   left: 5,
              borderRadius: 15,
              height: 100,
            }}
          >
            <Image
              source={
                theme === "dark"
                  ? require("../assets/images/Desfinalfull.png")
                  : require("../assets/images/Designer.png")
              }
              style={styles.image}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",

              padding: 10,
              borderWidth: 0.2,
              width: "65%",
              height: 130,
              //   marginLeft: 10,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                color: theme === "dark" ? "#EEE" : "#111",
                fontFamily: "Poppins-Regular",
                fontSize: 13,
                marginVertical: 5,
              }}
            >
              John Doe
            </Text>
            <Text
              style={{
                color: theme === "dark" ? "#EEE" : "#111",
                fontFamily: "Poppins-Regular",
                fontSize: 13,
                marginVertical: 5,
              }}
            >
              +234 123 456 7890
            </Text>
            <Text
              style={{
                color: theme === "dark" ? "#EEE" : "#111",
                fontFamily: "Poppins-Regular",
                fontSize: 13,
                marginVertical: 5,
                width: "100%",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              absvsnbksl@gmail.com
            </Text>
            <Text
              style={{
                color: theme === "dark" ? "#EEE" : "#111",
                fontFamily: "Poppins-Regular",
                fontSize: 13,
                marginVertical: 5,
                width: "100%",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Timer: 48 hrs
            </Text>
          </View>
        </View>
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

    position: "relative",
    zIndex: 2,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 70,
  },
  header1: {
    position: "absolute",
    fontSize: 25,
    marginRight: 10,
    fontFamily: "DeliciousHandrawn-Regular",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 0,
    width: "100%",

    // backgroundColor: "white",
  },
  menuItem: {
    fontSize: 14,
    paddingVertical: 5,
    fontFamily: "Inter",
    // borderWidth: 1,
    width: "100%",
    borderBottomWidth: 0.2,
    paddingLeft: 10,
    height: 35,
    // elevation: 1,
  },
  menuItem2: {
    fontSize: 14,
    paddingVertical: 5,
    paddingLeft: 10,
    fontFamily: "Inter ",
    height: 35,
    // borderWidth: 1,
  },
  menuContainer: {
    position: "absolute",

    top: 35,
    left: 0,
    width: "50%",

    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",

    alignItems: "flex-start",

    borderTopRightRadius: 10,

    zIndex: 100,
  },
  profileContainer: {
    width: "80%",
    height: 200,
    alignSelf: "center",
    justifyContent: "space-between",
    top: 100,
    zIndex: 55,
    backgroundColor: "white",
    borderRadius: 15,
    // borderWidth: 1.2,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  image: {
    // width: "auto",
    height: "100%",
    width: "100%",
  },
});
