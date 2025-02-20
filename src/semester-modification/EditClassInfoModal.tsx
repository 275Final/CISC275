/*
EditClassInfoModal:
This components provides the functionality of being able to edit a course's code, title, and credits within the displayed table of courses
that represent a semester. This functionality is intended to be used in the event that the University updates a cours's information, and 
therefore even if the website does not recieve the latest information about a course, users can manually edit the information themselves. 
This component itself displayes a modal that has 3 text boxes for users to input the new code, title, and credits, and then this input is
displayed in place of previous codes, titles, and credits in the row of the class being edited. In addition, this component also provides,
a revert course functionality that allows users to change a course's information back to its original starting information, if the course
has been edited. 
*/
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { classes } from "../Interface/classes";
import { useState } from "react";
import { semester } from "../Interface/semester";

export function EditClassInfoModal({
    courseToEdit,
    semester,
    updateSemester
}: {
    courseToEdit: classes;
    semester: semester;
    updateSemester: (semester: semester) => void;
}): JSX.Element {
    const [newCode, setNewCode] = useState(courseToEdit.code);
    const [newTitle, setNewTitle] = useState(courseToEdit.title);
    const [newCredits, setNewCredits] = useState(courseToEdit.credits);
    const [ogCode] = useState(courseToEdit.originalCode);
    const [ogTitle] = useState(courseToEdit.originalTitle);
    const [ogCredits] = useState(courseToEdit.originalCredits);
    const [modalView, setModalView] = useState(false);

    const inputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue1 = event.target.value;
        const firstFour = searchValue1.substring(0, 4).toUpperCase();
        const last = searchValue1.substring(4, searchValue1.length);
        setNewCode(firstFour + last);
    };
    const inputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue2 = event.target.value;
        setNewTitle(searchValue2);
    };
    const inputChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue3 = event.target.value;
        setNewCredits(parseInt(searchValue3));
    };
    const flipModalView = () => {
        setModalView(!modalView);
    };
    function editClass(classToEdit: classes) {
        const updatedClass = {
            ...classToEdit,
            code: newCode,
            title: newTitle,
            credits: newCredits
        };
        const classIndex = semester.classList.findIndex(
            (classes: classes): boolean => classToEdit.code === classes.code
        );
        const updatedClasses = [...semester.classList];
        updatedClasses.splice(classIndex, 1, updatedClass);
        const totalCredits = updatedClasses.reduce(
            (total: number, currentClass: classes) =>
                total + currentClass.credits,
            0
        );
        const updatedSemester = {
            ...semester,
            classList: [...updatedClasses],
            totalCredits: totalCredits
        };
        updateSemester(updatedSemester);
    }

    function revertClass(classToEdit: classes) {
        const updatedClass = {
            ...classToEdit,
            code: ogCode !== undefined ? ogCode : classToEdit.code,
            title: ogTitle !== undefined ? ogTitle : classToEdit.title,
            credits: ogCredits !== undefined ? ogCredits : classToEdit.credits
        };
        const classIndex = semester.classList.findIndex(
            (classes: classes): boolean => classToEdit.code === classes.code
        );
        const updatedClasses = [...semester.classList];
        updatedClasses.splice(classIndex, 1, updatedClass);
        const totalCredits = updatedClasses.reduce(
            (total: number, currentClass: classes) =>
                total + currentClass.credits,
            0
        );
        const updatedSemester = {
            ...semester,
            classList: [...updatedClasses],
            totalCredits: totalCredits
        };
        updateSemester(updatedSemester);
        flipModalView();
    }

    function closingInfoModal() {
        const course: classes = courseToEdit;
        const noInput =
            newCode === courseToEdit.code &&
            newTitle === courseToEdit.title &&
            newCredits === courseToEdit.credits;
        if (!noInput) {
            flipModalView();
            editClass(course);
        }
    }
    function closingRevertModal() {
        const course: classes = courseToEdit;
        flipModalView();
        revertClass(course);
    }
    return (
        <div>
            <Button onClick={flipModalView}>Edit Course</Button>
            <Modal show={modalView} onHide={flipModalView} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Course Code:</Form.Label>
                        <Form.Group controlId="courseCode">
                            <Form.Control
                                type="text"
                                placeholder="Edit Course Code"
                                onChange={inputChange1}
                                data-testid="input4"
                            />
                        </Form.Group>
                        <hr></hr>
                        <Form.Label>Course Title:</Form.Label>
                        <Form.Group controlId="courseTitle">
                            <Form.Control
                                type="text"
                                placeholder="Edit Course Title"
                                onChange={inputChange2}
                                data-testid="input5"
                            />
                        </Form.Group>
                        <hr></hr>
                        <Form.Label>Course Credits:</Form.Label>
                        <Form.Group controlId="courseCredits">
                            <Form.Control
                                type="text"
                                placeholder="Edit Course Credits"
                                onChange={inputChange3}
                                data-testid="input6"
                            />
                        </Form.Group>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => {
                            closingRevertModal();
                        }}
                        disabled={
                            newCode === ogCode &&
                            newTitle === ogTitle &&
                            newCredits === ogCredits
                        }
                    >
                        Revert
                    </button>
                    <Button
                        onClick={() => {
                            flipModalView();
                        }}
                        disabled={
                            courseToEdit.code === "" ||
                            courseToEdit.title === "" ||
                            courseToEdit.credits === null
                        }
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            closingInfoModal();
                        }}
                    >
                        Done
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
