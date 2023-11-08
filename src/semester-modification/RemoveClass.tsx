import React from "react";
import { classes } from "../Interface/classes";
import { semester } from "../Interface/semester";
import { Button } from "react-bootstrap";

export function RemoveClass({
    schedule,
    scheduleID,
    classToDelete,
    onRemoveClass
}: {
    schedule: semester[];
    scheduleID: number;
    classToDelete: classes;
    onRemoveClass: (updatedSchedule: semester[]) => void;
}): JSX.Element {
    function addNewClass() {
        // Create a new array of semesters
        const updatedSchedule = [...schedule];
        const semesterIDX = updatedSchedule.findIndex(
            (semester: semester): boolean => semester.id == scheduleID
        );

        // Find the semester at the specified index (scheduleID)
        const semesterToUpdate = updatedSchedule[semesterIDX];

        // Create a new array of classes for the updated semester
        const updatedClasses = [
            ...semesterToUpdate.classList.filter(
                (allClasses: classes): boolean =>
                    allClasses.title != classToDelete.title
            )
        ];

        // Get new credit total
        const totalCredits = updatedClasses.reduce(
            (total: number, currentClass: classes) =>
                total + currentClass.credits,
            0
        );

        // Update the classList of the semester with the new array of classes
        semesterToUpdate.classList = updatedClasses;
        semesterToUpdate.totalCredits = totalCredits;

        // Update the schedule with the modified semester
        updatedSchedule[semesterIDX] = semesterToUpdate;

        onRemoveClass(updatedSchedule);
    }

    return (
        <div>
            <Button onClick={addNewClass}>Remove Class</Button>
        </div>
    );
}

{
    /* <RemoveClass
    schedule={currSemesterArr}
    scheduleID={currentSemester.id}
    classToDelete={classItem}
    onRemoveClass={function (updatedSchedule: semester[]): void {
        setCurrSemesterArr(updatedSchedule);
    }}
></RemoveClass>; */
}
