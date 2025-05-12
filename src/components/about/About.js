import {useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function About() {

    const theme = useTheme();
    let primary = theme.palette.text.primary.replaceAll("%", "%25").replaceAll(" ", "").replaceAll(",", "%2C%20");
    let secondary = theme.palette.background.default.replaceAll("%", "%25").replaceAll(" ", "").replaceAll(",", "%2C%20");

    return (
        <>
            <Typography variant="h1" align="center" style={{marginBottom: 20}}>About DM Helper</Typography>
            <div style={{textAlign: 'center', display: "flex", flexWrap: "wrap", columnGap: "0.5rem", justifyContent: "center"}}>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                <img
                    src={"https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=" + secondary + "&labelColor=" + primary + "&style=for-the-badge"}
                    alt="React"
                />
            </a>
            <a href="https://npmjs.com" target="_blank" rel="noopener noreferrer">
                <img
                    src={"https://img.shields.io/badge/-Npm-CB3837?logo=npm&logoColor=" + secondary + "&labelColor=" + primary + "&style=for-the-badge"}
                    alt="Npm"
                />
            </a>
            <a href="https://mui.com" target="_blank" rel="noopener noreferrer">
                <img
                    src={"https://img.shields.io/badge/-MUI-007FFF?logo=mui&logoColor=" + secondary + "&labelColor=" + primary + "&style=for-the-badge"}
                    alt="MUI"
                />
            </a>
            <a href="https://dnd.wizards.com" target="_blank" rel="noopener noreferrer">
                <img
                    src={"https://img.shields.io/badge/-D&D-ED1C24?logo=dungeonsanddragons&logoColor=" + secondary + "&labelColor=" + primary + "&style=for-the-badge"}
                    alt="D&D"
                />
            </a>
            <a href="https://nodejs.org/en" target="_blank" rel="noopener noreferrer">
                <img
                    src={"https://img.shields.io/badge/-NodeJs-5FA04E?logo=nodedotjs&logoColor=" + secondary + "&labelColor=" + primary + "&style=for-the-badge"}
                    alt="NodeJs"
                />
            </a>
            <span style={{flexBasis: "100%"}}></span>
            <a href="https://github.com/Village10/DM-Helper/releases" target="_blank" rel="noopener noreferrer">
                <img
                    src={"https://img.shields.io/github/v/release/Village10/DM-Helper?include_prereleases&logoColor=" + secondary + "&labelColor=" + primary + "&style=for-the-badge"}
                    alt="GitHub release"
                />
            </a>
            <a href="https://DM-Helper.duckdns.org:3000" target="_blank" rel="noopener noreferrer">
                <img
                    src={"https://img.shields.io/badge/Website-URL-green?&logoColor=" + secondary + "&labelColor=" + primary + "&style=for-the-badge"}
                    alt="Website"
                />
            </a>
            <a href="https://github.com/Village10/DM-Helper/releases">
                <img
                    src={"https://img.shields.io/github/repo-size/Village10/DM-Helper?include_prereleases&logoColor=" + secondary + "&labelColor=" + primary + "&style=for-the-badge"}
                    alt="Repo size"
                />
            </a>
        </div>
        </>
    )
}