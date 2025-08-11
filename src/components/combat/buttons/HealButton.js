import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import {Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField} from "@mui/material";
import * as React from "react";
import storage from "../../../util/storage"

export default function DamageButton({selected, setSelected, combatants, setCombatants}) {

    const [openHeal, setOpenHeal] = React.useState(false)
    const [temporary, setTemporary] = React.useState(false)
    
    return (
        <>
            <Button
                variant="outlined"
                size="small"
                color="success"
                endIcon={<LocalHospitalIcon/>}
                onClick={selected ? () => setOpenHeal(true) : null}
            >Heal</Button>
            <Dialog open={openHeal} onClose={() => {setOpenHeal(false); setTemporary(false)}}
                    PaperProps={{ component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            let instances = combatants
                            let index = instances.findIndex(obj => obj.id === selected.id)
                            if (temporary) {
                                instances.at(instances.findIndex(obj => obj.id === selected.id)).temp_health = parseInt(formJson.health)
                            }
                            else {
                                instances.at(index).health = Math.max(Math.min(instances.at(index).health + parseInt(formJson.health), instances.at(index).max_health), 0)
                            }
                            setCombatants(instances)
                            setTemporary(false)
                            setSelected(null)
                            setOpenHeal(false);
                        },
                    }}
            >
                <DialogTitle>Heal Combatant</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required margin="dense" id="health" name="health" label="Health" type="number" InputProps={{inputProps: { min: 0 }}} fullWidth variant="standard"/>
                    <FormControlLabel control={<Checkbox checked={temporary} onClick={() => temporary ? setTemporary(false):setTemporary(true) } />} label="Temporary Health" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpenHeal(false); setTemporary(false)}}>Cancel</Button>
                    <Button type="submit">Heal</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}