import {TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import * as React from "react";
import storage from "../../util/storage"
import Dropdown from "./buttons/Dropdown";
import NewButton from "./buttons/NewButton";
import DeleteButton from "./buttons/DeleteButton";

export default function Notes() {

    const [rows, setRows] = useState(Math.floor((window.innerHeight - 220) / 21));

    storage("createIfNeeded", "None", "Note")
    storage("createIfNeeded", "", "Notes", "None")

    const note = storage("get", "", "Note");
    const [value, setValue] = useState(storage("get", "", "Notes", note))

    const [open, setOpen] = React.useState({
        newdrop: false,
        newelement: React.createRef(),
        newsaved: false,
        errorsave: false,
        temporaryconfirm: false,
    });

    function HandleClickOpen(thing) {
        setOpen((prevOpen) => ({
            ...prevOpen,
            [thing]: true,
        }));
    }

    function HandleClose(thing){
        setOpen((prevOpen) => ({
            ...prevOpen,
            [thing]: false,
        }));
    }

    useEffect(() => {
        const handleResize = () => {
            setRows(Math.floor((window.innerHeight - 220) / 21));
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}} >
            <Typography variant="h1" align="center" style={{marginBottom: 20}}>Notes</Typography>
            <Grid
                container
                spacing={2}
                sx={{mb: (theme) => theme.spacing(2)}}
                justifyContent="space-between"
            >
                <Dropdown value={value} setValue={setValue} ></Dropdown>
                <Grid container >
                    <NewButton setValue={setValue} ></NewButton>
                    <DeleteButton setValue={setValue} ></DeleteButton>
                </Grid>
            </Grid>
            {note !== "None" ?
                <TextField
                    variant="filled"
                    fullWidth
                    multiline
                    rows={rows}
                    value={value}
                    style={{ marginBottom: -30}}
                    onChange={(event) => {storage("set", event.target.value, "Notes", note); setValue(event.target.value);}}
                /> : null
            }
        </Box>
);}