import React, { useState, useEffect, useContext } from "react";
import { Switch } from "react-native";

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DefaultColors from "../../styles/DefaultColors";
import SubstitutionPlanEntry from "./components/SubstitutionPlanEntry";
import { fetchUserData } from "../../services/api/fetchUserData";
import { fetchSubstitutionPlanEntriesWithDates } from "../../services/api/fetchSubstitutionPlanEntriesWithDates";
import ISubstitutionPlanEntry from "../../interfaces/SchulportalData/ISubstitutionPlanEntry";
import ThemedScreen from "../ThemedScreen/ThemedScreen";
import { SIDContext, ThemeContext } from "../../contexts/Contexts";
import LoadingComponent from "../../components/LoadingComponent";
import NoSubstitutionsEntry from "./components/NoSubstitutionsEntry";
import { fetchTimetable } from "../../services/api/fetchTimetable";
import useAsyncStorage from "../../hooks/useAsyncStorage";
import { getTeachersWithSubjects } from "../../services/parsing/getTeachersWithSubjects";
import BasicModal from "../../components/BasicModal";
import StorageProvider from "../../DataProvider/StorageProvider";

enum SubstitutionSelection {
	FIRST,
	SECOND,
}

type SubstitutionDayBundle = {
	date: string;
	entries: ISubstitutionPlanEntry[];
};

type Substitutions = {
	first: SubstitutionDayBundle;
	second: SubstitutionDayBundle;
};

export default function SubstitutionPlanScreen() {
	const [isDonatePopupVisible, setDonatePopupVisible] = useState(false);
	const [isContactPopupVisible, setContactPopupVisible] = useState(false);

	const [substitutions, setSubstitutions] = useState<Substitutions>();
	const [displayedEntries, setDisplayedEntries] = useState<ISubstitutionPlanEntry[]>();
	const [areSubsitutionsPersonalized, setSubstitutionsPersonalized] = useState(false);
	const [selectedSubstitutions, setSelectedSubstitutions] = useState<SubstitutionSelection>(SubstitutionSelection.FIRST);

	const { sid } = useContext(SIDContext);
	const [class_, setClass] = useState("?");
	const [isScreenLoading, setScreenLoading] = useState(true);

	const [userData, isUserDataLoading] = fetchUserData(sid);

	const [firstDate, substitutionPlanEntriesOfFirstDate, secondDate, substitutionPlanEntriesOfSecondDate, areSubstitutionPlanEntriesLoading] = fetchSubstitutionPlanEntriesWithDates();

	const [timetable, setTimetable] = useState([[]]);

	useEffect(() => {
		if (!isUserDataLoading) {
			setClass(userData.class === "" ? "?" : userData.class);
		}

		if (!areSubstitutionPlanEntriesLoading) {
			setSubstitutions({
				first: {
					date: firstDate,
					entries: substitutionPlanEntriesOfFirstDate,
				},
				second: {
					date: secondDate,
					entries: substitutionPlanEntriesOfSecondDate,
				},
			});
			setDisplayedEntries(substitutionPlanEntriesOfFirstDate);
			setScreenLoading(false);
		}
	}, [areSubstitutionPlanEntriesLoading, isUserDataLoading]);

	useEffect(() => {
		fetchTimetable(sid).then((retrievedTimetable) => {
			setTimetable([...retrievedTimetable]);
		});
	}, []);

	const [isInitialTimetableChange, setInitialTimetableChange] = useState(true);
	const { getStoredSubstitutionPlanPersonalized, storeSubstitutionPlanPersonalized } = StorageProvider();

	useEffect(() => {
		if (isInitialTimetableChange) {
			setInitialTimetableChange(false);
			return;
		}
		getStoredSubstitutionPlanPersonalized().then((isSubstitutionPlanPersonalized) => {
			if (isSubstitutionPlanPersonalized === "true") {
				setSubstitutionsPersonalized(false);
				togglePersonalizedSubstitutionPlan();
			}
		});
	}, [timetable]);

	function togglePersonalizedSubstitutionPlan() {
		if (!areSubsitutionsPersonalized) {
			storeSubstitutionPlanPersonalized(true);
			const filteredEntries = personalizeSubstitutionPlanEntries(timetable, displayedEntries, sid);

			setDisplayedEntries([...filteredEntries]);
		} else {
			storeSubstitutionPlanPersonalized(false);
			if (selectedSubstitutions === SubstitutionSelection.FIRST) {
				setDisplayedEntries([...substitutions.first.entries]);
			} else {
				setDisplayedEntries([...substitutions.second.entries]);
			}
		}

		setSubstitutionsPersonalized((previousState) => !previousState);
	}

	const { theme, fontColor } = useContext(ThemeContext);

	const modalBackgroundColor = theme === "light" ? DefaultColors.lightThemedSecondBackground : DefaultColors.darkThemedSecondBackground;

	useEffect(() => {
		let newEntries = substitutions?.first.entries;
		if (selectedSubstitutions === SubstitutionSelection.SECOND) {
			newEntries = substitutions?.second.entries;
		}

		if (areSubsitutionsPersonalized) {
			newEntries = personalizeSubstitutionPlanEntries(timetable, newEntries, sid);
		}

		setDisplayedEntries(newEntries);
	}, [selectedSubstitutions, areSubsitutionsPersonalized]);

	if (isScreenLoading) {
		return <LoadingComponent />;
	}

	return (
		<ThemedScreen>
			<View style={styles.container}>
				<Text style={[styles.title, { color: fontColor }]}>{class_}-Vertretungsplan</Text>
				<View style={styles.buttonContainer}>
					{firstDate !== "---" && (
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								setSelectedSubstitutions(SubstitutionSelection.FIRST);
							}}
						>
							<Text style={{ textAlign: "center" }}>{substitutions.first.date}</Text>
						</TouchableOpacity>
					)}
					{secondDate !== "---" && (
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								setSelectedSubstitutions(SubstitutionSelection.SECOND);
							}}
						>
							<Text style={{ textAlign: "center" }}>{substitutions.second.date}</Text>
						</TouchableOpacity>
					)}
				</View>
				<ScrollView>{displayedEntries.length === 0 ? <NoSubstitutionsEntry /> : displayedEntries.map((item) => <SubstitutionPlanEntry {...item} key={item.lesson + item.originalRoom + item.originalTeacher} />)}</ScrollView>
				<View style={styles.bottomBar}>
					<TouchableOpacity style={styles.personalizedSubstitutionPlanSwitch} onPress={togglePersonalizedSubstitutionPlan} activeOpacity={1}>
						<Text style={styles.personalizedSubstitutionPlanDescription}>Personalisierter V-Plan</Text>
						<Switch
							style={styles.personalizedSubstitutionPlanSwitch}
							onValueChange={(isSwitchOn) => togglePersonalizedSubstitutionPlan()}
							value={areSubsitutionsPersonalized}
							thumbColor={areSubsitutionsPersonalized ? "#0061FF" : "white"}
							trackColor={{
								true: "#0088FF",
								false: "#ababab",
							}}
						></Switch>
					</TouchableOpacity>
				</View>
				<View style={styles.bottomButtonsStyle}>
					<TouchableOpacity style={styles.bottomButton} onPress={() => setDonatePopupVisible(true)}>
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
							<Text style={{ fontSize: 18, color: "#009EDB", fontWeight: "500" }}>den</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.bottomButton} onPress={() => setContactPopupVisible(true)}>
						<Text style={{ fontSize: 18, fontWeight: "400" }}>Kontakt</Text>
					</TouchableOpacity>
				</View>
			</View>
			<BasicModal visible={isDonatePopupVisible} onRequestClose={() => setDonatePopupVisible(false)} onButtonPress={() => setDonatePopupVisible(false)} textFontColor={fontColor} modalBackgroundColor={modalBackgroundColor} buttonTitle="Alles klar!" text={"Liebe Nutzerin, lieber Nutzer, \n\ndie Erstellung einer solchen App benötigt viel Zeit und Arbeit. \nUm die App in Zukunft weiter entwicklen zu können und neue Features einzubauen, wäre es super, wenn du mir eine kleine Spende über PayPal hinterlassen würdest:\n\nPayPal-Adresse: codingt.paypal@gmail.com \n\nVielen Dank für Deine Unterstützung! \n\n-Tim B., Entwickler"} />
			<BasicModal visible={isContactPopupVisible} onRequestClose={() => setContactPopupVisible(false)} onButtonPress={() => setContactPopupVisible(false)} textFontColor={fontColor} modalBackgroundColor={modalBackgroundColor} buttonTitle="Alles klar!" text={"Liebe Nutzerin, lieber Nutzer, \n\nDu hast einen Bug/Fehler in der App gefunden? \nDu hast Ideen für neue Features? \nDu möchstest mir ein Feedback geben? \nOder du hast eine Frage? \n \nDann melde dich doch gerne über eine der folgenden Kommunikationsplattformen und hilf aktiv mit, die App weiterzuentwicklen!\n\n-Discord: https://discord.gg/deftTGQzb2 \n-E-Mail: codingfactoryt@gmail.com\n\nIch freue mich auf Deine Anfrage! \n\n-Tim B., Entwickler"} />
		</ThemedScreen>
	);
}

const styles = StyleSheet.create({
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
		flexDirection: "row",
	},
	title: {
		fontSize: 28,
		color: DefaultColors.black,
		marginTop: 30,
		marginLeft: 10,
		marginBottom: 10,
	},
});

function personalizeSubstitutionPlanEntries(timetable, substitutionPlanEntries: ISubstitutionPlanEntry[], sid: string) {
	const teachersWithSubjects = getTeachersWithSubjects(sid, timetable);
	const filteredEntries = substitutionPlanEntries.filter((element) => {
		return teachersWithSubjects.has(`${element.originalTeacher}/${element.originalSubject[0]}`);
	});
	return filteredEntries;
}
