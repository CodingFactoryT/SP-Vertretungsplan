import React from 'react';

type School = {
    Id: string,
    Name: string,
    Ort: string
}

type SchoolDistrict = {
    Id: string,
    Name: string, 
    Schulen: School[]
}

type SchoolEntry = {
    schoolDistrict: string,
    schoolName: string,
    schoolID: string
}

export default function parseSchoolsWithIdsHTML(schoolsWithIdsJSON: []) {
    const schoolsWithIDs = ([] as SchoolEntry[]).concat(...schoolsWithIdsJSON.map((schoolDistrict: SchoolDistrict) => {
        return schoolDistrict.Schulen.map((school: School) => {
            return {schoolDistrict: schoolDistrict.Name, schoolName: school.Name, schoolID: school.Id} as SchoolEntry;
        });
    }));
    const sortedSchoolsWithIDs = schoolsWithIDs.sort((a, b) => a.schoolName.localeCompare(b.schoolName, undefined, {sensitivity: "base"}));
    return sortedSchoolsWithIDs;
}