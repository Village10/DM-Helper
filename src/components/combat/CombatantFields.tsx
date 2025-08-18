import {DialogContent, TextField} from "@mui/material";
import * as React from "react";
import {Combatant} from "./Combatant";

interface CombatantFieldsProps {
    selected: Combatant | null
}

export default function CombatantFields({selected}: CombatantFieldsProps) {
    return (
        <DialogContent>
            <TextField
                autoFocus
                required
                margin='dense'
                id='name'
                name='name'
                label='Name'
                type='string'
                fullWidth
                variant='standard'
                slotProps={{ htmlInput: { maxLength: 20 }}}
                defaultValue={selected?.name}
                helperText='Max 20 characters'
            />
            <TextField
                autoFocus
                required
                margin='dense'
                id='health'
                name='health'
                label='Max Health'
                type='number'
                slotProps={{ input: { inputProps: { min: 0 } } }}
                defaultValue={selected?.maxHealth}
                fullWidth
                variant='standard'
            />
            <TextField
                autoFocus
                required
                margin='dense'
                id='armor'
                name='armor'
                label='Armor Class'
                type='number'
                slotProps={{ input: { inputProps: { min: 0 } } }}
                defaultValue={selected?.armor}
                fullWidth
                variant='standard'
            />
            <TextField
                autoFocus
                margin='dense'
                id='initiative'
                name='initiative'
                label='Initiative'
                type='number'
                fullWidth
                variant='standard'
                defaultValue={selected?.initiative}
            />
        </DialogContent>
    )
}