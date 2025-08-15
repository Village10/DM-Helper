import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup } from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'

import storage from '../../../../util/storage'

export default function FromSave({ setSelected, openSaved, setOpenSaved, saveChecked, setSaveChecked, combatants, newCombatant }) {
	return (
		<Dialog
			open={openSaved}
			onClose={() => setOpenSaved(false)}
			PaperProps={{ component: 'form',
				onSubmit: (event) => {
					event.preventDefault()
					for (const checked of saveChecked) {
						if (checked) {
							const character = storage('get', '', 'saved-combatants', checked)
							newCombatant(character.name, character.max_health, character.armor)
						}
					}
					setSelected(combatants.at(-1))
					setOpenSaved(false)
				}
			}}
		>
			<DialogTitle>
				New Combatant(s) From Save
			</DialogTitle>
			<DialogContent>
				<FormGroup>
					{Object.keys(storage('get', '', 'saved-combatants')).map((monster) => (
						<FormControlLabel
							key={monster}
							control={
								<Checkbox
									onClick={() => {
										if (saveChecked.includes(monster)) {
											setSaveChecked((prev) => prev.filter((checked) => checked !== monster))
										}
										setSaveChecked((prevSaveChecked) => ([
											...prevSaveChecked,
											monster
										]))
									}}
									checked={saveChecked.includes(monster)}
								/>
							}
							label={monster}
						/>
					))}
				</FormGroup>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => setOpenSaved(false)}
				>
					Cancel
				</Button>
				<Button
					type='submit'
				>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	)
}