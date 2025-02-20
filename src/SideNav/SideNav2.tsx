/*
SideNav2:
This component provides a side navigation bar that remains displayed at all times on the website, after the user 
has logged in, in which users can interact with its "Add / Delete Degree Plan", "View Degree Plan", Add Semester", 
"Add Course", "Degree Audit", "Download Plan", and "Logout" buttons to achieve their goal of creating their desired plan. 
This is essentially, the root point for all interactivity that the website provides and it works by taking in several
"flipView" functions so that specific components can be displayed when corresponding elements of the navbar list are clicked.
*/
import React from "react";
import "../App.css";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ClassIcon from "@mui/icons-material/Class";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import List from "@mui/icons-material/List";
import { Logout } from "@mui/icons-material";

export function SideNav2({
    flipView,
    flipAddPlanView,
    flipPlan,
    flipModalView,
    flipAudit,
    flipAddView,
    flipDownload,
    handleLogout
}: {
    flipView: () => void;
    flipAddPlanView: () => void;
    flipPlan: () => void;
    flipModalView: () => void;
    flipAudit: () => void;
    flipAddView: () => void;
    flipDownload: () => void;
    handleLogout: () => void;
    // handleUserSignOut: () => void;
}): JSX.Element {
    return (
        <div className="SideNav2">
            <ul className="SideNavList2">
                <li className="row" onClick={() => flipAddPlanView()}>
                    <div id="picture">{<SchoolIcon />}</div>
                    <div id="name">{"Add / Delete Degree Plan"}</div>
                </li>
                <li
                    className="row"
                    onClick={() => {
                        flipPlan();
                        flipView();
                    }}
                >
                    <div id="picture">{<List />}</div>
                    <div id="name">{"View Degree Plan"}</div>
                </li>
                <li className="row" onClick={() => flipModalView()}>
                    <div id="picture">{<AutoStoriesIcon />}</div>
                    <div id="name">{"Add Semester"}</div>
                </li>
                <li className="row" onClick={() => flipAddView()}>
                    <div id="picture">{<ClassIcon />}</div>
                    <div id="name">{"Add Course"}</div>
                </li>
                <li className="row" onClick={() => flipAudit()}>
                    <div id="picture">{<ChecklistIcon />}</div>
                    <div id="name">{"Degree Audit"}</div>
                </li>
                <li className="rowDownload" onClick={() => flipDownload()}>
                    <div id="picture">{<FileDownloadIcon />}</div>
                    <div id="name">{"Download Plan"}</div>
                </li>
                <li className="rowLogout" onClick={() => handleLogout()}>
                    <div id="picture">{<Logout />}</div>
                    <div id="name">{"Logout"}</div>
                </li>
            </ul>
        </div>
    );
}
