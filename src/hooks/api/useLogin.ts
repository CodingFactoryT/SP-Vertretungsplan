import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { SIDContext } from '../../contexts/Contexts';

export function useLogin() {
    const [sid, setSid] = useContext(SIDContext);
    let returnedSID = ""; //as the normal sid is async, the sid has to be returned with the correct value in order to ensure that it is set correctly at login

    async function login (schoolID: number, username: string, password: string) {
        let error = "";

        if(username === "" && password !== "") {    //check for incomplete user input
            error = "Missing Username!";
            return [error, ""];
        }
        if(username !== "" && password === "") {
            error = "Missing Password!";
            return [error, ""]
        }
        if(username === "" && password === "") {
            error = "Missing Username and Password!";
            return [error, ""]
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
                    const newSid = trimmedToSIDSetCookies.substring(0, trimmedToSIDSetCookies.indexOf(";"))
                    setSid(newSid); //set the sid the Schulportal server responded with. The user is logged in now
                    returnedSID = newSid;
                    console.log("Logged in: " + newSid);
                }
                catch(err: any) {
                    error = err;
                }
            } else {       
                error = "SPH-Session Cookie was not properly set!";
            }
        } catch(err: any) {
            if(err.toString() === "AxiosError: Request failed with status code 401") {
                error = "Invalid SchoolID, Username or Password!";
            } else {
                error = err;
            }
        }

        return [error, returnedSID];
    }

    return [ login ];
}

async function fetchSPHSessionCookie(schoolID: number, username: string, password: string) {
    const requestBody = `user=${schoolID}.${username}&password=${password}`;

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
