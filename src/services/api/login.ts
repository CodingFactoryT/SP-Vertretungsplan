import React, { useContext } from 'react';
import axios from "axios";
import { SIDContext } from '../../contexts/Contexts';

export async function login(schoolID: string, username: string, password: string) {
    let returnedSID = ""; //as the normal sid is async, the sid has to be returned with the correct value in order to ensure that it is set correctly at login
    let schoolIDError: number = 0;
    let usernameError: number = 0;
    let passwordError: number = 0;

    if(username === "DEMO" && password === "DEMO") {
        returnedSID = "DEMO";
        return [-1, -1, -1, "DEMO"];
    }

    if(!username) {    //check for incomplete user input, ! checks for empty steings, null, undefined, false, 0 and NaN
        usernameError = 1;
    }
    if(!password) {
        passwordError = 1;
    }
    if(!schoolID) {
        schoolIDError = 1;
    }

    if(schoolIDError || usernameError || passwordError) {   //check if any error has a value besides 0
        return [schoolIDError, usernameError, passwordError, ""];
    }

    try {
        const fetchSPHSessionCookieResponse = await fetchSPHSessionCookie(schoolID, username, password)
        const setCookies = fetchSPHSessionCookieResponse.headers["set-cookie"]!.toString();
        const sphSessionCookie = setCookies.substring(setCookies.indexOf('=') + 1, setCookies.indexOf(";"));

        if(sphSessionCookie) {  //if there is a session-cookie
            try {
                const fetchSIDResponse = await fetchSID(sphSessionCookie)
                const setCookies = fetchSIDResponse.headers["set-cookie"]!.toString();
                const trimmedToSIDSetCookies = setCookies.substring(setCookies.indexOf("sid=") + 4, setCookies.length);
                returnedSID = trimmedToSIDSetCookies.substring(0, trimmedToSIDSetCookies.indexOf(";")) //set the sid the Schulportal server responded with. The user is logged in now
            }
            catch(err: any) {
                console.log(err);
            }
        } else {       
            schoolIDError = 4;
            usernameError = 4;
            passwordError = 4;
        }
    } catch(err: any) {
        if(err.toString() === "AxiosError: Request failed with status code 401") {
            schoolIDError = 2;
            usernameError = 2;
            passwordError = 2;
        } else {
            schoolIDError = 3;
            usernameError = 3;
            passwordError = 3;
        }
    }

    return [schoolIDError, usernameError, passwordError, returnedSID];
}


async function fetchSPHSessionCookie(schoolID: string, username: string, password: string) {
    const requestBody = `user=${schoolID}.${username}&password=${encodeURIComponent(password)}`;
    const sphSessionRequest = await axios.post('https://login.schulportal.hessen.de', requestBody, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: false  //the credentials are sent in the body, if they are sent in the header, the server will respond with an error
    });

    return sphSessionRequest;
}

async function fetchSID(sphSession: string) {
    const sidRequest = await axios.get('https://connect.schulportal.hessen.de', {
        headers: {
            'Cookie': 'SPH-Session=' + sphSession,
        },
        withCredentials: false  //the credentials are sent in the Cookie header, if they are sent in the Credential header, the server will respond with an error
    });
      
  return sidRequest;
}
