import Button from '@mui/material/Button'
import { CardActionArea, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LaunchIcon from '@mui/icons-material/Launch'
import Box from '@mui/material/Box'
import {Dispatch, SetStateAction, useState} from "react";
import {Combatant} from "../Combatant";

interface DetailsButtonProps {
	selected: Combatant,
	setSelected: Dispatch<SetStateAction<Combatant | null>>,
	setTab: Dispatch<SetStateAction<string>>,
	setSearch: Dispatch<SetStateAction<string>>,
}

export default function DetailsButton({ selected, setSelected, setTab, setSearch }: DetailsButtonProps) {

    const [open, setOpen] = useState(false)

    if (selected.character != null) {
        if (typeof selected.character === 'string') {
        const monster = selected.character
        return (
            <Button
                variant='outlined'
                size='small'
                color='success'
                endIcon={<InfoOutlinedIcon/>}
                onClick={() => {
                    setSearch(monster)
                    setTab('Search')
                }}
            >
                Details
            </Button>
        )
        } else {
            const character = selected.character
            return (
                <>
                    <Button
                        variant='outlined'
                        size='small'
                        color='success'
                        endIcon={<InfoOutlinedIcon/>}
                        onClick={() => {
                            setOpen(true)
                        }}
                    >
                        Details
                    </Button>
                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        PaperProps={{
                            component: 'form',
                            onSubmit: (event: Event) => {
                                event.preventDefault()
                                setSelected(null)
                                setOpen(false)
                            }
                        }}
                    >
                        <DialogTitle>
                            Details
                        </DialogTitle>
                        <DialogContent>
                            <CardActionArea
                                onClick={() => {
                                    setSearch(character.mainClass);
                                    setTab('Search')
                                }}
                            >
                                <Card>
                                    <Box
                                        display='flex'
                                        gap={10}
                                        justifyContent='space-between'
                                        alignItems='center'
                                    >
                                        <Typography>
                                            Class:
                                            {character.mainClass}
                                        </Typography>
                                        <LaunchIcon/>
                                    </Box>
                                </Card>
                            </CardActionArea>
                            <CardActionArea
                                onClick={() => {
                                    setSearch(character.subClass);
                                    setTab('Search')
                                }}
                            >
                                <Card>
                                    <Box
                                        display='flex'
                                        gap={10}
                                        justifyContent='space-between'
                                        alignItems='center'
                                    >
                                        <Typography>
                                            Sub-Class:
                                            {selected.character.subClass}
                                        </Typography>
                                        <LaunchIcon/>
                                    </Box>
                                </Card>
                            </CardActionArea>
                            <CardActionArea
                                onClick={() => {
                                    setSearch(character.species);
                                    setTab('Search')
                                }}
                            >
                                <Card>
                                    <Box
                                        display='flex'
                                        gap={10}
                                        justifyContent='space-between'
                                        alignItems='center'
                                    >
                                        <Typography>
                                            Species:
                                            {selected ? selected!.character!.species : null}
                                        </Typography>
                                        <LaunchIcon/>
                                    </Box>
                                </Card>
                            </CardActionArea>
                            <CardActionArea
                                onClick={() => {
                                    setSearch(character.background);
                                    setTab('Search')
                                }}
                            >
                                <Card>
                                    <Box
                                        display='flex'
                                        gap={10}
                                        justifyContent='space-between'
                                        alignItems='center'
                                    >
                                        <Typography>
                                            Background:
                                            {character.background}
                                        </Typography>
                                        <LaunchIcon/>
                                    </Box>
                                </Card>
                            </CardActionArea>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                            >
                                Done
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )
        }
    }
}