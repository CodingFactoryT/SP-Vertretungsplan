import React from 'react';
import parseHTMLTableBody from '../../parseHTMLTableBody';
const DOMParser = require("react-native-html-parser");


export default function parseTimetableHTML(timetableHTML: string) {
    const parser = new DOMParser.DOMParser();
    const document = parser.parseFromString(timetableHTML, "text/html");

    const tableData = parseHTMLTableBody(document.getElementsByTagName("table")[1]);    ;
    tableData.forEach((element, index) => {
        element.forEach((data, index2) => {
            tableData[index][index2] = data.replaceAll(new RegExp("[ \t\n]+", "g"), " ");
        });
    });
    return tableData;
}