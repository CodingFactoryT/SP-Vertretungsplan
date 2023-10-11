import React from "react";
import { Text, View, StyleSheet } from "react-native";
import DefaultColors from "../../../styles/DefaultColors";

export default function NoSubstitutionsEntry() {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Keine Vertretungen vorhanden!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    margin: 8,
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    borderColor: "gray",
    borderWidth: 3,
  },
  text: {
    fontSize: 20,
    color: DefaultColors.white,
  },
});
