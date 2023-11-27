import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parseSchoolsWithIdsHTML from '../parsing/apiHTMLResponse/parseSchoolsWithIdsHTML';

export function fetchSchoolsWithIDs() {
    type SchoolEntry = {
        schoolDistrict: string,
        schoolName: string,
        schoolID: string
    }

    const [schoolsWithIds, setSchoolsWithIds] = useState<SchoolEntry[]>([]);

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('https://startcache.schulportal.hessen.de/exporteur.php?a=schoollist');
                const newSchoolsWithIds = parseSchoolsWithIdsHTML(response.data);
                setSchoolsWithIds(newSchoolsWithIds);
            } catch(error) {
                console.error(error);
            }
        })();
    }, []);

    const [isInitialCall, setInitialCall] = useState(true);
    useEffect(() => {
        if(isInitialCall) {
            setInitialCall(false);
            return;
        }
        setLoading(false);
    }, [schoolsWithIds]);

    return {schoolsWithIds, isLoading};
}