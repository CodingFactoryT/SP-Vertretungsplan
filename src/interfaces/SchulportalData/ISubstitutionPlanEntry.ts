export default interface ISubstitutionPlanEntry { 
    description: string, //combines every information in one string
    lesson: string, //the lesson when this substitution takes place, e.g. "1", "3-4" or "10-11"
    class: string, //the class that the substitution applies to, e.g. "G9d" or "Q2a,Q2b,Q2c"
    substitutionTeacher: string, //abbreviation of the substitution teacher
    originalTeacher: string, //abbreviation of the original teacher
    type: string, //e.g. "Entfall", "Vertretung", ...
    substitutionSubject: string,
    originalSubject: string,
    substitutionRoom: string,
    originalRoom: string,
    notice: string, //e.g. "fällt aus"
}