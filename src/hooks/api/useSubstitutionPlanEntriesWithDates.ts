import React, { useState, useEffect, useContext } from 'react';
import ISubstitutionPlanEntry from '../../interfaces/SchulportalData/ISubstitutionPlanEntry';
import axios from 'axios';
import parseSubstitutionPlanHTML from '../../services/parsing/apiHTMLResponse/parseSubstitutionPlanHTML';
import { SIDContext } from '../../contexts/Contexts';

export function useSubstitutionPlanEntriesWithDates() {
    const [firstDate, setFirstDate] = useState("");
    const [secondDate, setSecondDate] = useState("");
    const [substitutionPlanEntriesOfFirstDate, setSubstitutionPlanEntriesOfFirstDate] = useState<ISubstitutionPlanEntry[]>([]);
    const [substitutionPlanEntriesOfSecondDate, setSubstitutionPlanEntriesOfSecondDate] = useState<ISubstitutionPlanEntry[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [sid] = useContext(SIDContext);
    useEffect(() => {
        if(sid === "DEMO") {
            setFirstDate("   Montag, \n02.01.2023");
            setSecondDate("   Dienstag, \n03.01.2023");
            setSubstitutionPlanEntriesOfFirstDate([{
                description: "DEMO 1",
                lesson: "1 - 2",
                class: "G10a, G10b",
                substitutionTeacher: "DTO",
                originalTeacher: "DTO",
                type: "Entfall",
                substitutionSubject: "Deutsch1",
                originalSubject: "Deutsch1",
                substitutionRoom: "102",
                originalRoom: "102",
                notice: "fällt aus"
            }, {
                description: "DEMO 2",
                lesson: "5",
                class: "G10c",
                substitutionTeacher: "JAG",
                originalTeacher: "LAP",
                type: "Raumvertretung",
                substitutionSubject: "Mathematik2",
                originalSubject: "Mathematik2",
                substitutionRoom: "572",
                originalRoom: "491",
                notice: ""
            },{
                description: "DEMO 3",
                lesson: "8",
                class: "G10a",
                substitutionTeacher: "LSH",
                originalTeacher: "LSH",
                type: "Entfall",
                substitutionSubject: "Geschichte1",
                originalSubject: "Geschichte1",
                substitutionRoom: "105",
                originalRoom: "105",
                notice: "fällt aus"
              }]);
              setSubstitutionPlanEntriesOfSecondDate([{
                description: "DEMO 4",
                lesson: "7 - 8",
                class: "G10a, G10b, G10c",
                substitutionTeacher: "HUG",
                originalTeacher: "BKL",
                type: "Vertretung",
                substitutionSubject: "Chemie1",
                originalSubject: "Chemie1",
                substitutionRoom: "309",
                originalRoom: "301",
                notice: ""
              },
              {
                description: "DEMO 5",
                lesson: "9 - 10",
                class: "G10b",
                substitutionTeacher: "RSM",
                originalTeacher: "RSM",
                type: "Entfall",
                substitutionSubject: "Biologie1",
                originalSubject: "Biologie1",
                substitutionRoom: "202",
                originalRoom: "202",
                notice: "fällt aus"
              },
              {
                description: "DEMO 6",
                lesson: "11 - 12",
                class: "G10a, G10d",
                substitutionTeacher: "JFK",
                originalTeacher: "JFK",
                type: "Raumvertretung",
                substitutionSubject: "Englisch1",
                originalSubject: "Englisch1",
                substitutionRoom: "405",
                originalRoom: "205",
                notice: ""
              }]);
            setLoading(false);
        } else {
            fetchSubstitutionPlanHTML(sid)
                .then((response) => {
                    const vertretungsplanHTML = response.data;
                    const datesWithValues = parseSubstitutionPlanHTML(vertretungsplanHTML);
                    setFirstDate(datesWithValues.firstDateValues.date);
                    setSubstitutionPlanEntriesOfFirstDate([...datesWithValues.firstDateValues.vertretungsplanEntries]);
                    setSecondDate(datesWithValues.secondDateValues.date);
                    setSubstitutionPlanEntriesOfSecondDate([...datesWithValues.secondDateValues.vertretungsplanEntries]);
                    setLoading(false);                 
                })
                .catch((error: string) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    }, [sid]);

    return [ firstDate, substitutionPlanEntriesOfFirstDate, secondDate, substitutionPlanEntriesOfSecondDate, isLoading ];
}

function fetchSubstitutionPlanHTML(sid: string) {  
    if(!sid) {
      console.error("Sid is not set, which means that the user isn´t properly logged in.");
    }

    const vertretungsplanHTMLRequest = axios.get('https://start.schulportal.hessen.de/vertretungsplan.php', {
        headers: {
            'Cookie': 'sid=' + sid,
        },
        withCredentials: false  //if the credentials are sent in the Credential header and not the Cookie header, the server will respond with an error
    });
      
    return vertretungsplanHTMLRequest;
}