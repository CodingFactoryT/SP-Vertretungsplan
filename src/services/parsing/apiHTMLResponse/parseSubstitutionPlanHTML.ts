import ISubstitutionPlanEntry from "../../../interfaces/SchulportalData/ISubstitutionPlanEntry";
import striptags from "striptags";
import parseHTMLTableBody from "../../parseHTMLTableBody";
const DOMParser = require("react-native-html-parser");

const WEEKDAYS = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

export default function parseSubstitutionPlanHTML(vertretungsplanHTML: string) {
  let firstDateFound = false;
  let dates: string[{original, formattedForDisplay, formattedForDate}] = [];
  let index = 0;
  const DATE_ID_IDENTIFIER = "id=\"tag"
  while((index = vertretungsplanHTML.indexOf(DATE_ID_IDENTIFIER)) !== -1) {
    const startingIndex = index + DATE_ID_IDENTIFIER.length;
    const endingIndex = vertretungsplanHTML.indexOf("\"", startingIndex);
    const date = vertretungsplanHTML.substring(startingIndex, endingIndex);

    const dateFractions = /([0-9]+)_([0-9]+)_([0-9]+)/.exec(date);
    const formattedForDate = `${dateFractions[3]}-${dateFractions[2]}-${dateFractions[1]}`;

    const formattedForDisplay = WEEKDAYS[new Date(formattedForDate).getDay()] + ",\n" + date.replaceAll("_", ".");

    dates.push({original: date, formattedForDisplay: formattedForDisplay, formattedForDate: formattedForDate});

    vertretungsplanHTML = vertretungsplanHTML.replaceAll(DATE_ID_IDENTIFIER + date + "\"", "");
  }

  switch(dates.length) {
    case 0:
      console.log("No date was found, which means that none of the substitution plans can be loaded!");
      break;
    case 1:
      console.log("Only one date was found, which means that only one of the substitution plans can be loaded!");
      break;
    case 2:
      console.log("All dates were found, which means that the substitution plans will be displayed correctly!");
      break;
    default:
      console.log("All dates were found, but there are more available!");
  }


  const parser = new DOMParser.DOMParser();
  const document = parser.parseFromString(vertretungsplanHTML, "text/html");

  let firstDateEntries: ISubstitutionPlanEntry[] = [];
  let secondDateEntries: ISubstitutionPlanEntry[] = [];

  if(dates.length >= 2) {
    const firstDateVetretungen = parseHTMLTableBody(document.getElementById(`vtable${dates[0].original}`));
    firstDateEntries = parseSubstitutionPlanEntriesTable(firstDateVetretungen);
    const secondDateVetretungen = parseHTMLTableBody(document.getElementById(`vtable${dates[1].original}`));
    secondDateEntries = parseSubstitutionPlanEntriesTable(secondDateVetretungen);
  } else if(dates.length >= 1) {
    const firstDateVertretungen = parseHTMLTableBody(document.getElementById(`vtable${dates[0].original}`));
    dates[0].formattedForDisplay = dates[0].formattedForDisplay.replaceAll("\n", " ");
    firstDateEntries = parseSubstitutionPlanEntriesTable(firstDateVertretungen);
    dates.push({original: null, formattedForDisplay: null, formattedForDate: null});
  } else {
    dates.push({original: null, formattedForDisplay: null, formattedForDate: null});
    dates.push({original: null, formattedForDisplay: null, formattedForDate: null});
  }

  return {
    firstDateValues: {
      date: dates[0].formattedForDisplay,
      vertretungsplanEntries: firstDateEntries,
    },
    secondDateValues: {
      date: dates[1].formattedForDisplay,
      vertretungsplanEntries: secondDateEntries,
    },
  };
}

function parseSubstitutionPlanEntriesTable(vertretungsTableData) {
  const entries: ISubstitutionPlanEntry[] = [];
  vertretungsTableData.forEach((substitutionEntry, index) => {
    if(index === 0) {   //header of the table
      return;
    }

    if (substitutionEntry.length !== 1) {  //if the length of the array is one, only the error that no substitutions are available is contained in the array
      entries.push({
        description: generateDescription(substitutionEntry),
        lesson: substitutionEntry[1],
        class: substitutionEntry[2],
        substitutionTeacher: substitutionEntry[3],
        originalTeacher: substitutionEntry[4],
        type: substitutionEntry[5],
        substitutionSubject: substitutionEntry[6],
        originalSubject: substitutionEntry[7],
        substitutionRoom: substitutionEntry[8],
        originalRoom: substitutionEntry[9],
        notice: substitutionEntry[10],
      });
    }
  })

  return entries;
}

function generateDescription(entry: string[]) {
  return `${entry[1]},${entry[2]},${entry[2]},${entry[3]},${entry[4]},${entry[5]},${entry[6]},${entry[7]},${entry[8]},${entry[9]},${entry[10]}` ;
}

function formatDate(date: string) {
  return date.replace(" den", "\n");
}