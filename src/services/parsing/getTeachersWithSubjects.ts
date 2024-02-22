import DemoProvider from "../../DataProvider/DemoProvider";

export function getTeachersWithSubjects(sid: string, timetable) {
  let teachersWithSubjects = new Set();

  if (sid === "DEMO") {
    DemoProvider.teachersWithSubjects.forEach((teacherWithSubjects: string) => {
      teachersWithSubjects.add(teacherWithSubjects);
    });
  } else {
    for (let row = 1; row < timetable.length; row++) {
      //start at second column because first column is only description

      for (let column = 1; column < timetable[row].length; column++) {
        const lesson = timetable[row][column];
        if (lesson !== "") {
          const subject = lesson.split(" ")[0][0];
          const teacher = lesson.split(" ")[2];
          teachersWithSubjects.add(`${teacher}/${subject}`);
        }
      }
    }
  }

  return teachersWithSubjects;
}