import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {Combatant} from "../Combatant";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Storage from "../../../util/Storage"

export default function DuplicateButton({selected, setSelected}) {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Button
                variant="outlined"
                size="small"
                color="success"
                endIcon={<ContentCopyIcon/>}
                fullWidth={isSmallScreen}
                onClick={() => {
                    if (selected) {
                        if (selected.character) {
                            new Combatant(selected.name, selected.max_health, selected.armor, selected.character);
                        } else {
                            new Combatant(selected.name, selected.max_health, selected.armor);
                        }
                        setSelected(Storage("get", "", "Combat").at(-1))
                    }
                }}
            >Duplicate</Button>
        </>
    )
}