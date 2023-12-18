import React from "react";
import { render, screen } from "@testing-library/react";
import { EditClassInfoModal } from "./EditClassInfoModal";
import { semester } from "../Interface/semester";
import { classes } from "../Interface/classes";
import userEvent from "@testing-library/user-event";
const testCourse: classes = {
    code: "CISC108",
    title: "Introduction to Computer Science I",
    credits: 3,
    preReq: ["No prerequisites."]
};
const testSemester: semester = {
    id: 1,
    fullTime: true,
    classList: [
        {
            code: "ENGL110",
            title: "First-Year Writing",
            credits: 3,
            preReq: ["No prerequisites."]
        },
        {
            code: "MATH241",
            title: "Analytic Geometry and Calculus A",
            credits: 4,
            preReq: ["MATH117"]
        },
        {
            code: "CISC108",
            title: "Introduction to Computer Science I",
            credits: 3,
            preReq: ["No prerequisites."]
        }
    ],
    totalCredits: 10,
    season: "Fall"
};

describe("Edit class Test", () => {
    test("rendering the edit class info modal", () => {
        render(
            <EditClassInfoModal
                courseToEdit={testCourse}
                semester={testSemester}
                updateSemester={function (): void {
                    throw new Error("Function not implemented.");
                }}
            />
        );
        const editButton = screen.getByRole("button");
        userEvent.click(editButton);
        expect(screen.getByText(/Course Code:/i)).toBeInTheDocument();
        expect(screen.getByText(/Course Title:/i)).toBeInTheDocument();
        expect(screen.getByText(/Course Credits:/i)).toBeInTheDocument();
    });
});
