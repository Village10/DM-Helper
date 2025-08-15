import React from 'react'
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup } from '@mui/material'
import Button from '@mui/material/Button'

import storage from '../../../../util/storage'

export function DeleteSaved({ openDeleteSaved, setOpenDeleteSaved, saveChecked, setSaveChecked }) {
	return (
		<Dialog
			open={openDeleteSaved}
			onClose={() => setOpenDeleteSaved(false)}
			PaperProps={{ component: 'form',
				onSubmit: (event) => {
					event.preventDefault()
					for (const save of saveChecked) {
						storage('delete', '', 'saved-combatants', save)
					}
					setOpenDeleteSaved(false)
				}
			}}
		>
			<DialogTitle>
				Delete Saved Combatant(s)
			</DialogTitle>
			<DialogContent>
				<FormGroup>
					{Object.keys(storage('get', '', 'saved-combatants')).map((key) => (
						<FormControlLabel
							key={key}
							control={
								<Checkbox
									onClick={() => {
										console.log(saveChecked)
										if (saveChecked.includes(key)) {
											setSaveChecked((prev) => prev.filter((item) => item !== key))
										} else {
											setSaveChecked((prev) => ([
												...prev, key
											]))
										}
									}}
									checked={saveChecked.includes(key)}
								/>
							}
							label={key}
						/>
					))}
				</FormGroup>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {setOpenDeleteSaved(false); setSaveChecked([])}}
				>
					Cancel
				</Button>
				<Button
					type='submit'
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	)
}