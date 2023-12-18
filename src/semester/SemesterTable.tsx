import React, { useState } from "react";
import { classes } from "../Interface/classes";
import { semester } from "../Interface/semester";
import { SemesterView } from "./SemesterView";
import { prequesiteChecker } from "../utils";
import Alert from "react-bootstrap/Alert";

/*
SemesterTable:
This component provides a side navigation bar that remains displayed at all times on the website, after the user 
has logged in, in which users can interact with its "Add / Delete Degree Plan", "View Degree Plan", Add Semester", 
"Add Course", "Degree Audit", "Download Plan", and "Logout" buttons to achieve their goal of creating their desired plan. 
This is essentially, the root point for all interactivity that the website provides and it works by taking in several
"flipView" functions so that specific components can be displayed when corresponding elements of the navbar list are clicked.
*/
//Created a function to map all the given semesters into their own view.
export function SemesterTable({
    semesters,
    setSemesters,
    currentPlan
}: {
    semesters: semester[];
    setSemesters: (sems: semester[]) => void;
    currentPlan: string;
}): JSX.Element {
    //drag course is being used for ability to drag.

    const [dragCourse, setDragCourse] = useState<classes>();
    const [showAlert, setShowAlert] = useState(false);
    //Clears Semesters
    function clearSemester(id: number): void {
        const semesterIndex = semesters.findIndex(
            (semester: semester): boolean => semester.id === id
        );
        const s_copy = semesters.map((sem) => ({
            ...sem,
            classList: [...sem.classList]
        }));
        s_copy.splice(semesterIndex, 1);
        setSemesters(s_copy);
    }
    function clearCourses(semester: semester): void {
        const updatedSemester = { ...semester, classList: [] };
        const semesterIndex = semesters.findIndex(
            (semesterItem: semester): boolean => semesterItem.id === semester.id
        );
        const s_copy = semesters.map((sem) => ({
            ...sem,
            classList: [...sem.classList]
        }));
        s_copy.splice(semesterIndex, 1, updatedSemester);
        setSemesters(s_copy);
    }
    function updateSemester(semester: semester): void {
        const semesterIndex = semesters.findIndex(
            (semesterItem: semester): boolean => semesterItem.id === semester.id
        );
        const newTotalCredits = semesters[semesterIndex].classList.reduce(
            (total: number, currentClass: classes) =>
                total + currentClass.credits,
            0
        );
        const s_copy = semesters.map((sem) => ({
            ...sem,
            classList: [...sem.classList],
            totalCredits: newTotalCredits
        }));
        s_copy.splice(semesterIndex, 1, semester);
        setSemesters(s_copy);
    }

    //Handles drop and what happens when the element is let go from the mouse
    const handleOnDrop = (
        event: React.DragEvent<HTMLDivElement>,
        id: number
    ) => {
        event.preventDefault();
        console.log("Drop");
        console.log(dragCourse);
        if (dragCourse !== undefined) {
            const findSemesterIndex = semesters.findIndex(
                (sem: semester): boolean => sem.id === id
            );
            const foundSemester = semesters[findSemesterIndex];
            if (foundSemester !== undefined) {
                if (
                    foundSemester.classList.every(
                        (classes: classes): boolean =>
                            classes.code !== dragCourse.code
                    )
                ) {
                    if (
                        prequesiteChecker(
                            dragCourse.preReq,
                            semesters,
                            dragCourse
                        )
                    ) {
                        const updatedSemester = {
                            ...foundSemester,
                            classList: [...foundSemester.classList, dragCourse]
                        };
                        const totalCredits = updatedSemester.classList.reduce(
                            (total: number, currentClass: classes) =>
                                total + currentClass.credits,
                            0
                        );
                        updatedSemester.totalCredits = totalCredits;
                        console.log(updatedSemester.classList);
                        console.log(semesters);
                        const updatedSemesters = semesters.map(
                            (semester: semester): semester => ({
                                ...semester,
                                classList: [...semester.classList]
                            })
                        );
                        updatedSemesters.splice(
                            findSemesterIndex,
                            1,
                            updatedSemester
                        );
                        console.log(updatedSemesters);
                        setSemesters(updatedSemesters);
                    } else {
                        setShowAlert(true);
                    }
                }
            }
        }
    };
    //handles when it is being dragged.
    const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log(dragCourse);
    };
    //<Button onClick={download}>download</Button>;

    return (
        <div
            className="semesterTable"
            style={{ overflowY: "scroll", maxHeight: "700px" }}
        >
            <h2>{currentPlan === "" ? "" : `Plan Name: ${currentPlan}`}</h2>
            {/*<Button onClick={download}>download</Button>*/}
            <Alert
                show={showAlert}
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
            >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    The prerequisites of {dragCourse?.title} have not been met!
                </p>
            </Alert>
            {semesters.map((semester) => {
                return (
                    <SemesterView
                        key={semester.id}
                        semester={semester}
                        handleOnDragOver={(e) => handleOnDragOver(e)}
                        handleOnDrop={(e) => handleOnDrop(e, semester.id)}
                        clearSemester={clearSemester}
                        setDragCourse={setDragCourse}
                        clearCourses={clearCourses}
                        updateSemester={updateSemester}
                        dragCourse={dragCourse}
                    ></SemesterView>
                );
            })}
        </div>
    );
}
