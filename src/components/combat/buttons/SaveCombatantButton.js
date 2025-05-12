import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Storage from "../../../util/Storage"

export default function SaveCombatantButton({selected}) {
    
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [openSave, setOpenSave] = React.useState(false);
    const [error, setError] = React.useState(false);
    
    return (
        <>
            <Button
                variant="outlined"
                size="small"
                color="success"
                endIcon={<SaveIcon/>}
                fullWidth={isSmallScreen}
                onClick={selected ? () => setOpenSave(true): null}
            >Save Combatant</Button>
            <Dialog open={openSave} onClose={() => {setOpenSave(false); setError(false)}}
                    PaperProps={{ component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault()
                            const formData = new FormData(event.currentTarget)
                            const formJson = Object.fromEntries(formData.entries())
                            let saved = Storage("get", "", "Combatants")
                            if (Object.keys(saved).includes(formJson.name)) {
                                setError(true)
                            } else {
                                Storage("set", selected, "Combatants", formJson.name)
                                setOpenSave(false)
                                setError(false)
                            }
                        },
                    }}
            >
                <DialogTitle>Save Combatant</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required error={error} margin="dense" id="name" name="name" label="Save as..." type="string" fullWidth variant="standard" helperText={error ? "Combatant already exists.": ""}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpenSave(false); setError(false)}}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}