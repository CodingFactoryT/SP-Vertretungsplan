import React from 'react';

interface SchoolWithIDEntry {
    schoolName: string,
    schoolID: number
}

export default function parseSchoolsWithIdsHTML(schoolsWithIdsJSON: []) {
    const schoolsWithIDs = [].concat(...schoolsWithIdsJSON.map((schoolDistrict: object) => {
        return schoolDistrict.Schulen.map((school: object) => {
            return {schoolDistrict: schoolDistrict.Name, schoolName: school.Name, schoolID: school.Id};
        });
    }));
    const sortedSchoolsWithIDs = schoolsWithIDs.sort((a, b) => a.schoolName.localeCompare(b.schoolName, undefined, {sensitivity: "base"}));
    return sortedSchoolsWithIDs;
}