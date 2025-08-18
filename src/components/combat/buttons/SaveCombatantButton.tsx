import Button from '@mui/material/Button'
import SaveIcon from '@mui/icons-material/Save'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import * as React from 'react'

import storage from '../../../util/storage'
import {Combatant} from "../Combatant";

interface SaveCombatantButtonProps {
	selected: Combatant | null
}

export default function SaveCombatantButton({ selected }: SaveCombatantButtonProps) {

	const [openSave, setOpenSave] = React.useState(false)
	const [error, setError] = React.useState(false)

	return (
		<>
			<Button
				variant='outlined'
				size='small'
				color='success'
				endIcon={<SaveIcon/>}
				onClick={() => selected ? setOpenSave(true) : null}
			>
				Save Combatant
			</Button>
			<Dialog
				open={openSave}
				onClose={() => {setOpenSave(false); setError(false)}}
				PaperProps={{ component: 'form',
					onSubmit: (event: Event) => {
						event.preventDefault()
						const formData = new FormData(event.currentTarget as HTMLFormElement)
						const formJson = Object.fromEntries(formData.entries()) as Record<string, string>
						const saved = storage('get', '', 'saved-combatants')
						if (Object.keys(saved).includes(formJson.name)) {
							setError(true)
						} else {
							storage('set', selected, 'saved-combatants', formJson.name)
							setOpenSave(false)
							setError(false)
						}
					}
				}}
			>
				<DialogTitle>
					Save Combatant
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						required
						error={error}
						margin='dense'
						id='name'
						name='name'
						label='Save as...'
						type='string'
						fullWidth
						variant='standard'
						helperText={error ? 'Combatant already exists.': ''}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {setOpenSave(false); setError(false)}}
					>
						Cancel
					</Button>
					<Button
						type='submit'
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}