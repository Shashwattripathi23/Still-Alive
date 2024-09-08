import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { CheckBox } from "react-native-elements";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import ToggleSwitch from "./ToggleSwitch";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather"; // Import Feather icons
import { useTheme } from "./ThemeContext"; // Adjust import path as needed
import { color } from "react-native-elements/dist/helpers";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const { theme, toggleTheme } = useTheme();
  const [form, setForm] = useState("login");
  const translateX = useSharedValue(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isChecked, setIsChecked] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleFormToggle = (formType) => {
    setForm(formType);
    translateX.value = withSpring(formType === "login" ? 0 : -width);
  };

  const handleLogin = () => {
    console.log("Login email:", email);
    console.log("Login password:", password);
    navigation.navigate("Dashboard");
  };

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

  const handleSignUp = () => {
    console.log("Sign up name:", name);
    console.log("Sign up email:", email);
    console.log("Sign up password:", password);
    console.log("Confirm password:", confirmPassword);
    navigation.navigate("Dashboard");
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const containerStyle = {
    backgroundColor:
      theme === "dark" ? "rgba(55, 55, 55, 0.85)" : "rgba(225, 225, 225, 0.85)",
  };

  const textColor = theme === "dark" ? "#EEE" : "#31473A";
  const headerColor = theme === "dark" ? "#FFF" : "#31473A";
  const checkboxColor = theme === "dark" ? "#EEE" : "#555";
  const screenColor = theme === "dark" ? "#111" : "#FFF";
  const GbuttonColor = theme === "dark" ? "black" : "black";
  const Tabtext =
    theme === "dark" ? "#EEE" : form === "login" ? "#EEE" : "#EEE";
  const inputtext = theme === "dark" ? "#EEE" : "#000";

  const borderColor = theme === "dark" ? "#555" : "#31473A";
  const placeholderColor = theme === "dark" ? "#EEE" : "#555";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={[
          styles.screen,
          {
            backgroundColor: screenColor,
          },
        ]}
      >
        <ToggleSwitch isDarkMode={theme === "dark"} onToggle={toggleTheme} />
        <Image
          source={
            theme === "dark"
              ? require("../assets/images/Desfinalfull.png")
              : require("../assets/images/Designer.png")
          }
          style={styles.image}
        />
        <Text style={[styles.header1, { color: headerColor }]}>
          Still Alive?
        </Text>
        <View
          style={[
            styles.container,
            {
              height: form === "login" ? 500 : 630,
              backgroundColor: containerStyle.backgroundColor,
            },
          ]}
        >
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tab, form === "login" && styles.activeTab]}
              onPress={() => handleFormToggle("login")}
            >
              <Text
                style={[
                  styles.tabText,
                  form === "login" && styles.activeTabText,
                  {
                    color:
                      theme === "dark"
                        ? Tabtext
                        : form === "signup"
                        ? "#000"
                        : "#EEE",
                  },
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, form === "signup" && styles.activeTab]}
              onPress={() => handleFormToggle("signup")}
            >
              <Text
                style={[
                  styles.tabText,
                  form === "signup" && styles.activeTabText,
                  {
                    color:
                      theme === "dark"
                        ? Tabtext
                        : form === "login"
                        ? "#000"
                        : "#EEE",
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.formContainer]}>
            {form === "login" ? (
              <View style={styles.form}>
                <Text style={[styles.header, { color: textColor }]}>Login</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme === "dark" ? "#333" : "#fff",
                      color: theme === "dark" ? "#fff" : "#000",
                      borderColor: borderColor,
                    },
                  ]}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
                />
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,

                      {
                        flex: 1,
                        color: theme === "dark" ? "#fff" : "#000",

                        backgroundColor: theme === "dark" ? "#333" : "#fff",
                        borderColor: borderColor,
                      },
                    ]}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                    placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.eyeButton}
                  >
                    <Icon
                      name={passwordVisible ? "eye-off" : "eye"}
                      size={20}
                      color={textColor}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    checked={isChecked}
                    onPress={handleCheckboxChange}
                    containerStyle={[
                      styles.checkbox,
                      { backgroundColor: "transparent" },
                    ]}
                    checkedColor={textColor}
                  />
                  <Text style={[styles.remember, { color: checkboxColor }]}>
                    Remember me
                  </Text>
                </View>
                <GradientButton title="Login" onPress={handleLogin} />
                <Text style={[styles.or, { color: textColor }]}>Or</Text>
                <TouchableOpacity
                  style={styles.Gbutton}
                  onPress={() => {
                    /* Handle Google sign in */
                  }}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      marginRight: 10,
                    }}
                    source={require("../assets/images/Glogo.webp")}
                  />
                  <Text style={[styles.Gbuttontext, { color: GbuttonColor }]}>
                    Sign in with Google
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.form}>
                <Text style={[styles.header, { color: textColor }]}>
                  Sign Up
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme === "dark" ? "#fff" : "#000",
                      borderColor: borderColor,
                      backgroundColor: theme === "dark" ? "#333" : "#fff",
                    },
                  ]}
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme === "dark" ? "#333" : "#fff",
                      color: theme === "dark" ? "#fff" : "#000",
                      borderColor: borderColor,
                    },
                  ]}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
                  autoCapitalize="none"
                />
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,

                      {
                        flex: 1,
                        color: theme === "dark" ? "#fff" : "#000",
                        backgroundColor: theme === "dark" ? "#333" : "#fff",
                        borderColor: borderColor,
                        marginBottom: 0,
                      },
                    ]}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                    placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.eyeButton}
                  >
                    <Icon
                      name={passwordVisible ? "eye-off" : "eye"}
                      size={19}
                      color={textColor}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,

                      {
                        flex: 1,
                        color: theme === "dark" ? "#fff" : "#000",
                        backgroundColor: theme === "dark" ? "#333" : "#fff",
                        borderColor: borderColor,
                      },
                    ]}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
                    secureTextEntry={!confirmPasswordVisible}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                    style={styles.eyeButton}
                  >
                    <Icon
                      name={confirmPasswordVisible ? "eye-off" : "eye"}
                      size={19}
                      color={textColor}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.conditions, { color: textColor }]}>
                  Password must be at least 8 characters long, include a number
                  and a special character.
                </Text>
                <GradientButton title="Sign Up" onPress={handleSignUp} />
                <Text style={[styles.conditions, { color: textColor }]}>
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy
                </Text>
                <Text style={[styles.or, { color: textColor }]}>Or</Text>
                <TouchableOpacity
                  style={styles.Gbutton}
                  onPress={() => {
                    /* Handle Google sign in */
                  }}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      marginRight: 10,
                    }}
                    source={require("../assets/images/Glogo.webp")}
                  />
                  <Text style={[styles.Gbuttontext, { color: GbuttonColor }]}>
                    Sign in with Google
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
    // backgroundColor: "white",
    zIndex: -1,
  },
  container: {
    width: "90%",
    borderRadius: 55,
    alignSelf: "center",
    zIndex: 10,
    paddingBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    width: "90%",
  },
  eyeButton: {
    padding: 10,
    marginLeft: -10,
    position: "absolute",
    right: 0,
    top: 0,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  header1: {
    fontSize: 45,
    marginBottom: 20,
    fontFamily: "DeliciousHandrawn-Regular",
    alignSelf: "center",
    marginTop: 100,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomColor: "#007BFF",
    backgroundColor: "#31473A",
    borderRadius: 65,
    elevation: 10,
  },
  tabText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  activeTabText: {
    color: "#EDF4F2",
    fontFamily: "Poppins-Regular",
  },
  formContainer: {
    flex: 1,
    width: width * 2,
    flexDirection: "row",
    marginTop: 20,
  },
  form: {
    width: width,
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#31473A",
    borderWidth: 0.5,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontFamily: "Poppins-Regular",
    width: "90%",
    borderRadius: 25,
    elevation: 2,
    paddingLeft: 15,
  },
  conditions: {
    marginVertical: 8,
    fontSize: 12,
    width: "90%",
    fontFamily: "Poppins-Regular",
  },
  button: {
    backgroundColor: "#31473A",
    width: "90%",
    padding: 10,
    borderRadius: 25,
    marginVertical: 5,
    alignItems: "center",
    elevation: 10,
  },
  buttonText: {
    color: "#EDF4F2",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  or: {
    textAlign: "center",
    marginVertical: 8,
    width: "90%",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    position: "absolute",
    width: 300,
    height: 250,
    top: "72%",
    right: 1,
    zIndex: -1,
  },
  remember: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  Gbutton: {
    backgroundColor: "white",
    width: "90%",
    padding: 10,
    borderRadius: 25,
    marginVertical: 5,
    alignItems: "center",
    elevation: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  Gbuttontext: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
});
