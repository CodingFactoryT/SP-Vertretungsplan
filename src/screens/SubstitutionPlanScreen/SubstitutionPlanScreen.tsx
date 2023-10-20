import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Switch } from "react-native";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DefaultColors from "../../styles/DefaultColors";
import SubstitutionPlanEntry from "./components/SubstitutionPlanEntry";
import { useUserData } from "../../hooks/api/useUserData";
import { useSubstitutionPlanEntriesWithDates } from "../../hooks/api/useSubstitutionPlanEntriesWithDates";
import ISubstitutionPlanEntry from "../../interfaces/SchulportalData/ISubstitutionPlanEntry";
import ThemedScreen from "../ThemedScreen/ThemedScreen";
import { SIDContext, ThemeContext } from "../../contexts/Contexts";
import LoadingComponent from "../../components/LoadingComponent";
import NoSubstitutionsEntry from "./components/NoSubstitutionsEntry";
import { useTimetable } from "../../hooks/api/useTimetable";
import useAsyncStorage from "../../hooks/useAsyncStorage";

export default function SubstitutionPlanScreen() {
  const [isDonatePopupVisible, setDonatePopupVisible] = useState(false);
  const [isContactPopupVisible, setContactPopupVisible] = useState(false);

  const [substitutionPlanEntries, setSubstitutionPlanEntries] = useState<
    ISubstitutionPlanEntry[]
  >([]);
  const [
    substitutionPlanEntriesOfFirstDate,
    setSubstitutionPlanEntriesOfFirstDate,
  ] = useState<ISubstitutionPlanEntry[]>([]);
  const [
    substitutionPlanEntriesOfSecondDate,
    setSubstitutionPlanEntriesOfSecondDate,
  ] = useState<ISubstitutionPlanEntry[]>([]);

  const [firstDate, setFirstDate] = useState("...");
  const [secondDate, setSecondDate] = useState("...");

  enum SelectedDate {
    "FirstDate",
    "SecondDate",
  }
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(
    SelectedDate.FirstDate
  );
  const [class_, setClass] = useState("?");
  const [isScreenLoading, setScreenLoading] = useState(true);

  const [userData, isUserDataLoading] = useUserData();

  const [
    firstDate_,
    substitutionPlanEntriesOfFirstDate_,
    secondDate_,
    substitutionPlanEntriesOfSecondDate_,
    areSubstitutionPlanEntriesLoading,
  ] = useSubstitutionPlanEntriesWithDates();

  const [
    isPersonalizedSubstitutionPlanEnabled,
    setPersonalizedSubstitutionPlanEnabled,
  ] = useState(false);

  const [getTimetable] = useTimetable();
  const [timetable, setTimetable] = useState([[]]);
  const {
    getData: getPersonalizedSubstitutionPlanEnabledInAsyncStorage,
    storeData: storePersonalizedSubstitutionPlanEnabledInAsyncStorage,
  } = useAsyncStorage("PersonalizedSubstitutionPlan");

  useEffect(() => {
    if (!isUserDataLoading) {
      setClass(userData.class === "" ? "?" : userData.class);
    }

    if (!areSubstitutionPlanEntriesLoading) {
      setFirstDate(firstDate_);
      setSubstitutionPlanEntriesOfFirstDate([
        ...substitutionPlanEntriesOfFirstDate_,
      ]);

      setSecondDate(secondDate_);
      setSubstitutionPlanEntriesOfSecondDate([
        ...substitutionPlanEntriesOfSecondDate_,
      ]);

      setSubstitutionPlanEntries([...substitutionPlanEntriesOfFirstDate_]);
      setScreenLoading(false);
    }
  }, [areSubstitutionPlanEntriesLoading, isUserDataLoading]);

  useEffect(() => {
    getTimetable().then((retrievedTimetable) => {
      setTimetable([...retrievedTimetable]);
    });
  }, []);

  const [isInitialTimetableChange, setInitialTimetableChange] = useState(true);

  useEffect(() => {
    if (isInitialTimetableChange) {
      setInitialTimetableChange(false);
      return;
    }
    getPersonalizedSubstitutionPlanEnabledInAsyncStorage().then(
      (isPersonalizedSubstitutionPlanEnabledInAsyncStorage) => {
        if (isPersonalizedSubstitutionPlanEnabledInAsyncStorage === "true") {
          setPersonalizedSubstitutionPlanEnabled(false);
          togglePersonalizedSubstitutionPlan();
        }
      }
    );
  }, [timetable]);

  const [sid] = useContext(SIDContext);
  function togglePersonalizedSubstitutionPlan() {
    if (!isPersonalizedSubstitutionPlanEnabled) {
      storePersonalizedSubstitutionPlanEnabledInAsyncStorage("true");
      const filteredEntries = personalizeSubstitutionPlanEntries(
        timetable,
        substitutionPlanEntries,
        sid
      );

      setSubstitutionPlanEntries([...filteredEntries]);
    } else {
      storePersonalizedSubstitutionPlanEnabledInAsyncStorage("false");
      if (selectedDate === SelectedDate.FirstDate) {
        setSubstitutionPlanEntries([...substitutionPlanEntriesOfFirstDate]);
      } else {
        setSubstitutionPlanEntries([...substitutionPlanEntriesOfSecondDate]);
      }
    }

    setPersonalizedSubstitutionPlanEnabled((previousState) => !previousState);
  }

  const { theme, toggleTheme, setTheme } = useContext(ThemeContext);

  if (isScreenLoading) {
    return <LoadingComponent />;
  }
  console.log(theme);
  const fontColor =
    theme === "light"
      ? DefaultColors.darkThemedBackground
      : DefaultColors.lightThemedBackground;

  const modalBackgroundColor =
    theme === "light"
      ? DefaultColors.lightThemedSecondBackground
      : DefaultColors.darkThemedSecondBackground;
  return (
    <ThemedScreen>
      <View style={styles.container}>
        <Text style={[styles.title, { color: fontColor }]}>
          {class_}-Vertretungsplan
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (isPersonalizedSubstitutionPlanEnabled) {
                const filteredEntries = personalizeSubstitutionPlanEntries(
                  timetable,
                  substitutionPlanEntriesOfFirstDate
                );

                setSubstitutionPlanEntries([...filteredEntries]);
              } else {
                setSubstitutionPlanEntries([
                  ...substitutionPlanEntriesOfFirstDate,
                ]);
              }
              setSelectedDate(SelectedDate.FirstDate);
            }}
          >
            <Text>{firstDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (isPersonalizedSubstitutionPlanEnabled) {
                const filteredEntries = personalizeSubstitutionPlanEntries(
                  timetable,
                  substitutionPlanEntriesOfSecondDate
                );

                setSubstitutionPlanEntries([...filteredEntries]);
              } else {
                setSubstitutionPlanEntries([
                  ...substitutionPlanEntriesOfSecondDate,
                ]);
              }
              setSelectedDate(SelectedDate.SecondDate);
            }}
          >
            <Text>{secondDate}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {substitutionPlanEntries.length === 0 ? (
            <NoSubstitutionsEntry />
          ) : (
            substitutionPlanEntries.map((item) => (
              <SubstitutionPlanEntry
                {...item}
                key={item.lesson + item.originalRoom + item.originalTeacher}
              />
            ))
          )}
        </ScrollView>
        <View style={styles.bottomBar}>
          <Text style={styles.personalizedSubstitutionPlanDescription}>
            Personalisierter V-Plan
          </Text>
          <Switch
            style={styles.personalizedSubstitutionPlanSwitch}
            onValueChange={togglePersonalizedSubstitutionPlan}
            value={isPersonalizedSubstitutionPlanEnabled}
            thumbColor={
              isPersonalizedSubstitutionPlanEnabled ? "#0061FF" : "white"
            }
            trackColor={{
              true: "#0088FF",
              false: "#ababab",
            }}
          ></Switch>
        </View>
        <View style={styles.bottomButtonsStyle}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => setDonatePopupVisible(true)}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#003384",
                  fontWeight: "500",
                }}
              >
                Spen
              </Text>
              <Text
                style={{ fontSize: 18, color: "#009EDB", fontWeight: "500" }}
              >
                den
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => setContactPopupVisible(true)}
          >
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Kontakt</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDonatePopupVisible}
        onRequestClose={() => {
          setDonatePopupVisible(!isDonatePopupVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              { backgroundColor: modalBackgroundColor },
            ]}
          >
            <Text style={{ color: fontColor }}>
              Liebe Nutzerin, lieber Nutzer, {"\n"}
              {"\n"}die Erstellung einer solchen App benötigt viel Zeit und
              Arbeit. {"\n"}Um die App in Zukunft weiter entwicklen zu können
              und neue Features einzubauen, wäre es super, wenn du mir eine
              kleine Spende über PayPal hinterlassen würdest:{"\n"}
              {"\n"}
              PayPal-Adresse: codingt.paypal@gmail.com {"\n"}
              {"\n"}Vielen Dank für Deine Unterstützung! {"\n"}
              {"\n"}-Tim B., Entwickler
            </Text>
            <View style={{ justifyContent: "flex-end", marginTop: 10 }}>
              <Button
                title="Alles klar!"
                onPress={() => {
                  setDonatePopupVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isContactPopupVisible}
        onRequestClose={() => {
          setContactPopupVisible(!isContactPopupVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              { backgroundColor: modalBackgroundColor },
            ]}
          >
            <Text style={{ color: fontColor }}>
              Liebe Nutzerin, lieber Nutzer, {"\n"}
              {"\n"}Du hast einen Bug/Fehler in der App gefunden? {"\n"}Du hast
              Ideen für neue Features? {"\n"}Du möchstest mir ein Feedback
              geben? {"\n"}Oder du hast eine Frage? {"\n"}
              {"\n"}Dann melde dich doch gerne über eine der folgenden
              Kommunikationsplattformen und hilf aktiv mit, die App
              weiterzuentwicklen!{"\n"}
              {"\n"}
              -Discord: https://discord.gg/deftTGQzb2 {"\n"}
              -E-Mail: codingfactoryt@gmail.com
              {"\n"}
              {"\n"}Ich freue mich auf Deine Anfrage! {"\n"}
              {"\n"}-Tim B., Entwickler
            </Text>
            <View style={{ justifyContent: "flex-end", marginTop: 10 }}>
              <Button
                title="Alles klar!"
                onPress={() => {
                  setContactPopupVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  bottomButtonsStyle: {
    flexDirection: "row",
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    backgroundColor: DefaultColors.lightBlue,
    flexDirection: "row",
  },
  button: {
    backgroundColor: DefaultColors.lightBlue,
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
  },
  bottomButton: {
    height: "80%",
    borderRadius: 20,
    flex: 1,
    backgroundColor: "#FFC24C",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  personalizedSubstitutionPlanDescription: {
    color: DefaultColors.white,
    margin: 10,
    fontSize: 20,
  },
  personalizedSubstitutionPlanSwitch: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    color: DefaultColors.black,
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 10,
  },
});

function personalizeSubstitutionPlanEntries(
  timetable,
  substitutionPlanEntries,
  sid
) {
  let teachers = new Set();
  if (sid === "DEMO") {
    teachers.add("DTO");
    teachers.add("BKL");
    teachers.add("RSM");
  } else {
    for (let row = 0; row < timetable.length; row++) {
      //start at second column because first column is only description

      for (let column = 1; column < timetable[row].length; column++) {
        const lesson = timetable[row][column];
        if (lesson !== "") {
          const teacher = lesson.split(" ")[2];
          teachers.add(teacher);
        }
      }
    }
  }

  let filteredEntries: ISubstitutionPlanEntry[] = [];
  substitutionPlanEntries.forEach((element: ISubstitutionPlanEntry) => {
    if (teachers.has(element.originalTeacher)) {
      filteredEntries.push(element);
    }
  });
  return filteredEntries;
}
