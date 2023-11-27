import React from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";

export default function BasicModal({
  animationType = "slide" as "slide" | "none" | "fade" | undefined,
  transparent = true,
  visible = false,
  onRequestClose = () => {},
  textFontColor = "#000000",
  modalBackgroundColor = "#111111",
  buttonBackgroundColor = "#3696F3",
  text = "",
  buttonTitle = "",
  onButtonPress = () => {},
}) {
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View
          style={[styles.modalView, { backgroundColor: modalBackgroundColor }]}
        >
          <Text style={{ color: textFontColor }}>{text}</Text>
          <View style={{ justifyContent: "flex-end", marginTop: 10 }}>
            <Button
              title={buttonTitle}
              color={buttonBackgroundColor}
              onPress={onButtonPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  modalView: {
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
