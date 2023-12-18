import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the course name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(
        /University of Delaware Course Scheduler!/i
    );
    expect(linkElement).toBeTruthy();
});
