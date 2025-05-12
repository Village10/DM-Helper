import Button from "@mui/material/Button";
import {Delete} from "@mui/icons-material";
import Storage from "../../../util/Storage";
import {Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel} from "@mui/material";
import * as React from "react";

export default function DeleteButton({value, setValue}) {
    
    const [openDelete, setOpenDelete] = React.useState(false);
    const [error, setError] = React.useState(false);

    return (
        <>
            <Button
                variant="contained"
                color="error"
                endIcon={<Delete/>}
                size="small"
                onClick={ () => {
                    if (Storage("get","", "Note") !== "None") {
                        if (Storage("get", "", "Confirm", "deleting a note")) {
                            setOpenDelete(true)
                        } else {
                            Storage("delete", "", "Notes", Storage("get", "", "Note"))
                            Storage("set", "None", "Note")
                            setValue(value + " ")
                        }
                    }}}
            >Delete</Button>
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}
                    PaperProps={{ component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            if (error) {
                                Storage("set", false, "Confirm", "deleting a note")
                            }
                            Storage("delete", "", "Notes", Storage("get", "", "Note"))
                            Storage("set", "None", "Note")
                            setValue(value + " ")
                            setOpenDelete(false);
                        },
                    }}
            >
                <DialogTitle>Delete Note</DialogTitle>
                <DialogContent>
                    <FormControlLabel control={<Checkbox checked={error} onClick={() => error ? setError(false):setError(true) } />} label="Don't ask again" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
                    <Button type="submit" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}