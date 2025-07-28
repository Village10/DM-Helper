import {
    ButtonGroup,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup, TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {Combatant} from "../Combatant";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useState} from "react";
import Storage from "../../../util/Storage";


export default function NewButton({selected, setSelected}) {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [openNew, setOpenNew] = React.useState(false);
    const [openDrop, setOpenDrop] = React.useState(false);
    const [openSaved, setOpenSaved] = React.useState(false);
    const [openCharacter, setOpenCharacter] = React.useState(false);
    const drop = React.useRef();
    let [saveChecked, setSaveChecked] = useState([]);

    return (
        <>
            <ButtonGroup>
                <Button
                    variant="outlined"
                    size="small"
                    endIcon={<AddIcon/>}
                    fullWidth={isSmallScreen}
                    onClick={() => setOpenNew(true)}
                >New</Button>
                <Button
                    ref={drop}
                    size="small"
                    sx={{padding: 0}}
                    aria-controls={openDrop ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openDrop ? 'true' : undefined}
                    onClick={() => setOpenDrop(true)}
                ><ArrowDropDownIcon/></Button>
            </ButtonGroup>
            <Menu
                anchorEl={drop.current}
                open={openDrop}
                onClose={() => setOpenDrop(false)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {setOpenDrop(false); setOpenNew(true);}}>From Text</MenuItem>
                <MenuItem onClick={() => {setOpenDrop(false); setOpenSaved(true); setSaveChecked([]);}}>From Save</MenuItem>
                <MenuItem onClick={() => {setOpenDrop(false); setOpenCharacter(true); setSaveChecked([]);}}>From Character</MenuItem>
            </Menu>
            <Dialog open={openSaved} onClose={() => setOpenSaved(false)}
                    PaperProps={{ component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            for (let thing in saveChecked) {
                                if (saveChecked[thing]) {
                                    let character = Storage("get", "", "Combatants", thing);
                                    new Combatant(character.name, character.max_health, character.armor)
                                }
                            }
                            setSelected(Storage("get", "", "Combat").at(-1))
                            setOpenSaved(false);
                        },
                    }}
            >
                <DialogTitle>New Combatant(s) From Save</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        {Object.keys(Storage("get", "", "Combatants")).map((key) => (
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        onClick={(event) => {
                                            setSaveChecked((prevSaveChecked) => ({
                                                ...prevSaveChecked,
                                                [key]: event.target.checked
                                            }));
                                        }}
                                        checked={saveChecked[key]}
                                    />
                                }
                                label={key}
                            />
                        ))}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpenCharacter(false); setSaveChecked([])}}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openCharacter} onClose={() => setOpenCharacter(false)}
                    PaperProps={{ component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            for (let character in saveChecked) {
                                new Combatant(saveChecked[character].name, saveChecked[character].maxHealth, saveChecked[character].armor, saveChecked[character])
                            }
                            setSelected(Storage("get", "", "Combat").at(-1))
                            setOpenCharacter(false);
                        },
                    }}
            >
                <DialogTitle>New Combatant(s) From Character(s)</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        {Storage("get", "", "Characters").map((character) => (
                            <FormControlLabel
                                key={character.id}
                                control={
                                    <Checkbox
                                        onClick={(event) => {
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
            <Dialog open={openNew} onClose={() => setOpenNew(false)}
                    PaperProps={{ component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            new Combatant(formJson.name, formJson.health, formJson.armor);
                            setSelected(Storage("get", "", "Combat").at(-1))
                            let instances = Storage("get", "", "Combat")
                            instances.at(-1).initiative = formJson.initiative ? formJson.initiative : null
                            Storage("set", instances, "Combat")
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
        </>
    )
}