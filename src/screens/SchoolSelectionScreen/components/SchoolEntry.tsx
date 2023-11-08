import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SchoolEntry({ schoolName, schoolID }) {
  return (
    <View style={styles.viewStyle}>
      <Text style={{ fontSize: 20 }}>{schoolName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    borderColor: "black",
    borderRadius: 6,
    borderWidth: 0.8,
    padding: 5,
    margin: 1,
    marginHorizontal: 10,
  },
});
