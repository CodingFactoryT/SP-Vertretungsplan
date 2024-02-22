const DOMParser = require("react-native-html-parser");

export default function parseHTMLTableBody(tableJSONData): string[][] {
    const tableData: string[][] = [];
    const tableRows = tableJSONData.getElementsByTagName("tr");
    
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