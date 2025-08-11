import Stack from "@mui/material/Stack";
import EditButton from "./buttons/EditButton";
import DuplicateButton from "./buttons/DuplicateButton";
import SaveCombatantButton from "./buttons/SaveCombatantButton";
import NewButton from "./buttons/new_button/NewButton";
import DeleteButton from "./buttons/DeleteButton";
import * as React from "react";
import {alpha, useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";
import DamageButton from "./buttons/DamageButton";
import HealButton from "./buttons/HealButton";
import DetailsButton from "./buttons/DetailsButton";
import TurnButton from "./buttons/TurnButton";
import Card from "@mui/material/Card";

export default function ButtonBar({selected, setSelected, openEdit, setOpenEdit, setTab, setSearch, combatants, setCombatants, newCombatant}) {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const drop = React.useRef();

    const primaryButtons =
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
            <DamageButton selected={selected} setSelected={setSelected} combatants={combatants} setCombatants={setCombatants} />
            <HealButton selected={selected} setSelected={setSelected} combatants={combatants} setCombatants={setCombatants} />
            <TurnButton setSelected={setSelected} combatants={combatants} />
        </Stack>;

    const secondaryButtons =
        <>
            {selected && selected.character ?
                <DetailsButton selected={selected} setSelected={setSelected} setTab={setTab} setSearch={setSearch} />
                : null
            }
            <EditButton selected={selected} setSelected={setSelected} openEdit={openEdit} setOpenEdit={setOpenEdit} combatants={combatants} setCombatants={setCombatants} />
            <DuplicateButton selected={selected} setSelected={setSelected} combatants={combatants} newCombatant={newCombatant} />
            <SaveCombatantButton selected={selected} />
            <NewButton setSelected={setSelected} combatants={combatants} setCombatants={setCombatants} newCombatant={newCombatant} />
            <DeleteButton selected={selected} setSelected={setSelected} combatants={combatants} setCombatants={setCombatants} />
        </>;

    if (isSmallScreen) {
        return (
            <>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                        gap: 1
                    }}
                >
                    {primaryButtons}
                    <IconButton
                        ref={drop}
                        onClick={() => {
                            setOpen(!open);
                        }}
                        sx={(theme) => ({
                            color: theme.palette.text.primary,
                            border: '1px solid',
                            borderColor: theme.palette.grey[200],
                            backgroundColor: alpha(theme.palette.grey[50], 0.3),
                            '&:hover': {
                                backgroundColor: theme.palette.grey[100],
                                borderColor: theme.palette.grey[300],
                            },
                            '&:active': {
                                backgroundColor: theme.palette.grey[200],
                            },
                            ...theme.applyStyles('dark', {
                                backgroundColor: theme.palette.grey[800],
                                borderColor: theme.palette.grey[700],
                                '&:hover': {
                                    backgroundColor: theme.palette.grey[900],
                                    borderColor: theme.palette.grey[600],
                                },
                                '&:active': {
                                    backgroundColor: theme.palette.grey[900],
                                },
                            }),
                        })}
                    >
                        {open ? <ArrowDropUp/> : <ArrowDropDown/>}
                    </IconButton>
                </Stack>
                {!open ? null :
                    <>
                        <br/>
                        <Card>
                            <Stack direction="row" sx={{flexWrap: 'wrap', gap: 1}}>
                                {secondaryButtons}
                            </Stack>
                        </Card>
                    </>
                }
                <br/>
            </>
        )
    } else {
        return (
            <>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                    gap: 1
                }}
                >
                    {primaryButtons}
                    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }} justifyContent='flex-end' >
                        {secondaryButtons}
                    </Stack>
                </Stack>
                <br/>
            </>
        )
    }
}