import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";

export default function FromText({openNew, setOpenNew, combatants, setCombatants, newCombatant, setSelected}) {
    return (
        <Dialog open={openNew} onClose={() => setOpenNew(false)}
                PaperProps={{ component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        newCombatant(formJson.name, formJson.health, formJson.armor);
                        setSelected(combatants.at(-1))
                        let instances = combatants
                        instances.at(-1).initiative = formJson.initiative ? formJson.initiative : null
                        setCombatants(instances)
                        setOpenNew(false);
                    },
                }}
        >
            <DialogTitle>New Combatant</DialogTitle>
            <DialogContent>
                <TextField autoFocus required margin="dense" id="name" name="name" label="Name" type="string" fullWidth variant="standard"/>
                <TextField autoFocus required margin="dense" id="health" name="health" label="Max Health" type="number" InputProps={{inputProps: { min: 0 }}} fullWidth variant="standard"/>
                <TextField autoFocus required margin="dense" id="armor" name="armor" label="Armor Class" type="number" InputProps={{inputProps: { min: 0 }}} fullWidth variant="standard"/>
                <TextField autoFocus margin="dense" id="initiative" name="initiative" label="Initiative" type="number" fullWidth variant="standard"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenNew(false)}>Cancel</Button>
                <Button type="submit">Create</Button>
            </DialogActions>
        </Dialog>
    )
}