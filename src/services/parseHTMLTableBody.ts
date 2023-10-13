const DOMParser = require("react-native-html-parser");

export default function parseHTMLTableBody(tableBodyHTML: string): string[][] {
    tableBodyHTML = tableBodyHTML.trim();
    if(!tableBodyHTML.startsWith("<tbody") || !tableBodyHTML.endsWith("</tbody>")) {
        console.log("Table doesn't start with \"<tbody\" or doesn't end with \"</tbody>\"!");
        return [];
    }

    const tableData: string[][] = [];

    const parser = new DOMParser.DOMParser();
    const parsed = parser.parseFromString(tableBodyHTML, "text/html");
    const tableRows = parsed.getElementsByTagName("tr");
    for (let i = 0; i < tableRows.length; i++) {
        let row = tableRows[i];
        let rowData = [];

        for (let j = 0; j < row.childNodes.length; j++) {
            let cell = row.childNodes[j];
            if (cell.nodeType === 1) {
                // Only process element nodes
                rowData.push(cell.textContent.trim());
            }
        }
        tableData.push(rowData);
    }

    return tableData;
}