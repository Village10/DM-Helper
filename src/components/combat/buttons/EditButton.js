import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Storage from "../../../util/Storage";

export default function EditButton({selected, setSelected, openEdit, setOpenEdit}) {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Button
                variant="outlined"
                size="small"
                color="success"
                endIcon={<EditIcon/>}
                fullWidth={isSmallScreen}
                onClick={selected ? () => setOpenEdit(true): null}
            >Edit</Button>
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}
                    PaperProps={{ component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            let instances = Storage("get", "", "Combat")
                            instances[instances.findIndex(obj => obj.id === selected.id)] = {
                                ...instances[instances.findIndex(obj => obj.id === selected.id)],
                                "name": formJson.name,
                                "health": parseInt(formJson.health),
                                "temp_health": parseInt(formJson.temp_health),
                                "armor": parseInt(formJson.armor),
                                "initiative": parseInt(formJson.initiative)
                            }
                            Storage("set", instances, "Combat")
                            setSelected(null)
                            setOpenEdit(false);
                        },
                    }}
            >
                <DialogTitle>Edit Combatant</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required margin="dense" id="name" name="name" label="Name" type="string" defaultValue={selected ? selected.name: null} fullWidth variant="standard"/>
                    <TextField autoFocus required margin="dense" id="health" name="health" label="Health" type="number" InputProps={{inputProps: { min: 0 }}} defaultValue={selected ? selected.health: null} fullWidth variant="standard"/>
                    <TextField autoFocus required margin="dense" id="temp_health" name="temp_health" label="Temporary Health" InputProps={{inputProps: { min: 0 }}} defaultValue={selected ? selected.temp_health: null} type="number" fullWidth variant="standard"/>
                    <TextField autoFocus required margin="dense" id="armor" name="armor" label="Armor Class" type="number" InputProps={{inputProps: { min: 0 }}} defaultValue={selected ? selected.armor: null} fullWidth variant="standard"/>
                    <TextField autoFocus margin="dense" id="initiative" name="initiative" label="Initiative" type="number" defaultValue={selected ? selected.initiative: null} fullWidth variant="standard"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                    <Button type="submit">Done</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}