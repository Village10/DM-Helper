import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import BoltIcon from "@mui/icons-material/Bolt";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";
import Storage from "../../../util/Storage";

export default function DamageButton({selected, setSelected}) {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [openDamage, setOpenDamage] = React.useState(false)
    
    return (
        <>
            <Button
                variant="outlined"
                size="small"
                color="primary"
                endIcon={<BoltIcon/>}
                fullWidth={isSmallScreen}
                onClick={selected ? () => setOpenDamage(true) : null}
            >Damage</Button>
            <Dialog open={openDamage} onClose={() => setOpenDamage(false)}
                    PaperProps={{ component: 'form',
                        onSubmit: (event) => {
                            let instances = Storage("get", "", "Combat")
                            let instance = instances.at(instances.findIndex(obj => obj.id === selected.id))
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            let damage = Object.fromEntries(formData.entries()).damage;
                            if (damage <= instance.temp_health) {
                                instance.temp_health -= damage;
                                damage = 0;
                            } else {
                                damage -= instance.temp_health;
                                instance.temp_health = 0;
                            }
                            instance.health = Math.max(instance.health - damage, 0)
                            instances[instances.findIndex(obj => obj.id === selected.id)] = instance
                            Storage("set", instances, "Combat")
                            setSelected(null)
                            setOpenDamage(false);
                        },
                    }}
            >
                <DialogTitle>Damage Combatant</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required margin="dense" id="damage" name="damage" label="Damage" type="number" InputProps={{inputProps: { min: 0 }}} fullWidth variant="standard"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDamage(false)}>Cancel</Button>
                    <Button type="submit">Damage</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}