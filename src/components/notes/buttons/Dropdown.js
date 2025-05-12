import Button from "@mui/material/Button";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Storage from "../../../util/Storage";
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
            >{Storage("get", "", "Note")}</Button>
            <Menu
                anchorEl={drop.current}
                open={openDrop}
                onClose={() => setOpenDrop(false)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {Object.keys(Storage("get", "", "Notes")).map( (item, index) => (
                    <MenuItem onClick={() => {
                        setOpenDrop(false);
                        Storage("set", value, "Notes", Storage("get", "", "Note"))
                        Storage("set", item, "Note")
                        if (item === "None") {
                            setValue(value + " ")
                        } else {
                            setValue(Storage("get", "", "Notes", item))
                        }
                    }}>{item}</MenuItem>
                ))}
            </Menu>
        </Grid>
    )
}