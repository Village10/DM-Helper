import {Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup} from "@mui/material";
import storage from "../../../../util/storage";
import Button from "@mui/material/Button";
import * as React from "react";

export default function FromCharacter({saveChecked, setSaveChecked, openCharacter, setOpenCharacter, setSelected, combatants, newCombatant}) {
    return (
        <Dialog open={openCharacter} onClose={() => setOpenCharacter(false)}
                PaperProps={{ component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        for (let character in saveChecked) {
                            newCombatant(saveChecked[character].name, saveChecked[character].maxHealth, saveChecked[character].armor, saveChecked[character])
                        }
                        setSelected(combatants.at(-1))
                        setOpenCharacter(false);
                    },
                }}
        >
            <DialogTitle>New Combatant(s) From Character(s)</DialogTitle>
            <DialogContent>
                <FormGroup>
                    {storage("get", "", "Characters").map((character) => (
                        <FormControlLabel
                            key={character.id}
                            control={
                                <Checkbox
                                    onClick={() => {
                                        if (saveChecked[character.id]) {
                                            setSaveChecked(({[character.id]: _,prevSaveChecked}) => ({
                                                ...prevSaveChecked
                                            }));
                                        } else {
                                            setSaveChecked((prevSaveChecked) => ({
                                                ...prevSaveChecked,
                                                [character.id]: character
                                            }));
                                        }
                                    }}
                                    checked={saveChecked[character.id]}
                                />
                            }
                            label={character.name}
                        />
                    ))}
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {setOpenCharacter(false); setSaveChecked([])}}>Cancel</Button>
                <Button type="submit">Create</Button>
            </DialogActions>
        </Dialog>
    )
}