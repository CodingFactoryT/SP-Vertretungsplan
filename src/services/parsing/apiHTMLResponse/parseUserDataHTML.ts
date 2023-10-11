import IUserData from "../../../interfaces/SchulportalData/IUserData";
import parseHTMLTableBody from "../../parseHTMLTableBody";

export default function parseUserDataHTML(userDataHTML: string) {
    const userDataTable = userDataHTML.substring(
        userDataHTML.indexOf("<tbody>"),
        userDataHTML.indexOf("</tbody>") + "</tbody>".length + 1
    );
    const tableData = parseHTMLTableBody(userDataTable);

    return [tableData[0][1], tableData[1][1], tableData[2][1], tableData[3][1], tableData[4][1], tableData[5][1], tableData[6][1]];
}