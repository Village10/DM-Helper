import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {Character} from "../Character";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useState} from "react";
import storage from "../../../util/storage";
import Box from "@mui/material/Box";


export default function NewButton({selected, setSelected}) {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [openNew, setOpenNew] = React.useState(false);

    return (
        <>
            <Button
                variant="outlined"
                size="small"
                endIcon={<AddIcon/>}
                fullWidth={isSmallScreen}
                onClick={() => setOpenNew(true)}
            >New</Button>
            <Dialog open={openNew} onClose={() => setOpenNew(false)}
                    PaperProps={{ component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            new Character(formJson.name, formJson.level, formJson.health, formJson.armor, formJson.mainClass, formJson.subClass, formJson.species, formJson.background);
                            setSelected(storage("get", "", "Characters").at(-1))
                            storage("get", "", "Characters").at(-1).initiative = formJson.initiative ? formJson.initiative : null
                            setOpenNew(false);
                        },
                    }}
            >
                <DialogTitle>New Character</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required margin="dense" id="name" name="name" label="Name" type="string" fullWidth variant="standard"/>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap'
                        }}
                    >
                        <TextField autoFocus required margin="dense" id="level" name="level" label="Level" type="number" InputProps={{inputProps: { min: 1 }}} variant="standard"/>
                        <TextField autoFocus required margin="dense" id="health" name="health" label="Max Health" type="number" InputProps={{inputProps: { min: 1 }}} variant="standard"/>
                        <TextField autoFocus required margin="dense" id="armor" name="armor" label="Armor Class" type="number" InputProps={{inputProps: { min: 0 }}} variant="standard"/>
                    </Box>
                    <TextField autoFocus required margin="dense" id="mainClass" name="mainClass" label="Class" type="string" fullWidth variant="standard"/>
                    <TextField autoFocus required margin="dense" id="subClass" name="subClass" label="Sub-Class" type="string" fullWidth variant="standard"/>
                    <TextField autoFocus required margin="dense" id="species" name="species" label="Species" type="string" fullWidth variant="standard"/>
                    <TextField autoFocus required margin="dense" id="background" name="background" label="Background" type="string" fullWidth variant="standard"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenNew(false)}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}