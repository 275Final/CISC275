/* eslint-disable no-extra-parens */
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const majors = [
    "Artificial Intelligence and Robotics Concentration",
    "Bioinformatics Concentration",
    "Cybersecurity Concentration",
    "Data Science Concentration",
    "High Performance Computing Concentration",
    "Systems and Networks Concentration",
    "Theory and Computation Concentration",
    "Traditional Program with Custom Focus Area"
];

export function ChosenMajor({
    handleClose,
    show
}: {
    handleClose: () => void;
    show: boolean;
}) {
    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Major</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Select style={{ textAlign: "center" }}>
                            {majors.map((options: string) => (
                                <option key={options} value={options}>
                                    {options}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Close
                    </Button>
                    <Button> Done</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}