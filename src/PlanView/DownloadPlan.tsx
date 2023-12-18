/* eslint-disable no-extra-parens */
/*
Lint rule regarding no-extra parens has been disabled due to an issue with
prettier not accepting added parenthesis within our ternary if statements.
However, when we remove these parentheses as requested by prettier, we then
get an error that does not allow for the exclusion of these parentheses. Essentially,
we enter a never-ending loop where prettier both does not like the parentheses and
does not like the absence of them.
*/
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Plan } from "../Interface/Plan";
import { semester } from "../Interface/semester";

/*
Download Plan:
This component allows the plan to be downloaded as a csv. It was created using the Lost Chapters on the tome. As stated we
referenced the Stack Overflow link that was posted and edited to be able to handle our specific interface. We also used the
download method that was shown with little to no changes.
*/

export function DownloadPlan({
    handleClose,
    show,
    allplans
}: {
    handleClose: () => void;
    show: boolean;
    allplans: Plan[];
}) {
    const [viewPlan, setViewPlan] = useState<string>("");
    function selectedPlan(event: React.ChangeEvent<HTMLSelectElement>): void {
        setViewPlan(event.target.value);
    }
    //CISC275 Tome and StackOverflow link that was given was used to build this code.
    //https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side/68146412#68146412
    //TBD and not finished. Takes in the current semesters and attempts to create a csv
    function arrayToCSV(data: semester[][]) {
        return data
            .map((row) =>
                row
                    .map((v) => {
                        if (typeof v === "object" && v !== null) {
                            return JSON.stringify(v)
                                .replaceAll(/['"]+/g, "")
                                .replace(/[{}]/g, "");
                        }
                        //double quotes are given prettier errors. Just needed for deployment purposes. Will be fixed for future sprint.
                        // eslint-disable-next-line quotes
                        return String(v).replace(/"/g, '""');
                    })
                    .map((v) => `${v}`)
                    .join("\n")
            )
            .join("\n");
    }

    //CISC275 Tome and StackOverflow link that was given was used to build this code.
    //https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side/68146412#68146412
    //download plan as a filename. Prettier error will fixed by end of sprint.
    function downloadBlob(
        content: BlobPart,
        filename: string,
        contentType: string
    ) {
        // Create a blob
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);

        // Create a link to download it
        const pom = document.createElement("a");
        pom.href = url;
        pom.setAttribute("download", filename);
        pom.click();
    }

    const download = () => {
        console.log(viewPlan);
        if (viewPlan !== "") {
            const findIndexplan: number = allplans.findIndex(
                (plan) => plan.name === viewPlan
            );
            console.log(findIndexplan);
            const csv = arrayToCSV([allplans[findIndexplan].semesters]);
            downloadBlob(csv, ".csv", "text/csv;charset=utf-8;");
        }
        handleClose();
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {allplans.length === 0 ? (
                        <div>
                            <Modal.Title>Please add a degree plan</Modal.Title>
                        </div>
                    ) : (
                        <Form.Group>
                            <Form.Select
                                value={viewPlan}
                                onChange={selectedPlan}
                                style={{ textAlign: "center" }}
                            >
                                <option>
                                    Please select a degree plan to download
                                </option>
                                {allplans.map((plan) => (
                                    <option key={plan.name} value={plan.name}>
                                        {plan.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Close
                    </Button>
                    <Button onClick={download}>Download</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
