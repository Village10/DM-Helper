import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid2";
import {CardActionArea} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import storage from "../../util/storage"
import PersonIcon from '@mui/icons-material/Person';
import ButtonBar from "./ButtonBar";
import {Combatant} from "./Combatant";
import {FavoriteBorder, HeartBrokenOutlined, ShieldOutlined} from "@mui/icons-material";

export default function Combat({setTab, setSearch}) {
    storage("createIfNeeded", {}, "Combatants")
    storage("createIfNeeded", [], "Combat")
    storage("createIfNeeded", [], "Characters")
    storage("createIfNeeded", 1, "Turn")

    // TODO: Rename "Combatants" storage
    const [combatants, setCombatants] = React.useState(storage("get", "", "Combat"))
    const [selected, setSelected] = React.useState(null);
    const [openEdit, setOpenEdit] = React.useState(false);

    function newCombatant(name, max_health, armor, character) {
        setCombatants((prev) => [new Combatant(name, max_health, armor, character), ...prev])
    }

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Typography variant="h1" align="center" style={{marginBottom: 20}}>Combat</Typography>
            <ButtonBar
                selected={selected}
                setSelected={setSelected}
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
                setTab={setTab} setSearch={setSearch}
                combatants={combatants}
                setCombatants={setCombatants}
                newCombatant={newCombatant}
            />
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                {combatants.sort((a, b) => {
                    if (!a.initiative) return 1
                    if (!b.initiative) return -1
                    return b.initiative - a.initiative
                }).map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <CardActionArea
                            onClick={() => {
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
                            sx={{ borderRadius: 1}}
                        >
                            <Card sx={(theme) => ({
                                height: '100%',
                                border: selected && item.id === selected.id ? "1px solid red": "1px solid #2f2f2f",
                                boxShadow: index === (storage("get", "", "Turn") - 1) % combatants.length ? `10px 10px 20px -5px ${theme.palette.secondary.main}` : "none" })}>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        color: item.health === 0 ? 'red' : 'primary',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '30px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {item.health + item.temp_health}
                                    {item.health > 0 ? <FavoriteBorder/> : <HeartBrokenOutlined/>}
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
                                        Max Health: {item.max_health}
                                        <br/>
                                        <ShieldOutlined/>{item.armor}
                                        <br/>
                                        Temporary Health: {item.temp_health}
                                        <br/>
                                        Initiative: {item.initiative ? item.initiative : "None"}
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