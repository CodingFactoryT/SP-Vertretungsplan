import React from 'react';
import parseHTMLTableBody from '../../parseHTMLTableBody';


export default function parseTimetableHTML(timetableHTML: string) {
    timetableHTML = timetableHTML.replace("<tbody>", "").replace("</tbody>", "");
    
    const timetableTable = timetableHTML.substring(
        timetableHTML.indexOf("<tbody>"),
        timetableHTML.indexOf("</tbody>") + "</tbody>".length + 1
    );

    const tableData = parseHTMLTableBody(timetableTable);
    tableData.forEach((element, index) => {
        element.forEach((data, index2) => {
            tableData[index][index2] = data.replaceAll(new RegExp("[ \t\n]+", "g"), " ");
        });
    });
    
    return tableData;
}