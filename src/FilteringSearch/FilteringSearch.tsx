/*eslint-disable no-extra-parens*/
/*
Lint rule regarding no-extra parens has been disabled due to an issue with
prettier not accepting added parenthesis within our ternary if statements.
However, when we remove these parentheses as requested by prettier, we then
get an error that does not allow for the exclusion of these parentheses. Essentially,
we enter a never-ending loop where prettier both does not like the parentheses and
does not like the absence of them.
 */
/*
FilteringSearch:
This component provides users with a search bar that is able to filter a list
of courses in real time based on current user input and it displays the list
underneath the search bar. Therefore if a user was to type "cisc" the list
underneath the searchbar would simultaneosly shrink to only include courses
that begin with "cisc." Once users have located their desired course in the 
list, they must then click on the course to fill in the search bar so that 
their input can be handled. In addition, clicking the searchbar hides it
in case users do not want to see the list as they provide input.

NOTE: This actual file is not being used in other files as a component,
but instead the code has been copied and pastd into files that need to implement
the search bar. For example, the file that provides users with a modal to add
a class uses this code rather than calling this component. 
*/
import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import realData from "../data/final_data.json";

export function FilteringSearch(): JSX.Element {
    const [searchAttribute, setSearchAttribute] = useState("");
    const [filteredCourses, setFilteredCourses] = useState(realData);
    const [visible, setVisible] = useState<boolean>(false);

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        setSearchAttribute(searchValue);

        const filteredClasses = realData.filter((course) =>
            course.code.toLowerCase().startsWith(searchValue.toLowerCase())
        );
        setFilteredCourses(filteredClasses);
    };

    const handleClick = (cID: string) => {
        setSearchAttribute(cID);
    };

    const flipVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <Form.Group controlId="formFilterSearch">
                <Form.Control
                    type="text"
                    value={searchAttribute}
                    onChange={inputChange}
                    placeholder="Search by Course Code"
                    onClick={flipVisibility}
                />
            </Form.Group>
            {visible && (
                <div
                    className="FilterMainDiv"
                    style={{
                        backgroundColor: "gold",
                        height: "auto",
                        overflowY: "scroll",
                        maxHeight: "125px"
                    }}
                >
                    {filteredCourses.map((course) => {
                        return (
                            <div
                                onClick={() => handleClick(course.code)}
                                style={{
                                    cursor: "pointer"
                                }}
                                key={course.code}
                            >
                                {course.code}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
