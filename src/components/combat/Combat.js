import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid2";
import {CardActionArea} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DamageButton from "./buttons/DamageButton";
import HealButton from "./buttons/HealButton";
import EditButton from "./buttons/EditButton";
import DuplicateButton from "./buttons/DuplicateButton";
import SaveCombatantButton from "./buttons/SaveCombatantButton";
import NewButton from "./buttons/NewButton";
import DeleteButton from "./buttons/DeleteButton";
import Storage from"../../util/Storage"
import DetailsButton from "./buttons/DetailsButton";
import PersonIcon from '@mui/icons-material/Person';
import TurnButton from "./buttons/TurnButton"

export default function Combat({setTab, setSearch}) {
    Storage("createIfNeeded", {}, "Combatants")
    Storage("createIfNeeded", [], "Combat")
    Storage("createIfNeeded", [], "Characters")
    Storage("createIfNeeded", 1, "Turn")

    let [selected, setSelected] = React.useState(null);
    const [openEdit, setOpenEdit] = React.useState(false);

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Typography variant="h1" align="center" style={{marginBottom: 20}}>Combat</Typography>
            <Grid
                container
                spacing={1}
                sx={{mb: (theme) => theme.spacing(2)}}
                justifyContent="space-between"
            >
                <Grid container>
                    <DamageButton selected={selected} setSelected={setSelected} ></DamageButton>
                    <HealButton selected={selected} setSelected={setSelected} ></HealButton>
                    {selected && selected.character ? <DetailsButton selected={selected} setSelected={setSelected} setTab={setTab} setSearch={setSearch}></DetailsButton> : null}
                </Grid>
                <Grid container>
                    <TurnButton selected={selected} setSelected={setSelected} ></TurnButton>
                    <EditButton selected={selected} setSelected={setSelected} openEdit={openEdit} setOpenEdit={setOpenEdit} ></EditButton>
                    <DuplicateButton selected={selected} setSelected={setSelected} ></DuplicateButton>
                    <SaveCombatantButton selected={selected} ></SaveCombatantButton>
                    <NewButton selected={selected} setSelected={setSelected} ></NewButton>
                    <DeleteButton selected={selected} setSelected={setSelected} ></DeleteButton>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                {Storage("get", "", "Combat").sort((a, b) => {
                    if (!a.initiative) return 1
                    if (!b.initiative) return -1
                    return b.initiative - a.initiative
                }).map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <CardActionArea onClick={() => {
                            if (selected && selected.id === item.id) {
                                setSelected(null)
                            }
                            else {
                                setSelected(item)
                            }
                        }}
                        onDoubleClick={() => {
                            setSelected(item)
                            setOpenEdit(true)
                        }}
                        >
                            <Card sx={{
                                height: '100%',
                                border: selected && item.id === selected.id ? "1px solid red": "1px solid #2f2f2f",
                                boxShadow: index === (Storage("get", "", "Turn") - 1) % Storage("get", "", "Combat").length ? "0px 0px 5px 1px yellow" : "none" }}>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        color: item.health === 0 ? 'red' : 'primary',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'right',
                                        justifyContent: 'right',
                                        fontSize: '30px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {item.health + item.temp_health}
                                </Box>
                                <CardContent>
                                    <Typography
                                        component="h2"
                                        variant="subtitle2"
                                        gutterBottom
                                        sx={{ fontWeight: '600', display: 'flex', alignItems: 'center' }}
                                    >
                                        {item.character ? <PersonIcon/> : null}{item.name}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
                                        Health: {item.health}<br/>Temporary Health: {item.temp_health}<br/>Max Health: {item.max_health}<br/>Armor Class: {item.armor}<br/>Initiative: {item.initiative ? item.initiative : "None"}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>
    </Box>
    )
}