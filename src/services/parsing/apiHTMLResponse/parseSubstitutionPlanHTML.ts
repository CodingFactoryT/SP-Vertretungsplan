import ISubstitutionPlanEntry from "../../../interfaces/SchulportalData/ISubstitutionPlanEntry";
import striptags from "striptags";
import parseHTMLTableBody from "../../parseHTMLTableBody";
const DOMParser = require("react-native-html-parser");

export default function parseSubstitutionPlanHTML(vertretungsplanHTML: string) {
  let firstDateFound = false;

  vertretungsplanHTML = vertretungsplanHTML.replace(vertretungsplanHTML.substring(
    vertretungsplanHTML.indexOf("<tbody>"),
    vertretungsplanHTML.indexOf("</tbody>") + "</tbody>".length + 1
  ), "");

  const firstDateVertretungen = vertretungsplanHTML.substring(
    vertretungsplanHTML.indexOf("<tbody>"),
    vertretungsplanHTML.indexOf("</tbody>") + "</tbody>".length + 1
  );

  let cleanedHTML = vertretungsplanHTML.replace(firstDateVertretungen, "");

  cleanedHTML = cleanedHTML.replace(cleanedHTML.substring(
    cleanedHTML.indexOf("<tbody>"),
    cleanedHTML.indexOf("</tbody>") + "</tbody>".length + 1
  ), "");

  const secondDateVetretungen = cleanedHTML.substring(
    cleanedHTML.indexOf("<tbody>"),
    cleanedHTML.indexOf("</tbody") + "</tbody>".length + 1
  );

  let firstDateEntries: ISubstitutionPlanEntry[] = parseSubstitutionPlanEntriesTable(firstDateVertretungen);
  let secondDateEntries: ISubstitutionPlanEntry[] = parseSubstitutionPlanEntriesTable(secondDateVetretungen);

  const weekdays = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];

  let matches = striptags(vertretungsplanHTML).replace(/\s+/g, " ").matchAll(new RegExp(`(${weekdays.join("|")}),\\s+den\\s([\\d]{2}.[\\d]{2}.[\\d]{4})`, "g"));
  const firstDate = formatDate(matches.next().value[0]);
  const secondDate = formatDate(matches.next().value[0]);

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
    if (substitutionEntry.length !== 1) {  //if the length of the array is one, only the error that no substitutions are available is contained in the array
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
  if (vertretungsHTML.startsWith("<") && vertretungsHTML.endsWith(">")) {
    const parser = new DOMParser.DOMParser();
    const parsed = parser.parseFromString(vertretungsHTML, "text/html");
    const tableRows = parsed.getElementsByTagName("tr");
    for (let i = 0; i < tableRows.length; i++) {
      let row = tableRows[i];
      const description = striptags(row.childNodes[1].getAttribute("title").trim());  //description is contained in the title instead of the textContent

      descriptions.push(description);
    }
  }
  return descriptions;
}

function formatDate(date: string) {
  return date.replace(" den", "\n");
}