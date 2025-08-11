import {ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import storage from "../../../util/storage";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";


export default function TurnButton({setSelected, combatants}) {

    const [openTurn, setOpenTurn] = React.useState(false);

    return (
        <>
            <Stack gap={0} direction={"row"}>
                <IconButton
                    size="small"
                    sx={{marginRight: 0}}
                    onClick={() => {
                        const turn = storage("get", "", "Turn")
                        if (turn > 1) {
                            storage("set", turn - 1, "Turn")
                            setSelected(combatants.sort((a, b) => {
                                if (!a.initiative) return 1
                                if (!b.initiative) return -1
                                return b.initiative - a.initiative
                            }).at((turn - 2) % combatants.length))
                        }
                    }}
                ><KeyboardArrowLeftIcon/></IconButton>
                <Button
                    variant="outlined"
                    sx={{margin: 0}}
                    size="small"
                    onClick={() => setOpenTurn(true)}
                >Turn: {storage("get", "", "Turn")}</Button>
                <IconButton
                    size="small"
                    sx={{marginLeft: 0}}
                    onClick={() => {
                        const turn = storage("get", "", "Turn")
                        storage("set", turn + 1, "Turn")
                        setSelected(combatants.sort((a, b) => {
                            if (!a.initiative) return 1
                            if (!b.initiative) return -1
                            return b.initiative - a.initiative
                        }).at((turn) % combatants.length))
                    }}
                ><KeyboardArrowRightIcon/></IconButton>
            </Stack>
            <Dialog open={openTurn} onClose={() => setOpenTurn(false)}
                    PaperProps={{ component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            storage("set", parseInt(Object.fromEntries(formData.entries()).turn), "Turn")
                            setSelected(storage("get", "", "Combat").sort((a, b) => {
                                if (!a.initiative) return 1
                                if (!b.initiative) return -1
                                return b.initiative - a.initiative
                            }).at((storage("get", "", "Turn") - 1) % combatants.length))
                            setOpenTurn(false);
                        },
                    }}
            >
                <DialogTitle>Change Turn</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required margin="dense" id="turn" name="turn" label="Turn" type="number" InputProps={{inputProps: { min: 1 }}} fullWidth variant="standard"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenTurn(false)}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}