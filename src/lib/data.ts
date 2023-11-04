import data from "./data.json";
import { parseDatetime } from "./utils/parse-datetime";
import { getWeeksBetweenDates } from "./utils/get-weeks-between-dates";

const firstDay = new Date("2023-08-14");

// string 1: email
// string 2: name
let teachers = new Map<string, string>();

// string 1: courseId
// string 2: courseName
let courses = new Map<string, string>();

// classType options: teo-lab
// string 1 format: courseId-date-classType
let recordingsSet = new Map<
  string,
  {
    url: string;
    teacher: string; // teacher email
    startHour: string;
    endHour: string | null;
  }
>();

data.content.forEach((rawRecording) => {
  if (!rawRecording.conference) return;
  if (!rawRecording.playUrl) return;
  courses.set(
    rawRecording.conference.idCourse,
    rawRecording.conference.nameCourse.trim()
  );

  teachers.set(
    rawRecording.conference.mailTeacher.toLowerCase().trim(),
    rawRecording.conference.nameTeacher.trim()
  );

  recordingsSet.set(
    `${rawRecording.conference.idCourse}/${
      rawRecording.startTime
    }/${rawRecording.conference.descriptionTypeSesion.toLowerCase().trim()}`,
    {
      url: rawRecording.playUrl,
      teacher: rawRecording.conference.mailTeacher.toLowerCase().trim(),
      startHour: rawRecording.conference.startHour,
      endHour: rawRecording.conference.endHour,
    }
  );
});

export type Recording = {
  url: string;
  start: Date;
  end: Date | null;
  course: {
    id: string;
    name: string | undefined;
  };
  teacher: {
    email: string;
    name: string | undefined;
  };
  week: number;
  sessionType: string;
};

let recordings: Recording[] = Array.from(recordingsSet.entries())
  .map(([id, { url, teacher, startHour, endHour }]) => {
    let courseId = id.split("/")[0];

    let date = id.split("/")[1];
    let [year, month, day] = date.split("-");

    let sessionType = id.split("/")[2];

    return {
      url,
      start: parseDatetime(
        year,
        month,
        day,
        startHour.split(":")[0],
        startHour.split(":")[1]
      ),
      end: endHour
        ? parseDatetime(
            year,
            month,
            day,
            endHour.split(":")[0],
            endHour.split(":")[1]
          )
        : null,
      course: {
        id: courseId,
        name: courses.get(courseId),
      },
      teacher: {
        email: teacher,
        name: teachers.get(teacher),
      },
      week: getWeeksBetweenDates(firstDay, new Date(date)) + 1,
      sessionType,
    };
  })
  .sort((a, b) => a.start.getTime() - b.start.getTime());

export { recordings };
