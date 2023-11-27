import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import parseTimetableHTML from '../parsing/apiHTMLResponse/parseTimetableHTML';
import { SIDContext } from '../../contexts/Contexts';

export async function fetchTimetable(sid: string) {
    let timetable = {};

    if(!sid) {
        console.error("sid is not set, which means that the user isn't properly logged in.\nPlease remember calling useLogin() before fetching any data!");
        return;
    }
    
    try {
        const response = await axios.get('https://start.schulportal.hessen.de/stundenplan.php', {
            headers: {
                'Cookie': 'sid=' + sid,
            },
            withCredentials: false
        });
        timetable = parseTimetableHTML(response.data);
    } catch(error) {
        console.error(error);
    }
    
    return timetable;
}