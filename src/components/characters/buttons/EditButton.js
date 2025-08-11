import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import storage from "../../../util/storage"

export default function EditButton({selected, setSelected}) {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [openEdit, setOpenEdit] = React.useState(false);
    
    return (
        <>
            <Button
                variant="outlined"
                size="small"
                color="success"
                endIcon={<EditIcon/>}
                fullWidth={isSmallScreen}
                onClick={selected ? () => setOpenEdit(true): null}
            >Edit</Button>
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}
                    PaperProps={{ component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            selected.name = formJson.name;
                            selected.level = parseInt(formJson.level);
                            selected.maxHealth = parseInt(formJson.health);
                            selected.armor = parseInt(formJson.armor);
                            selected.mainClass = formJson.mainClass;
                            selected.subClass = formJson.subClass;
                            selected.species = formJson.species;
                            selected.background = formJson.background;
                            storage("set", storage("get", "", "Characters").map(obj => obj.id === selected.id ? selected : obj), "Characters")
                            setSelected(null)
                            setOpenEdit(false);
                        },
                    }}
            >
                <DialogTitle>Edit Character</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required margin="dense" id="name" name="name" label="Name" type="string" fullWidth variant="standard" defaultValue={selected ? selected.name: null} />
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap'
                        }}
                    >
                        <TextField autoFocus required margin="dense" id="level" name="level" label="Level" type="number" InputProps={{inputProps: { min: 1 }}} variant="standard" defaultValue={selected ? selected.level: null} />
                        <TextField autoFocus required margin="dense" id="health" name="health" label="Max Health" type="number" InputProps={{inputProps: { min: 1 }}} variant="standard" defaultValue={selected ? selected.maxHealth: null} />
                        <TextField autoFocus required margin="dense" id="armor" name="armor" label="Armor Class" type="number" InputProps={{inputProps: { min: 0 }}} variant="standard" defaultValue={selected ? selected.armor: null} />
                    </Box>
                    <TextField autoFocus required margin="dense" id="mainClass" name="mainClass" label="Class" type="string" fullWidth variant="standard" defaultValue={selected ? selected.mainClass: null} />
                    <TextField autoFocus required margin="dense" id="subClass" name="subClass" label="Sub-Class" type="string" fullWidth variant="standard" defaultValue={selected ? selected.subClass: null} />
                    <TextField autoFocus required margin="dense" id="species" name="species" label="Species" type="string" fullWidth variant="standard" defaultValue={selected ? selected.species: null} />
                    <TextField autoFocus required margin="dense" id="background" name="background" label="Background" type="string" fullWidth variant="standard" defaultValue={selected ? selected.background: null} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                    <Button type="submit">Done</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}