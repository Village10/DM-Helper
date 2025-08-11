import Button from "@mui/material/Button";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import storage from "../../../util/storage";
import Grid from "@mui/material/Grid2";
import * as React from "react";

export default function Dropdown({value, setValue}) {
    
    const drop = React.useRef(React.createRef());
    const [openDrop, setOpenDrop] = React.useState(false);
    
    return (
        <Grid container>
            <Button
                variant={"outlined"}
                ref={drop}
                size="small"
                aria-controls={openDrop ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openDrop ? 'true' : undefined}
                onClick={() => setOpenDrop(true)}
                endIcon={<UnfoldMoreIcon/>}
            >{storage("get", "", "Note")}</Button>
            <Menu
                anchorEl={drop.current}
                open={openDrop}
                onClose={() => setOpenDrop(false)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {Object.keys(storage("get", "", "Notes")).map( (item, index) => (
                    <MenuItem onClick={() => {
                        setOpenDrop(false);
                        storage("set", value, "Notes", storage("get", "", "Note"))
                        storage("set", item, "Note")
                        if (item === "None") {
                            setValue(value + " ")
                        } else {
                            setValue(storage("get", "", "Notes", item))
                        }
                    }}>{item}</MenuItem>
                ))}
            </Menu>
        </Grid>
    )
}