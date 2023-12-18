import React from "react";
import { semester } from "../Interface/semester";
import { classes } from "../Interface/classes";
import { RemoveClass } from "../semester-modification/RemoveClass";
import { EditClassInfoModal } from "../semester-modification/EditClassInfoModal";

/*
SemesterView:
This component hosts the individual semesters and displays their columns in a table that was created using bootstrap.
It uses some of the functions passed in from the table to edit the individual semesters such as being able to clear the semeser,
clear the courses within a semester and being able to drag courses from one semestr to another.
*/

export function SemesterView({
    semester,
    clearSemester,
    setDragCourse,
    handleOnDrop,
    handleOnDragOver,
    clearCourses,
    updateSemester,
    dragCourse
}: {
    semester: semester;
    clearSemester: (id: number) => void;
    setDragCourse: (classes: classes) => void;
    handleOnDrop: (event: React.DragEvent<HTMLDivElement>, id: number) => void;
    handleOnDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    clearCourses: (sems: semester) => void;
    updateSemester: (semester: semester) => void;
    dragCourse: classes | undefined;
}): JSX.Element {
    const handleDragStart = (
        event: React.DragEvent<HTMLTableRowElement>,
        course: classes
    ) => {
        console.log("Enter");
        console.log(course);
        setDragCourse(course);
    };
    const handleOnDragLeaves = (
        event: React.DragEvent<HTMLDivElement>,
        id: number
    ) => {
        const semesterToUpdate = { ...semester };
        if (id === semester.id) {
            if (dragCourse !== undefined) {
                // Create a new array of classes for the updated semester
                const updatedClasses = [
                    ...semesterToUpdate.classList.filter(
                        (allClasses: classes): boolean =>
                            allClasses.title != dragCourse.title
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
                updateSemester(semesterToUpdate);
            }
        }
    };
    return (
        <div
            onDrop={(e) => handleOnDrop(e, semester.id)}
            onDragOver={(e) => handleOnDragOver(e)}
            onDragLeave={(e) => handleOnDragLeaves(e, semester.id)}
            //onDragLeaves={(e) => handleOnDragLeaves(e, semester.id)}
        >
            <div>
                <h3>{`Semester Name: ${semester.season}`}</h3>
            </div>
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th scope="col">Course Code</th>
                        <th scope="col">Course Title</th>
                        <th scope="col">Credits: {semester.totalCredits}</th>
                        <th scope="col">Prerequisites</th>
                        <th scope="col">Remove Class</th>
                        <th scope="col">Edit Course</th>
                    </tr>
                </thead>
                <tbody>
                    {semester.classList.map((classItem) => {
                        return (
                            <tr
                                draggable={true}
                                onDragStart={(e) =>
                                    handleDragStart(e, classItem)
                                }
                                key={classItem.code}
                            >
                                <td>{classItem.code}</td>
                                <td>{classItem.title}</td>
                                <td>{classItem.credits}</td>
                                <td>
                                    {classItem.preReq.length === 0
                                        ? "None"
                                        : classItem.preReq.join(", ")}
                                </td>
                                <td>
                                    <RemoveClass
                                        schedule={semester}
                                        classToDelete={classItem}
                                        onRemoveClass={function (
                                            updatedSchedule: semester
                                        ): void {
                                            updateSemester(updatedSchedule);
                                        }}
                                    ></RemoveClass>
                                </td>
                                <td>
                                    <EditClassInfoModal
                                        courseToEdit={classItem}
                                        semester={semester}
                                        updateSemester={updateSemester}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                {" "}
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                        clearCourses(semester);
                    }}
                >
                    Clear Courses
                </button>
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                        clearSemester(semester.id);
                    }}
                >
                    Clear Semester
                </button>
            </div>
        </div>
    );
}
