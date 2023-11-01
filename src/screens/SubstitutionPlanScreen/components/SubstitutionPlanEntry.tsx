import React from "react";
import { Text, View, StyleSheet } from "react-native";
import DefaultColors from "../../../styles/DefaultColors";
import ISubstitutionPlanEntry from "../../../interfaces/SchulportalData/ISubstitutionPlanEntry";
import SubstitutionTypeColors from "../../../styles/SubstitutionTypeColors";

export default function SubstitutionPlanEntry(props: ISubstitutionPlanEntry) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColorByType(props.type) },
      ]}
    >
      <View style={styles.stundenView}>
        <Text style={styles.stundenText}>{props.lesson}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>{props.type}</Text>
          <Text style={styles.infoText}>
            {props.originalSubject} (
            {props.substitutionTeacher === "" ||
            props.substitutionTeacher === props.originalTeacher
              ? ""
              : props.substitutionTeacher + " statt "}
            {props.originalTeacher}) in {""}
            {props.substitutionRoom === "" ||
            props.substitutionRoom === props.originalRoom
              ? ""
              : props.substitutionRoom + " statt "}
            {props.originalRoom}
            {props.notice === "" ? "" : " - " + props.notice}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    height: 60,
    borderRadius: 8,
    flexDirection: "row",
  },
  stundenText: {
    fontSize: 30,
    color: DefaultColors.white,
  },
  stundenView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 2.5,
  },
  infoView: {
    marginLeft: 20,
    flex: 1,
    justifyContent: "center",
  },
  infoText: {
    color: DefaultColors.white,
  },
});

function getBackgroundColorByType(type: string) {
  let color = "";

  switch (type) {
    case "Statt-Vtr.":
      color = SubstitutionTypeColors.StattVtr;
      break;
    case "Vertretung":
      color = SubstitutionTypeColors.Vertretung;
      break;
    case "Betreeung":
      color = SubstitutionTypeColors.Betreuung;
      break;
    case "Vtr. ohne Lehrer":
      color = SubstitutionTypeColors.VtrOhneLehrer;
      break;
    case "Veranst.":
      color = SubstitutionTypeColors.Veranst;
      break;
    case "Raum-Vtr.":
      color = SubstitutionTypeColors.RaumVtr;
      break;
    case "Entfall":
      color = SubstitutionTypeColors.Entfall;
      break;
    default:
      color = SubstitutionTypeColors.default; //default color if it is a substitution type that is not listed in this app
      break;
  }

  return color;
}
