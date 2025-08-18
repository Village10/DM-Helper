import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import {Dispatch, SetStateAction} from "react";
import {Combatant} from "../Combatant";

interface TurnButtonProps {
	setSelected: Dispatch<SetStateAction<Combatant | null>>,
	combatants: Combatant[],
	turn: number,
	setTurn: Dispatch<SetStateAction<number>>,
}

export default function TurnButton({ setSelected, combatants, turn, setTurn }: TurnButtonProps) {

	const [openTurn, setOpenTurn] = React.useState(false)

	return (
		<>
			<Stack
				gap={0}
				direction='row'
			>
				<IconButton
					size='small'
					sx={{ marginRight: 0 }}
					onClick={() => {
						if (turn > 1) {
							setTurn(turn - 1)
							setSelected(combatants.at((turn - 2) % combatants.length) ?? null)
						}
					}}
				>
					<KeyboardArrowLeftIcon/>
				</IconButton>
				<Button
					variant='outlined'
					sx={{ margin: 0 }}
					size='small'
					onClick={() => setOpenTurn(true)}
				>
					Turn:
					{" " + turn}
				</Button>
				<IconButton
					size='small'
					sx={{ marginLeft: 0 }}
					onClick={() => {
						setTurn(turn + 1)
						setSelected(combatants.at((turn) % combatants.length) ?? null)
					}}
				>
					<KeyboardArrowRightIcon/>
				</IconButton>
			</Stack>
			<Dialog
				open={openTurn}
				onClose={() => setOpenTurn(false)}
				PaperProps={{ component: 'form',
					onSubmit: (event: Event) => {
						event.preventDefault()
						const formData = new FormData(event.currentTarget as HTMLFormElement)
						const newTurn = parseInt((Object.fromEntries(formData.entries()) as Record<string, string>).turn)
						setTurn(newTurn)
						setSelected(combatants.at((newTurn - 1) % combatants.length) ?? null)
						setOpenTurn(false)
					}
				}}
			>
				<DialogTitle>
					Change Turn
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						required
						margin='dense'
						id='turn'
						name='turn'
						label='Turn'
						type='number'
						slotProps={{ input: { inputProps: { min: 1 } } }}
						fullWidth
						variant='standard'
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setOpenTurn(false)}
					>
						Cancel
					</Button>
					<Button
						type='submit'
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}