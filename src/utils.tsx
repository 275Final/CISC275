import { classes } from "./Interface/classes";
import { semester } from "./Interface/semester";

export function prequesiteChecker(
    prequesite: string[],
    semesters: semester[],
    newClass: classes
): boolean {
    if (newClass.preReq.length === 1) {
        if (newClass.preReq[0].includes("No prerequisites.")) {
            console.log(true);
            return true;
        }
    }

    const previousClassList = semesters
        .map((semester: semester): string[] =>
            semester.classList.map((course: classes): string => course.code)
        )
        .reduce((accumulator, value) => accumulator.concat(value), []);

    const stringPreReq = prequesite.map((preR: string): string =>
        preR.split(" ").join("")
    );
    const isFulfilled = stringPreReq.every((prereq: string): boolean =>
        previousClassList.includes(prereq)
    );
    return isFulfilled;
}
