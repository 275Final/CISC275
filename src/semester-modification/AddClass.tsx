/* eslint-disable no-extra-parens */
/*
Lint rule regarding no-extra parens has been disabled due to an issue with
prettier not accepting added parenthesis within our ternary if statements.
However, when we remove these parentheses as requested by prettier, we then
get an error that does not allow for the exclusion of these parentheses. Essentially,
we enter a never-ending loop where prettier both does not like the parentheses and
does not like the absence of them.
*/
import React from "react";
import { Button } from "react-bootstrap";
import { classes } from "../Interface/classes";
import { semester } from "../Interface/semester";

export function AddClass({
    setShowAlert,
    schedule,
    semester,
    newClass,
    onAddClass
}: {
    setShowAlert: (boolean: boolean) => void;
    schedule: semester[];
    semester: semester;
    newClass: classes;
    onAddClass: (updatedSchedule: semester[]) => void;
}): JSX.Element {
    function addClass() {
        // Create a new array of semesters
        const updatedSchedule: semester[] = [...schedule];

        // Find the index of the current semester
        const semesterIndex: number = updatedSchedule.findIndex(
            (sem: semester) => sem.id === semester.id
        );

        const semIdsLower = schedule.filter(
            (searchSemester: semester): boolean =>
                searchSemester.id < semester.id
        );
        //const preReqFulfilled = semIdsLower.every

        function checkPreReqs(
            prequesite: string[],
            filteredSemesters: semester[]
        ): boolean {
            if (newClass.preReq.length === 1) {
                if (newClass.preReq[0].includes("No prerequisites.")) {
                    console.log(true);
                    return true;
                }
            }

            //const initArray: string[] = [];
            const previousClassList = filteredSemesters
                .map((semester: semester): string[] =>
                    semester.classList.map(
                        (course: classes): string => course.code
                    )
                )
                .reduce((accumulator, value) => accumulator.concat(value), []);

            // const previousClassCodes = previousClassList.map(
            //     (course: classes): string[] => [
            //         ...previousClassCodes,
            //         ...course.code
            //     ]
            // );
            const stringPreReq = prequesite.map((preR: string): string =>
                preR.split(" ").join("")
            );
            const isFulfilled = stringPreReq.every((prereq: string): boolean =>
                previousClassList.includes(prereq)
            );
            console.log(isFulfilled);
            return isFulfilled;
        }

        // Create a new array of classes for the updated semester
        const preReqBoolean: boolean = checkPreReqs(
            newClass.preReq,
            semIdsLower
        );
        setShowAlert(!preReqBoolean);
        console.log(!preReqBoolean);
        console.log(
            "Does this " + newClass + " have all prereqs met" + preReqBoolean
        );
        if (preReqBoolean) {
            const updatedClasses: classes[] = [
                ...updatedSchedule[semesterIndex].classList,
                newClass
            ];
            newClass.originalCode = newClass.code;
            newClass.originalTitle = newClass.title;
            newClass.originalCredits = newClass.credits;
            // Get new credit total
            const totalCredits: number = updatedClasses.reduce(
                (total: number, currentClass: classes) =>
                    total + currentClass.credits,
                0
            );

            // Create a new semester object with the updated values
            const updatedSemester: semester = {
                ...updatedSchedule[semesterIndex],
                classList: updatedClasses,
                totalCredits: totalCredits
            };

            // Update the schedule with the modified semester
            updatedSchedule[semesterIndex] = updatedSemester;

            onAddClass(updatedSchedule);
        }
    }

    return <Button onClick={addClass}>Add Class</Button>;
}
