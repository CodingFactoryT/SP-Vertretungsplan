import parseHTMLTableBody from "../../parseHTMLTableBody";
import DemoProvider from "../../../DataProvider/DemoProvider";
const DOMParser = require("react-native-html-parser");

export default function parseUserDataHTML(userDataHTML: string, sid: string) {
    if(sid === "DEMO") {
        return DemoProvider.userData;
    }
    const parser = new DOMParser.DOMParser();
    const document = parser.parseFromString(userDataHTML, "text/html");
    
    const tableData = parseHTMLTableBody(document.getElementsByTagName("table")[0]);

    return [tableData[0][1], tableData[1][1], tableData[2][1], tableData[3][1], tableData[4][1], tableData[5][1], tableData[6][1]];
}