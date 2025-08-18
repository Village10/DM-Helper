import Stack from '@mui/material/Stack'
import { FavoriteBorder, HeartBrokenOutlined } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import Button from '@mui/material/Button'

import changeHealth from '../../../util/combat/changeHealth'
import {Dispatch, SetStateAction, useState} from "react";
import {Combatant} from "../Combatant";

interface ChangeHealthProps {
	combatant: Combatant,
	setCombatants: Dispatch<SetStateAction<Combatant[]>>,
}

export default function ChangeHealth({ combatant, setCombatants }: ChangeHealthProps) {

	const [open, setOpen] = useState(false)

	return (
		<>
			<IconButton
				color='inherit'
				sx={{
					borderRadius: 0,
					padding: 0
				}}
				onClick={(e) => {
					e.stopPropagation()
					setOpen(true)
				}}
				onDoubleClick={(e) => e.stopPropagation()}
			>
				<Stack
					direction='row'
					alignItems='center'
				>
					<h3
						style={{ margin: 0 }}
					>
						{Math.min(combatant.health + combatant.tempHealth, 9999)}
						{combatant.health > 0 ? <FavoriteBorder/> : <HeartBrokenOutlined/>}
					</h3>
				</Stack>
			</IconButton>
			<Dialog
				onDoubleClick={(e) => e.stopPropagation()}
				open={open}
				onClose={() => {setOpen(false) }}
				PaperProps={{ component: 'form',
					onSubmit: (event: Event) => {
						event.preventDefault()
						const formData = new FormData(event.currentTarget as HTMLFormElement)
						const formJson = Object.fromEntries(formData.entries()) as Record<string, string>
						changeHealth(combatant.id, setCombatants, parseInt(formJson.health, 10) || 0, parseInt(formJson.tempHealth, 10))
						setOpen(false)
					}
				}}
			>
				<DialogTitle>
					Change Health
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						id='health'
						name='health'
						label='Amount'
						type='number'
						fullWidth
						variant='standard'
						helperText='Note: Negative numbers damage the combatant'
					/>
					<TextField
						required
						margin='dense'
						id='tempHealth'
						name='tempHealth'
						label='Temporary Health'
						type='number'
						slotProps={{ input: { inputProps: { min: 0 } } }}
						fullWidth
						variant='standard'
						defaultValue={combatant.tempHealth}
					/>
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
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}