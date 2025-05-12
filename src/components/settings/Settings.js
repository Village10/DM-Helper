import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Storage from "../../util/Storage"
import SearchWiki from "../search/SearchWiki";
import Grid from "@mui/material/Grid2";
import {Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel} from "@mui/material";
import Switch from '@mui/material/Switch';

export default function Settings() {

    const [reRender, setReRender] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [temporaryConfirm, setTemporaryConfirm] = React.useState(false);

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
                            Storage("delete", "", "Combatants")
                        }}
                    >Clear Saved Combatants</Button>
                    {settingsTitle("Characters")}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={async () => {
                            Storage("delete", "", "Characters")
                        }}
                    >Clear Characters</Button>
                    {settingsTitle("Notes")}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={async () => {
                            Storage("delete", "", "Notes")
                            Storage("set", "None", "Note")
                        }}
                    >Clear Notes</Button>
                    {settingsTitle("Search")}
                    <Button
                        variant="contained"
                        color="success"
                        onClick={async () => {
                            Storage("set", await SearchWiki(), "wikiData")
                        }}
                    >Refresh Data From Wiki</Button>
                </Grid>
                <Grid container direction="column" sx={{flexGrow: 1}}>
                    {settingsTitle("Confirmation")}
                    {Object.keys(Storage("get", "", "Confirm")).map((key) => (
                        <Grid>
                            <FormControlLabel control={
                                <Switch
                                    checked={Storage("get", "", "Confirm", key)}
                                    onChange={(event) => {
                                        Storage("set", event.target.checked, "Confirm", key)
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