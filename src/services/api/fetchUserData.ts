import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import parseUserDataHTML from '../parsing/apiHTMLResponse/parseUserDataHTML';

export function fetchUserData(sid: string) {
    const [userData, setUserData] = useState({
        username: "",
        lastName: "",
        firstName: "",
        birthDate: "",
        grade: "",
        class: "",
        gender: ""
    });
    
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if(!sid) {
            console.error("sid is not set, which means that the user isn't properly logged in.\nPlease remember calling useLogin() before fetching any data!");
        }
        axios.get('https://start.schulportal.hessen.de/benutzerverwaltung.php?a=userData', {
            headers: {
                'Cookie': 'sid=' + sid,
            },
            withCredentials: false
        }).then(response => {   //TODO: Fehler - Diese Funktion ist für diesen Account nicht freigeschaltet
            const userData = parseUserDataHTML(response.data, sid);
            setUserData({
                username: userData![0],
                lastName: userData![1],
                firstName: userData![2],
                birthDate: userData![3],
                grade: userData![4],
                class: userData![5],
                gender: userData![6],
            });
        }).catch(error => console.log(error));        
    }, [sid]);

    const [isInitialCall, setInitialCall] = useState(true);
    useEffect(() => {
        if(isInitialCall) {
            setInitialCall(false);
            return;
        }
        setLoading(false);
    }, [userData]);

    return [userData, isLoading];
}