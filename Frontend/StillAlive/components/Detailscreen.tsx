// DetailsScreen.tsx
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        Details Screen
      </Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
