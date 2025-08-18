import {Autocomplete, DialogContent, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import storage from "../../util/storage";
import * as React from "react";

export default function CharacterFields() {
    return (
        <DialogContent>
            <TextField
                autoFocus
                required
                margin='dense'
                id='name'
                name='name'
                label='Name'
                type='string'
                fullWidth
                variant='standard'
            />
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap'
                }}
            >
                <TextField
                    required
                    margin='dense'
                    id='level'
                    name='level'
                    label='Level'
                    type='number'
                    slotProps={{ input: { inputProps: { min: 1 } } }}
                    variant='standard'
                />
                <TextField
                    required
                    margin='dense'
                    id='health'
                    name='health'
                    label='Max Health'
                    type='number'
                    slotProps={{ input: { inputProps: { min: 1 } } }}
                    variant='standard'
                />
                <TextField
                    required
                    margin='dense'
                    id='armor'
                    name='armor'
                    label='Armor Class'
                    type='number'
                    slotProps={{ input: { inputProps: { min: 0 } } }}
                    variant='standard'
                />
            </Box>
            <Autocomplete
                options={
                    storage('get', '', 'wiki-data')
                        ?.flatMap((item: {name: string, tags: string[]}) => item.tags.includes("class") ? [item.name] : [])
                    || ["Error. Please refresh Wiki Data."]
                }
                renderInput={(params) =>
                    <TextField
                        {...params}
                        required
                        margin='dense'
                        id='mainClass'
                        name='mainClass'
                        label='Class'
                        type='string'
                        fullWidth
                        variant='standard'
                    />
                }
            />
            <Autocomplete
                options={
                    storage('get', '', 'wiki-data')
                        ?.flatMap((item: {name: string, tags: string[]}) => item.tags.includes("subclass") ? [item.name] : [])
                    || ["Error. Please refresh Wiki Data."]
                }
                renderInput={(params) =>
                    <TextField
                        {...params}
                        required
                        margin='dense'
                        id='subClass'
                        name='subClass'
                        label='Sub-Class'
                        type='string'
                        fullWidth
                        variant='standard'
                    />
                }
            />
            <Autocomplete
                options={
                    storage('get', '', 'wiki-data')
                        ?.flatMap((item: {name: string, tags: string[]}) => item.tags.includes("species") ? [item.name] : [])
                    || ["Error. Please refresh Wiki Data."]
                }
                renderInput={(params) =>
                    <TextField
                        {...params}
                        required
                        margin='dense'
                        id='species'
                        name='species'
                        label='Species'
                        type='string'
                        fullWidth
                        variant='standard'
                    />
                }
            />
            <Autocomplete
                options={
                    storage('get', '', 'wiki-data')
                        ?.flatMap((item: {name: string, tags: string[]}) => item.tags.includes("background") ? [item.name] : [])
                    || ["Error. Please refresh Wiki Data."]
                }
                renderInput={(params) =>
                    <TextField
                        {...params}
                        required
                        margin='dense'
                        id='background'
                        name='background'
                        label='Background'
                        type='string'
                        fullWidth
                        variant='standard'
                    />
                }
            />
        </DialogContent>
    )
}