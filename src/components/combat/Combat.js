import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Combatant} from "./Combatant";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Delete from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    ButtonGroup,
    CardActionArea,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel, FormGroup,
    TextField
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useState} from "react";

export default function Combat() {
    if (!localStorage.getItem('saved')) {
        localStorage.setItem('saved', JSON.stringify([]))
    }
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = React.useState({
        damage: false,
        heal: false,
        temporary: false,
        edit: false,
        new: false,
        delete: false,
        temporaryconfirm: false,
        donotconfirm: false,
        save: false,
        errorsave: false,
        newdrop: false,
        newsaved: false,
        anchorEl: React.useState<null | HTMLElement>null
    });

    const [savechecked, setSavechecked] = React.useState([]);

    {JSON.parse(localStorage.getItem('saved')).map((item, index) => (savechecked[index] = false))

    function HandleClickOpen(thing) {
        setOpen((prevOpen) => ({
            ...prevOpen,
            [thing]: true,
        }));
    };

    function HandleClose(thing){
        setOpen((prevOpen) => ({
            ...prevOpen,
            [thing]: false,
        }));
    };

    let [selected, setSelected] = React.useState(null);

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                Overview
            </Typography>
            <Grid
                container
                spacing={2}
                sx={{mb: (theme) => theme.spacing(2)}}
                justifyContent="space-between"
            >
                <Grid container>
                    <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        endIcon={<BoltIcon/>}
                        fullWidth={isSmallScreen}
                        onClick={selected ? () => HandleClickOpen("damage") : null}
                    >Damage</Button>
                    <Dialog open={open["damage"]} onClose={() => HandleClose("damage")}
                            PaperProps={{ component: 'form',
                                onSubmit: (event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries(formData.entries());
                                    selected.ChangeHealth(formJson.damage * -1);
                                    setSelected(null)
                                    HandleClose("damage");
                                },
                            }}
                    >
                        <DialogTitle>Damage Combatant</DialogTitle>
                        <DialogContent>
                            <TextField autoFocus required margin="dense" id="damage" name="damage" label="Damage" type="number" fullWidth variant="standard"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => HandleClose("damage")}>Cancel</Button>
                            <Button type="submit">Damage</Button>
                        </DialogActions>
                    </Dialog>
                    <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        endIcon={<LocalHospitalIcon/>}
                        fullWidth={isSmallScreen}
                        onClick={selected ? () => HandleClickOpen("heal") : null}
                    >Heal</Button>
                    <Dialog open={open["heal"]} onClose={() => HandleClose("heal")}
                            PaperProps={{ component: 'form',
                                onSubmit: (event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries(formData.entries());
                                    if (open["temporary"]) {
                                        selected.temp_health = parseInt(formJson.health)
                                    }
                                    else {
                                        selected.ChangeHealth(parseInt(formJson.health));
                                    }
                                    open["temporary"] = false;
                                    setSelected(null)
                                    HandleClose("heal");
                                },
                            }}
                    >
                        <DialogTitle>Damage Combatant</DialogTitle>
                        <DialogContent>
                            <TextField autoFocus required margin="dense" id="health" name="health" label="Health" type="number" fullWidth variant="standard"/>
                            <FormControlLabel control={<Checkbox checked={open["temporary"]} onClick={() => open["temporary"] ? HandleClose("temporary"):HandleClickOpen("temporary") } />} label="Temporary Health" />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => HandleClose("heal")}>Cancel</Button>
                            <Button type="submit">Heal</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                <Grid container>
                    <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        endIcon={<EditIcon/>}
                        fullWidth={isSmallScreen}
                        onClick={selected ? () => HandleClickOpen("edit"): null}
                    >Edit</Button>
                    <Dialog open={open["edit"]} onClose={() => HandleClose("edit")}
                            PaperProps={{ component: 'form',
                                onSubmit: (event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries(formData.entries());
                                    selected.name = formJson.name;
                                    selected.health = parseInt(formJson.health);
                                    selected.temp_health = parseInt(formJson.temp_health);
                                    selected.armor = parseInt(formJson.armor);
                                    setSelected(null);
                                    HandleClose("edit");
                                },
                            }}
                    >
                        <DialogTitle>Damage Combatant</DialogTitle>
                        <DialogContent>
                            <TextField autoFocus required margin="dense" id="name" name="name" label="Name" type="string" defaultValue={selected ? selected.name: null} fullWidth variant="standard"/>
                            <TextField autoFocus required margin="dense" id="health" name="health" label="Health" type="number" defaultValue={selected ? selected.health: null} fullWidth variant="standard"/>
                            <TextField autoFocus required margin="dense" id="temp_health" name="temp_health" label="Temporary Health" defaultValue={selected ? selected.temp_health: null} type="number" fullWidth variant="standard"/>
                            <TextField autoFocus required margin="dense" id="armor" name="armor" label="Armor Class" type="number" defaultValue={selected ? selected.armor: null} fullWidth variant="standard"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => HandleClose("edit")}>Cancel</Button>
                            <Button type="submit">Edit</Button>
                        </DialogActions>
                    </Dialog>
                    <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        endIcon={<ContentCopyIcon/>}
                        fullWidth={isSmallScreen}
                        onClick={() => {if (selected) {
                            new Combatant(selected.name, selected.max_health, selected.armor);
                            Combatant.instances[0].temp_health = selected.temp_health;
                            Combatant.instances[0].health = selected.health;
                            setSelected(Combatant.instances[Combatant.instances.length - 1])
                        }}}
                    >Duplicate</Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        endIcon={<SaveIcon/>}
                        fullWidth={isSmallScreen}
                        onClick={selected ? () => HandleClickOpen("save"): null}
                    >Save Combatant</Button>
                    <Dialog open={open["save"]} onClose={() => {HandleClose("save"); HandleClose("errorsave")}}
                        PaperProps={{ component: 'form',
                            onSubmit: (event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries(formData.entries());
                                let saved = JSON.parse(localStorage.getItem('saved'))
                                if (saved.includes(formJson.name)) {
                                    HandleClickOpen("errorsave")
                                } else {
                                    saved.push(formJson.name);
                                    localStorage.setItem(formJson.name, selected)
                                    localStorage.setItem("saved", JSON.stringify(saved))
                                    console.log(saved)
                                    HandleClose("errorsave")
                                    HandleClose("save");
                                }
                            },
                        }}
                    >
                        <DialogTitle>Save Combatant</DialogTitle>
                        <DialogContent>
                            <TextField autoFocus required error={open["errorsave"]} margin="dense" id="name" name="name" label="Save as..." type="string" fullWidth variant="standard" helperText={open["errorsave"] ? "Combatant already exists.": ""}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {HandleClose("save"); HandleClose("errorsave")}}>Cancel</Button>
                            <Button type="submit">Create</Button>
                        </DialogActions>
                    </Dialog>
                    <ButtonGroup>
                        <Button
                            variant="outlined"
                            size="small"
                            color="success"
                            endIcon={<AddIcon/>}
                            fullWidth={isSmallScreen}
                            onClick={() => HandleClickOpen("new")}
                        >New</Button>
                        <Button
                            size="small"
                            aria-controls={open["newdrop"] ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open["newdrop"] ? 'true' : undefined}
                            onClick={(event) => {HandleClickOpen("newdrop"); open["anchorEl"] = event.currentTarget}}
                        ><ArrowDropDownIcon/></Button>
                    </ButtonGroup>
                    <Menu
                        anchorEl={open["anchorEl"]}
                        open={open["newdrop"]}
                        onClose={() => HandleClose("newdrop")}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => {HandleClose("newdrop"); HandleClickOpen("newsaved")}}>From Save</MenuItem>
                    </Menu>
                    <Dialog open={open["newsaved"]} onClose={() => HandleClose("newsaved")}
                            PaperProps={{ component: 'form',
                                onSubmit: (event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries(formData.entries());
                                    HandleClose("newsaved");
                                },
                            }}
                    >
                        <DialogTitle>New Combatant From Save</DialogTitle>
                        <DialogContent>
                            <FormGroup>
                                {JSON.parse(localStorage.getItem('saved')).map((item, index) => (
                                    <Checkbox
                                        onClick={(event, checked) => {
                                            let newsavechecked = [...savechecked]
                                            newsavechecked[index] = event.target.checked;
                                            console.log(newsavechecked)
                                            setSavechecked(newsavechecked)
                                            console.log(savechecked)
                                        }}
                                        checked={savechecked[index]}
                                        label={item}
                                    />
                                ))}
                            </FormGroup>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => HandleClose("newsaved")}>Cancel</Button>
                            <Button type="submit">Create</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={open["new"]} onClose={() => HandleClose("new")}
                        PaperProps={{ component: 'form',
                            onSubmit: (event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries(formData.entries());
                                new Combatant(formJson.name, formJson.health, formJson.armor);
                                HandleClose("new");
                            },
                        }}
                    >
                        <DialogTitle>New Combatant</DialogTitle>
                        <DialogContent>
                            <TextField autoFocus required margin="dense" id="name" name="name" label="Name" type="string" fullWidth variant="standard"/>
                            <TextField autoFocus required margin="dense" id="health" name="health" label="Max Health" type="number" fullWidth variant="standard"/>
                            <TextField autoFocus required margin="dense" id="armor" name="armor" label="Armor Class" type="number" fullWidth variant="standard"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => HandleClose("new")}>Cancel</Button>
                            <Button type="submit">Create</Button>
                        </DialogActions>
                    </Dialog>
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        endIcon={<Delete/>}
                        fullWidth={isSmallScreen}
                        onClick={ () => { if (selected) {
                                if (open["donotconfirm"]) {
                                    let selected_place = Combatant.instances.indexOf(selected) - 1
                                    Combatant.instances.splice(Combatant.instances.indexOf(selected), 1);
                                    if (selected_place < 0) {setSelected(Combatant.instances[0])} else {setSelected(Combatant.instances[selected_place])}
                                } else {
                                    HandleClickOpen("delete")
                                }
                            }
                        }}
                    >Delete</Button>
                    <Dialog open={open["delete"]} onClose={() => HandleClose("delete")}
                            PaperProps={{ component: 'form',
                                onSubmit: (event) => {
                                    event.preventDefault();
                                    let selected_place = Combatant.instances.indexOf(selected) - 1
                                    Combatant.instances.splice(Combatant.instances.indexOf(selected), 1)
                                    if (open["temporaryconfirm"]) {
                                        open["donotconfirm"] = true;
                                    }
                                    setSelected(Combatant.instances[selected_place])
                                    HandleClose("delete");
                                },
                            }}
                    >
                        <DialogTitle>Delete Combatant</DialogTitle>
                        <DialogContent>
                            <FormControlLabel control={<Checkbox checked={open["temporaryconfirm"]} onClick={() => open["temporaryconfirm"] ? HandleClose("temporaryconfirm"):HandleClickOpen("temporaryconfirm") } />} label="Don't ask again" />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => HandleClose("delete")}>Cancel</Button>
                            <Button type="submit" color="error">Delete</Button>
                        </DialogActions>
                    </Dialog>
                    </Grid>
                </Grid>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                {Combatant.instances.map((item) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <CardActionArea onClick={() => {
                            if (selected !== item) {
                                setSelected(item)
                            }
                            else {
                                setSelected(null)
                            }
                        }}>
                            <Card sx={{ height: '100%', border: item === selected ? "1px solid red": "1px solid #2f2f2f" }}>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '12px', // Adjust as needed for spacing
                                        right: '12px', // Adjust as needed for spacing
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
                                        sx={{ fontWeight: '600' }}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
                                        Health: {item.health}<br/>Temporary Health: {item.temp_health}<br/>Max Health: {item.max_health}<br/>Armor Class: {item.armor}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>
    </Box>
    )
}}