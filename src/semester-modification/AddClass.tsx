import React from "react";
import { Button } from "react-bootstrap";
import { classes } from "../Interface/classes";
import { semester } from "../Interface/semester";
import { useState } from "react";
import { Alert } from "react-bootstrap";
export function AddClass({
    schedule,
    semester,
    newClass,
    onAddClass
}: {
    schedule: semester[];
    semester: semester;
    newClass: classes;
    onAddClass: (updatedSchedule: semester[]) => void;
}): JSX.Element {
    const [showAlert, setShowAlert] = useState(false);
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
        } else {
            return (
                <>
                    <Alert show={showAlert} variant="success">
                        <Alert.Heading>Cannot Add course</Alert.Heading>
                        <p>
                            Ths course cannot be added because its pre requisite
                            courses have not been met in previous semesters.
                            Please add pre requisite courses before adding
                            higher lever courses.
                        </p>
                        <div className="d-flex justify-content-end">
                            <Button
                                onClick={() => setShowAlert(false)}
                                variant="outline-success"
                            >
                                Close
                            </Button>
                        </div>
                    </Alert>
                    {!showAlert && (
                        <Button onClick={() => setShowAlert(true)}>
                            Show Alert
                        </Button>
                    )}
                </>
            );
        }
    }

    return <Button onClick={addClass}>Add Class</Button>;
}
