/* eslint-disable no-extra-parens */
/*
Lint rule regarding no-extra parens has been disabled due to an issue with
prettier not accepting added parenthesis within our ternary if statements.
However, when we remove these parentheses as requested by prettier, we then
get an error that does not allow for the exclusion of these parentheses. Essentially,
we enter a never-ending loop where prettier both does not like the parentheses and
does not like the absence of them.
*/
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { db } from "./firebase";

interface AuthDetailsProps {
    onLogin: () => void;
    onLogout: () => void;
    flipPage: () => void;
}

const AuthDetails: React.FC<AuthDetailsProps> = ({
    onLogin,
    onLogout,
    flipPage
}) => {
    const [authUser, setAuthUser] = useState<User | null>(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                onLogin(); // Call onLogin callback when user is logged in
                flipPage();
            } else {
                setAuthUser(null);
                onLogout(); // Call onLogout callback when user is logged out
            }
        });

        return () => {
            listen();
        };
    }, [onLogin, onLogout]);

    useEffect(() => {
        console.log(db);
    });

    const handleUserSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Sign Out was Successful");
                onLogout();
                flipPage();
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            {authUser ? (
                <>
                    <p>{`Signed In as ${authUser.email}`}</p>
                    <button onClick={handleUserSignOut}>Sign Out</button>
                </>
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default AuthDetails;
