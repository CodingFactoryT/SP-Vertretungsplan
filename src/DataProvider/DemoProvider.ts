export default {
  firstDate: "   Montag, \n02.01.2023",

  secondDate: "   Dienstag, \n03.01.2023",

  userData: ["DEMO", "DEMO", "DEMO", "01.01.2000", "10", "10a", "DEMO"],

  teachersWithSubjects: ["DTO/D", "BKL/C", "RSM/B"],

  firstDateSubstitutionPlanEntries: [{
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
  }, {
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
  }],

  secondDateSubstitutionPlanEntries: [{
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
  }]
};
