import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import { useTheme } from "./ThemeContext";

import Icon from "react-native-vector-icons/MaterialIcons";
import ToggleComp from "./togglecomp";
import { LinearGradient } from "expo-linear-gradient";

import { LooseEnds } from "../Data/LooseEnds";

export default function Dashboard({ navigation }) {
  const [looseEnds, setLooseEnds] = useState(LooseEnds);
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

  const profCardColor = theme === "dark" ? "#222" : "#31473A";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    // Toggle menu open/close
  };
  const time = 48 + " Hr";
  const renderItem = ({ item }) => (
    <View style={[styles.LEItemBox,{ marginBottom: 10 ,display:"flex",}]}>
      <Image
        source={{ uri: item.profile }}
        style={{ width: 50, height: 50, backgroundColor: "black" }}
      />
      <View>

      <Text>Name: {item.name}</Text>
      {/* <Text> */}
        {/* Phone: {item.countryCode} {item.phone} */}
      {/* </Text> */}
      {/* <Text>Email: {item.email}</Text> */}
      <Text>Relation: {item.relation}</Text>
      {/* <Text>Affection: {item.affection}</Text> */}
      </View>
    </View>
  );

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
                  ? "rgba(0, 0, 0, .6)"
                  : "#FFF",
              opacity: isMenuOpen ? 1.5 : 0,
              display: isMenuOpen ? "flex" : "none",
              zIndex: 75,
            },
          ]}
        ></TouchableOpacity>
        <TouchableOpacity style={styles.whycontainer}>
          <Text
            style={{
              color: "#111",

              fontSize: 20,
            }}
          >
            ?
          </Text>
        </TouchableOpacity>
        {/* <ToggleSwitch isDarkMode={theme === "dark"} onToggle={toggleTheme} /> */}
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.header1,
              { color: theme === "dark" ? "#EEE" : "#EEE" },
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
              color={theme === "dark" ? "#EEE" : isMenuOpen ? "#111" : "#EEE"}
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
            styles.profCard,
            {
              backgroundColor: theme === "dark" ? "#222" : "#31473A",
            },
          ]}
        >
          <View
            style={[
              styles.profileContainer,
              {
                backgroundColor: theme === "dark" ? "#222" : "#FFF",
              },
            ]}
          >
            <Icon
              name="edit"
              size={20}
              color={theme === "dark" ? "#EEE" : "#111"}
              style={{
                position: "absolute",
                top: 10,
                right: 20,
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",

                alignSelf: "center",

                borderWidth: 0.2,
                width: "37%",
                // top: 15,
                padding: 20,
                //   left: 5,
                borderRadius: 100,
                height: 105,
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
                width: "65%",
                height: 130,
                borderRadius: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                {/* <Icon
                  name="person"
                  size={18}
                  color={theme === "dark" ? "#EEE" : "#111"}
                  style={{ marginRight: 8 }}
                /> */}
                <Text
                  style={{
                    color: theme === "dark" ? "#EEE" : "#111",
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  John Doe
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <Icon
                  name="phone"
                  size={14}
                  color={theme === "dark" ? "#EEE" : "#111"}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    color: theme === "dark" ? "#EEE" : "#111",
                    fontSize: 13,
                  }}
                >
                  +234 123 456 7890
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <Icon
                  name="email"
                  size={14}
                  color={theme === "dark" ? "#EEE" : "#111"}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    color: theme === "dark" ? "#EEE" : "#111",
                    fontSize: 13,
                    width: "100%",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  JohnDoe@email.com
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <Icon
                  name="timer"
                  size={14}
                  color={theme === "dark" ? "#EEE" : "#111"}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    color: theme === "dark" ? "#EEE" : "#111",
                    fontSize: 13,
                    width: "100%",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {time}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text
          style={[
            styles.LEtext,
            { color: theme === "dark" ? "#EEE" : "#3a3147" },
          ]}
        >
          Loose ends
        </Text>
        <FlatList
          data={looseEnds}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id.toString()} // Use a unique key if available
          style={styles.LEContainer}
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

    position: "relative",
    zIndex: 2,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  whycontainer: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 100,
    width: 40,
    height: 40,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    elevation: 15,
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
    zIndex: 125,

    fontFamily: "DeliciousHandrawn-Regular",
    color: "#111",
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
    fontFamily: "Poppins-Regular",
    // borderWidth: 1,
    width: "100%",
    borderBottomWidth: 0.2,
    paddingLeft: 10,
    height: 35,
    // elevation: 1,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

    flex: 1,
  },
  menuItem2: {
    fontSize: 14,
    paddingVertical: 5,
    paddingLeft: 10,
    fontFamily: "Poppins-Regular",
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

    zIndex: 225,
  },
  profileContainer: {
    width: "80%",
    height: 170,
    alignSelf: "center",
    justifyContent: "space-between",
    top: 25,
    zIndex: 55,
    backgroundColor: "white",
    borderRadius: 40,
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
  profCard: {
    width: "100%",
    height: 300,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,

    elevation: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  LEtext: {
    // position: "absolute",
    top: 20,
    left: 35,
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 10,  
    // fontFamily: "Poppins-Regular",
  },
  LEContainer: {
    top: 25,
    alignSelf: "center",
    width: "90%",
    height: "100%",
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    // borderWidth: 1,
    marginBottom: 45,
  },
  LEItemBox:{
    width: "100%",
    paddingTop:15,
    paddingBottom:15,
    alignItems:"center",
    // padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFF",
    elevation:1 ,
    borderWidth:1,
    flexDirection: "row",
  }
});
