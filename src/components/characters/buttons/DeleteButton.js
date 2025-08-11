import {
    ButtonGroup,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup
} from "@mui/material";
import Button from "@mui/material/Button";
import Delete from "@mui/icons-material/Delete";
import {Character} from "../Character";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useState} from "react";
import {useTheme} from "@mui/material/styles";
import storage from "../../../util/storage"

export default function DeleteButton({selected, setSelected}) {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [openDelete, setOpenDelete] = React.useState(false);
    const [temporaryConfirm, setTemporaryConfirm] = React.useState(false);

    function handleDelete(popup) {
        if (selected) {
            if (storage("get", "", "Confirm", "deleting a character") && popup) {
                setOpenDelete(true)
            } else {
                let instances = storage("get", "", "Characters")
                let selected_place = instances.findIndex(item => item.id === selected.id);
                instances.splice(selected_place, 1);
                setSelected(instances[Math.max(Math.min(selected_place, instances.length - 1), 0)])
                storage("set", instances, "Characters")
            }
        }
    }

    return (
        <>
            <Button
                variant={"contained"}
                endIcon={<Delete/>}
                size="small"
                fullWidth={isSmallScreen}
                onClick={ () => {handleDelete(true)}}
                color={"error"}
            >Delete</Button>
            <Dialog open={openDelete} onClose={() => {setOpenDelete(false); setTemporaryConfirm(false)}}
                    PaperProps={{ component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault()
                            if (temporaryConfirm) {
                                storage("set", false, "Confirm", "deleting a character")
                                setTemporaryConfirm(false)
                            }
                            handleDelete(false)
                            setOpenDelete(false)
                        },
                    }}
            >
                <DialogTitle>Delete Character</DialogTitle>
                <DialogContent>
                    <FormControlLabel control={<Checkbox checked={temporaryConfirm} onClick={() => temporaryConfirm ? setTemporaryConfirm(false) : setTemporaryConfirm(true) } />} label="Don't ask again" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpenDelete(false); setTemporaryConfirm(false)}}>Cancel</Button>
                    <Button type="submit" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}