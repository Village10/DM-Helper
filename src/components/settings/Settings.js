import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import storage from "../../util/storage"
import SearchWiki from "../search/SearchWiki";
import Grid from "@mui/material/Grid2";
import {FormControlLabel} from "@mui/material";
import Switch from '@mui/material/Switch';

export default function Settings(props) {

    const [reRender, setReRender] = React.useState(false);

    function settingsTitle(title) {
        return (
            <Typography
                variant="h4"
                sx={{
                    borderBottom: "3px solid"
                }}
            >{title}</Typography>
        )
    }

    // TODO: Add confirmation for clearing all data
    return (
        <Box sx={{width: "100%"}}>
            <Typography variant="h1" align="center" style={{marginBottom: 20}}>Settings</Typography>
            <Grid
                container
                spacing={2}
            >
                <Grid container direction="column" sx={{flexGrow: 1}}>
                    {settingsTitle("Combat")}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={async () => {
                            storage("delete", "", "Combatants")
                        }}
                    >Clear Saved Combatants</Button>
                    {settingsTitle("Characters")}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={async () => {
                            storage("delete", "", "Characters")
                        }}
                    >Clear Characters</Button>
                    {settingsTitle("Notes")}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={async () => {
                            storage("delete", "", "Notes")
                            storage("set", "None", "Note")
                        }}
                    >Clear Notes</Button>
                    {settingsTitle("Search")}
                    <Button
                        variant="contained"
                        color="success"
                        onClick={async () => {
                            const wikiData = await SearchWiki()
                            storage("set", wikiData, "wikiData")
                            props.setWikiData(wikiData)
                        }}
                    >Refresh Data From Wiki</Button>
                </Grid>
                <Grid container direction="column" sx={{flexGrow: 1}}>
                    {settingsTitle("Confirmation")}
                    {Object.keys(storage("get", "", "Confirm")).map((key) => (
                        <Grid>
                            <FormControlLabel control={
                                <Switch
                                    checked={storage("get", "", "Confirm", key)}
                                    onChange={(event) => {
                                        storage("set", event.target.checked, "Confirm", key)
                                        setReRender(!reRender)
                                    }}
                                    inputProps={{'aria-label': 'controlled'}}
                                />
                            } label={"Confirm when " + key}
                            ></FormControlLabel>
                        </Grid>
                    ))}
                    {settingsTitle("Miscellaneous")}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            localStorage.clear()
                            window.location.reload()
                        }}
                    >Clear all Data</Button>
                </Grid>
            </Grid>
        </Box>
    )
}