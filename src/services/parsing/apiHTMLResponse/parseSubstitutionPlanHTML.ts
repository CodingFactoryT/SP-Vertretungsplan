import ISubstitutionPlanEntry from "../../../interfaces/SchulportalData/ISubstitutionPlanEntry";
import striptags from "striptags";
import parseHTMLTableBody from "../../parseHTMLTableBody";
const DOMParser = require("react-native-html-parser");

export default function parseSubstitutionPlanHTML(vertretungsplanHTML: string) {
  let firstDate = "";
  let secondDate = "";

  let firstDateFound = false;

  const firstDateVertretungen = vertretungsplanHTML.substring(
    vertretungsplanHTML.indexOf("<tbody>"),
    vertretungsplanHTML.indexOf("</tbody>") + "</tbody>".length + 1
  );

  const cleanedHTML = vertretungsplanHTML.replace(firstDateVertretungen, "");
  
  const secondDateVetretungen = cleanedHTML.substring(
    cleanedHTML.indexOf("<tbody>"),
    cleanedHTML.indexOf("</tbody") + "</tbody>".length + 1
  );

  const firstDateEntries: ISubstitutionPlanEntry[] = parseSubstitutionPlanEntriesTable(firstDateVertretungen);
  const secondDateEntries: ISubstitutionPlanEntry[] = parseSubstitutionPlanEntriesTable(secondDateVetretungen);
  
  const weekdays = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];
  weekdays.forEach((weekday) => {
    let index = -1;
    if ((index = striptags(vertretungsplanHTML).indexOf(weekday)) !== -1) {
      const halfParsedDate = striptags(vertretungsplanHTML)
        .substring(index, index + weekday.length + 98)
        .replace("den", "");
      const date = "   " + halfParsedDate.substring(0, halfParsedDate.indexOf(".") + 8).replaceAll(" ", "");
      if (!firstDateFound) {
        firstDate = date;
        firstDateFound = true;
      } else {
        secondDate = date;
      }
    }
  });

  if(firstDate.includes("Montag") && secondDate.includes("Freitag")) {
    const secondDateTemp = secondDate;
    secondDate = firstDate;
    firstDate = secondDateTemp;
  }

  return {
    firstDateValues: {
      date: firstDate,
      vertretungsplanEntries: firstDateEntries,
    },
    secondDateValues: {
      date: secondDate,
      vertretungsplanEntries: secondDateEntries,
    },
  };
}

function parseSubstitutionPlanEntriesTable(vertretungsHTML: string) {
  const entries: ISubstitutionPlanEntry[] = [];
  const tableData = parseHTMLTableBody(vertretungsHTML);
  const descriptions = getDescriptions(vertretungsHTML);
  
  tableData.forEach((substitutionEntry, index) => {
    if(substitutionEntry.length !== 1) {  //if the length of the array is one, only the error that no substitutions are available is contained in the array
      entries.push({
        description: descriptions[index],
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

function getDescriptions(vertretungsHTML: string) {
  const descriptions = [];

  const parser = new DOMParser.DOMParser();
  const parsed = parser.parseFromString(vertretungsHTML, "text/html");
  const tableRows = parsed.getElementsByTagName("tr");
  for (let i = 0; i < tableRows.length; i++) {
    let row = tableRows[i];
    const description = striptags(row.childNodes[1].getAttribute("title").trim());  //description is contained in the title instead of the textContent
    
    descriptions.push(description);
  }

  return descriptions;
}