import Stack from "@mui/material/Stack";
import DetailsButton from "./buttons/DetailsButton";
import * as React from "react";
import EditButton from "./buttons/EditButton";
import NewButton from "./buttons/NewButton";
import DeleteButton from "./buttons/DeleteButton";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ButtonBar({selected, setSelected, setTab, setSearch}) {

    const theme = useTheme();
    const isVerySmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    if (isVerySmallScreen) {
        return (
            <>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                        gap: 1
                    }}
                >
                    <DetailsButton selected={selected} setSelected={setSelected} setSearch={setSearch} setTab={setTab}></DetailsButton>
                    <EditButton selected={selected} setSelected={setSelected}></EditButton>
                    <NewButton selected={selected} setSelected={setSelected}></NewButton>
                    <DeleteButton selected={selected} setSelected={setSelected}></DeleteButton>
                </Stack>
                <br/>
            </>
        )
    } else {
        return (
            <>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                        gap: 1
                    }}
                >
                    <Stack direction="row" sx={{flexWrap: 'wrap', gap: 1}}>
                        <DetailsButton selected={selected} setSelected={setSelected} setSearch={setSearch} setTab={setTab}></DetailsButton>
                    </Stack>
                    <Stack direction="row" sx={{flexWrap: 'wrap', gap: 1}}>
                        <EditButton selected={selected} setSelected={setSelected}></EditButton>
                        <NewButton selected={selected} setSelected={setSelected}></NewButton>
                        <DeleteButton selected={selected} setSelected={setSelected}></DeleteButton>
                    </Stack>
                </Stack>
                <br/>
            </>
        )
    }
}