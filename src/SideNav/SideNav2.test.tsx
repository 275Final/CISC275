import React from "react";
import { render, screen, within } from "@testing-library/react";
import { SideNav2 } from "./SideNav2";
//import userEvent from "@testing-library/user-event";

describe("SideNav Test", () => {
    test("rendering the Side nav bar", () => {
        render(
            <SideNav2
                flipView={function (): void {
                    throw new Error("Function not implemented.");
                }}
                flipAddPlanView={function (): void {
                    throw new Error("Function not implemented.");
                }}
                flipPlan={function (): void {
                    throw new Error("Function not implemented.");
                }}
                flipModalView={function (): void {
                    throw new Error("Function not implemented.");
                }}
                flipAudit={function (): void {
                    throw new Error("Function not implemented.");
                }}
                flipAddView={function (): void {
                    throw new Error("Function not implemented.");
                }}
                flipDownload={function (): void {
                    throw new Error("Function not implemented.");
                }}
                handleLogout={function (): void {
                    throw new Error("Function not implemented.");
                }}
            />
        );
        expect(
            screen.getByText(/Add \/ Delete Degree Plan/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/View Degree Plan/i)).toBeInTheDocument();
        expect(screen.getByText(/Add Semester/i)).toBeInTheDocument();
        expect(screen.getByText(/Add Course/i)).toBeInTheDocument();
        expect(screen.getByText(/Degree Audit/i)).toBeInTheDocument();
        expect(screen.getByText(/Download Plan/i)).toBeInTheDocument();
        expect(screen.getByText(/Logout/i)).toBeInTheDocument();
        const list = screen.getByRole("list");
        const { getAllByRole } = within(list);
        const items = getAllByRole("listitem");
        expect(items.length).toBe(7);
    });
});
