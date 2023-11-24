import DemoProvider from "../../DataProvider/DemoProvider";

export function getTeachers(sid: string, timetable) {
  let teachers = new Set();
  
  if (sid === "DEMO") {
    DemoProvider.teachers.forEach((teacher: string) => {
      teachers.add(teacher);
    });
  } else {
    for (let row = 0; row < timetable.length; row++) {
      //start at second column because first column is only description

      for (let column = 1; column < timetable[row].length; column++) {
        const lesson = timetable[row][column];
        if (lesson !== "") {
          const teacher = lesson.split(" ")[2];
          teachers.add(teacher);
        }
      }
    }
  }

  return teachers;
}