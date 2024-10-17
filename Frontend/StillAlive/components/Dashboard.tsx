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
    "Inter-Regular": require("../assets/fonts/InterN.ttf"),
 
  });

  if (!fontsLoaded) {
    return null;
  }

  const containerStyle = {
    backgroundColor: theme === "dark" ? "#111" : "#FFF",
  };

  const profCardColor = theme === "dark" ? "#31473A" : "#31473A";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    // Toggle menu open/close
  };
  const time = 48 + " Hr";
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.LEItemBox,
        {
          marginBottom: 10,
          display: "flex",
          // backgroundColor: affectionColors[item.affection - 1],
        },
      ]}
    >
      <Image
        source={{ uri: item.profile }}
        style={{
          width: 60,
          height: 60,
          backgroundColor: "black",
          borderRadius: 100,
          marginLeft: 20,
          borderWidth: 1,
        }}
        onError={(error) =>
          console.log("Error loading image:", error.nativeEvent.error)
        }
        onLoad={() => console.log("Image loaded")}
      />

      <View style={{ marginLeft: 10 }}>
        <Text
          style={{
            fontSize: 20,
            // fontWeight: "bold",
            fontFamily: "Inter-Regular",

            color: theme === "dark" ? "#EEE" : "#111",

          }}
        >
          {item.name}
        </Text>

        <Text
          style={{
            fontSize: 15,
            color: theme === "dark" ? "#EEE" : "#111",
            fontFamily: "Inter-Regular",
          }}
        >
          {item.relation}
        </Text>
        {/* <Text>{item.affection}</Text> */}
      </View>
      <Icon
        name="arrow-forward-ios"
        size={20}
        color={theme === "dark" ? "#EEE" : "#111"}
        style={{
          position: "absolute",
          alignItems: "center",
          alignSelf: "center",
          right: 20,
        }}
      />
      <View
        style={{
          position: "absolute",
          width: 9,
          height: 100,
          left: 0,

          // top: 10,
          backgroundColor: affectionColors[item.affection - 1],
        }}
      ></View>
    </View>
  );

  const affectionColors = [
    "#A5D6A7", // 1. Light Mint Green: Least affectionate
    "#81C784", // 2. Soft Greenish Lime
    "#66BB6A", // 3. Muted Light Green
    "#4CAF50", // 4. Soft Medium Green
    "#43A047", // 5. Muted Fresh Green
    "#388E3C", // 6. Soft Rich Green
    "#2E7D32", // 7. Deeper Green
    "#1D6F38", // 8. Balanced Forest Green
    "#24694A", // 9. Soft Deep Green
    "#2E7B70", // 10. Balanced Dark Teal Green: Most affectionate
  ];
  

  

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
              Privacy Policies
            </Text>
            <Text
              style={[
                styles.menuItem,
                { color: theme === "dark" ? "#EEE" : "#111" },
              ]}
            >
              Terms of Services
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
              backgroundColor: theme === "dark" ? "#31473A" : "#31473A",
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

                borderWidth: 0.7,
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
                    fontFamily: "Inter-Regular",
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
                    fontFamily: "Inter-Regular",
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
                    fontFamily: "Inter-Regular",
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
                    fontFamily: "Inter-Regular",
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
        <View
          style={{
            top: 20,
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            // borderWidth: 1,
            // position: "absolute",

            // backgroundColor: theme === "dark" ? "#222" : "#31473A",
          }}
        >
          <Text
            style={[
              styles.LEtext,
              { color: theme === "dark" ? "#EEE" : "#111" },
            ]}
          >
            Loose ends ({looseEnds.length}/10)
          </Text>
          <TouchableOpacity
            style={[
              styles.addcontainer,
              { backgroundColor: "white" ,
                borderWidth: 2.2, 
                borderColor: "#31473A",
              },
            ]}
          >
            <Text
              style={{
                color: theme === "dark" ? "#EEE" : "#31473A",

                fontSize: 20,
                fontFamily: "Inter-Regular",
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
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
  addcontainer: {
    // position: "absolute",
    // top: 30,
    // right: 20,
    zIndex: 50,
    width: 100,
    height: 45,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    elevation: 25,
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
    // fontFamily: "Inter-Regular",
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
    fontFamily: "Inter-Regular",
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
    fontFamily: "Inter-Regular",
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
    elevation: 25,
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
    // top: 20,
    // left: 35,
    fontSize: 23,
    // fontWeight: "bold",
    paddingBottom: 10,
    // fontFamily: "Poppins-Regular",
    fontFamily: "Inter-Regular",
  },
  LEContainer: {
    top: 35,
    alignSelf: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    // borderWidth: 1,
    borderWidth: 0.1,
    marginBottom: 45,
  },
  LEItemBox: {
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
    // padding: 10,
    borderRadius: 10,
    backgroundColor: "rgb(238,238,238)",
    elevation: 2,
    // borderWidth: 0.1,
    flexDirection: "row",
    overflow: "hidden",
    borderTopStartRadius: 10,

    height: 80,
  },
});
