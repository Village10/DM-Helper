import { ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useState } from "react";
import FromSave from "./FromSave";
import FromCharacter from "./FromCharacter";
import FromText from "./FromText";
import FromMonster from "./FromMonster";

export default function NewButton({setSelected, newCombatant, combatants, setCombatants}) {

    const [openNew, setOpenNew] = React.useState(false);
    const [openDrop, setOpenDrop] = React.useState(false);
    const [openSaved, setOpenSaved] = React.useState(false);
    const [openCharacter, setOpenCharacter] = React.useState(false);
    const [openMonster, setOpenMonster] = React.useState(false);
    const drop = React.useRef();
    let [saveChecked, setSaveChecked] = useState([]);

    return (
        <>
            <ButtonGroup>
                <Button
                    variant="outlined"
                    size="small"
                    endIcon={<AddIcon/>}
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
                <MenuItem onClick={() => {setOpenDrop(false); setOpenMonster(true); setSaveChecked([]);}}>From Monster</MenuItem>
            </Menu>
            <FromSave
                openSaved={openSaved}
                setOpenSaved={setOpenSaved}
                saveChecked={saveChecked}
                setSaveChecked={setSaveChecked}
                combatants={combatants}
                newCombatant={newCombatant}
                setSelected={setSelected}
            />
            <FromText
                newCombatant={newCombatant}
                setSelected={setSelected}
                combatants={combatants}
                setCombatants={setCombatants}
                openNew={openNew}
                setOpenNew={setOpenNew}
            />
            <FromCharacter
                saveChecked={saveChecked}
                setSaveChecked={setSaveChecked}
                combatants={combatants}
                newCombatant={newCombatant}
                setSelected={setSelected}
                openCharacter={openCharacter}
                setOpenCharacter={setOpenCharacter}
            />
            <FromMonster
                setOpenMonster={setOpenMonster}
                combatants={combatants}
                newCombatant={newCombatant}
                saveChecked={saveChecked}
                setSelected={setSelected}
                openMonster={openMonster}
                setSaveChecked={setSaveChecked}
            />
        </>
    )
}