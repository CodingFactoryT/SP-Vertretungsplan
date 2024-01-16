import React, { useState, useEffect, useContext } from 'react';
import ISubstitutionPlanEntry from '../../interfaces/SchulportalData/ISubstitutionPlanEntry';
import axios from 'axios';
import parseSubstitutionPlanHTML from '../parsing/apiHTMLResponse/parseSubstitutionPlanHTML';
import { SIDContext } from '../../contexts/Contexts';
import DemoProvider from '../../DataProvider/DemoProvider';

export function fetchSubstitutionPlanEntriesWithDates() {
    const [firstDate, setFirstDate] = useState("");
    const [secondDate, setSecondDate] = useState("");
    const [substitutionPlanEntriesOfFirstDate, setSubstitutionPlanEntriesOfFirstDate] = useState<ISubstitutionPlanEntry[]>([]);
    const [substitutionPlanEntriesOfSecondDate, setSubstitutionPlanEntriesOfSecondDate] = useState<ISubstitutionPlanEntry[]>([]);
    const [isLoading, setLoading] = useState(true);
    const { sid } = useContext(SIDContext);

    useEffect(() => {
        if (sid === "DEMO") {
            setFirstDate(DemoProvider.firstDate);
            setSecondDate(DemoProvider.secondDate);
            setSubstitutionPlanEntriesOfFirstDate(DemoProvider.firstDateSubstitutionPlanEntries);
            setSubstitutionPlanEntriesOfSecondDate(DemoProvider.secondDateSubstitutionPlanEntries);
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

    return [firstDate, substitutionPlanEntriesOfFirstDate, secondDate, substitutionPlanEntriesOfSecondDate, isLoading];
}

function fetchSubstitutionPlanHTML(sid: string) {
    if (!sid) {
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