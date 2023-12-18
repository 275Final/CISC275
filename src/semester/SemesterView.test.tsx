import { classes } from "../Interface/classes";
import { semester } from "../Interface/semester";
import { fireEvent, render, screen } from "@testing-library/react";
import React, { useState } from "react";
import { SemesterView } from "./SemesterView";
import { prequesiteChecker } from "../utils";

function SemesterViewTest({
    id,
    semester
}: {
    id: number;
    semester: semester;
}): JSX.Element {
    const [dragCourse, setDragCourse] = useState<classes>();
    const [semesters, setSemesters] = useState<semester[]>([]);
    const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log(dragCourse);
    };
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
                    }
                }
            }
        }
    };
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
    return (
        <SemesterView
            key={id}
            semester={semester}
            handleOnDragOver={handleOnDragOver}
            handleOnDrop={handleOnDrop}
            clearSemester={clearSemester}
            setDragCourse={setDragCourse}
            clearCourses={clearCourses}
            updateSemester={updateSemester}
            dragCourse={dragCourse}
        ></SemesterView>
    );
}

const classExamples: classes[] = [
    {
        code: "CISC181",
        title: "Introduction to Computer Science II",
        credits: 3,
        preReq: ["CISC108"]
    },
    {
        code: "CISC220",
        title: "Data Structures",
        credits: 3,
        preReq: ["CISC210"]
    }
];

const semesterExample: semester = {
    id: 1,
    fullTime: true,
    classList: classExamples,
    totalCredits: 6,
    season: "Fall 2023"
};

describe("SemesterView", () => {
    const clearSemesterHandler = jest.fn();
    clearSemesterHandler.mockImplementation(() => {
        semesterExample.classList = [];
    });

    beforeEach(() => {
        render(
            <SemesterViewTest
                id={semesterExample.id}
                semester={semesterExample}
            ></SemesterViewTest>
        );
    });
    test("SemesterView renders a heading with the season of the semester.", () => {
        screen.queryByText(semesterExample.season);
    });

    test("ClearSemester is called after clicking button, and the semester is cleared.", () => {
        const clearSemesterButton = screen.getByRole("button", {
            name: /Clear Semester/i
        });
        fireEvent.click(clearSemesterButton);
    });

    test("ClearCourses is called after clicking button.", () => {
        const clearCoursesButton = screen.getByRole("button", {
            name: /Clear Courses/i
        });
        fireEvent.click(clearCoursesButton);
        const classExample = semesterExample.classList[0].title;
        expect(screen.queryByText(classExample)).toBeInTheDocument();
    });
});
