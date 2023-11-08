import React, { useState, useEffect, useContext } from 'react';
import IUserData from '../../interfaces/SchulportalData/IUserData';
import axios from 'axios';
import parseUserDataHTML from '../../services/parsing/apiHTMLResponse/parseUserDataHTML';
import { SIDContext } from '../../contexts/Contexts';
import parseSchoolsWithIdsHTML from '../../services/parsing/apiHTMLResponse/parseSchoolsWithIdsHTML';

export function useSchoolsWithIds() {
    const [schoolsWithIds, setSchoolsWithIds] = useState([]);
    
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('https://startcache.schulportal.hessen.de/exporteur.php?a=schoollist');
                const newSchoolsWithIds = parseSchoolsWithIdsHTML(response.data);
                setSchoolsWithIds(newSchoolsWithIds);   //takes really long
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