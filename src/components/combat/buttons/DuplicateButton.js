import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {Combatant} from "../Combatant";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import storage from "../../../util/storage"

export default function DuplicateButton({selected, setSelected, combatants, newCombatant}) {
    return (
        <>
            <Button
                variant="outlined"
                size="small"
                color="success"
                endIcon={<ContentCopyIcon/>}
                onClick={() => {
                    if (selected) {
                        if (selected.character) {
                            newCombatant(selected.name, selected.max_health, selected.armor, selected.character);
                        } else {
                            newCombatant(selected.name, selected.max_health, selected.armor);
                        }
                        setSelected(combatants.at(-1))
                    }
                }}
            >Duplicate</Button>
        </>
    )
}