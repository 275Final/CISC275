/* eslint-disable no-extra-parens */
import React, { useState, useEffect } from "react";
import "./welcome.css";
import { Button, Form } from "react-bootstrap";
import Image3 from "./Images/BlueHenScene.jpeg";

interface WelcomeMessage {
    showHomePage: () => void;
    getName: (name: string) => void;
}

const WelcomeMessage: React.FC<WelcomeMessage> = ({
    showHomePage,
    getName
}) => {
    const [name, setName] = useState("");
    const [showWelcome, setShowWelcome] = useState(true);
    const [inactiveTimeout, setInactiveTimeout] =
        useState<NodeJS.Timeout | null>(null);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleShowWelcome = () => {
        if (name.trim() !== "") {
            setShowWelcome(false);
            // const newInactiveTimeout = setTimeout(() => {
            //     setShowWelcome(true);
            //     setName("");
            // }, 5 * 60 * 1000);
        } else {
            alert("Please enter a valid name.");
        }
    };

    useEffect(() => {
        const resetInactiveTimeout = () => {
            if (inactiveTimeout) {
                clearTimeout(inactiveTimeout);
                const newInactiveTimeout = setTimeout(() => {
                    setShowWelcome(true);
                    setName("");
                }, 5 * 60 * 1000);
                setInactiveTimeout(newInactiveTimeout);
            }
        };

        document.addEventListener("mousemove", resetInactiveTimeout);
        document.addEventListener("keydown", resetInactiveTimeout);

        return () => {
            document.addEventListener("mousemove", resetInactiveTimeout);
            document.addEventListener("keydown", resetInactiveTimeout);
        };
    }, [inactiveTimeout]);

    return (
        <div className="App">
            {showWelcome ? (
                <div className="WelcomeMessage">
                    <h5>
                        Welcome to the University of Delaware Course Scheduler!
                    </h5>
                    <h6>
                        Here you can view available courses, create mock
                        semester plans, and submit your desired course plans.
                    </h6>
                    <p>Please enter your name:</p>
                    <div>
                        <Form.Group className="d-flex justify-content-center">
                            <Form.Control
                                type="text"
                                onChange={handleNameChange}
                                placeholder="Please Enter Valid Name"
                                className="w-25"
                            />
                            <Button onClick={handleShowWelcome}>OK</Button>
                        </Form.Group>
                    </div>
                </div>
            ) : (
                <div>
                    {showHomePage()}
                    {getName(name)}
                </div>
            )}
            <img id="picture" src={Image3}></img>
        </div>
    );
};

export default WelcomeMessage;
