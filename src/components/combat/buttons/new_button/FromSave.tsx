import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup } from '@mui/material'
import Button from '@mui/material/Button'

import storage from '../../../../util/storage'
import {Dispatch, SetStateAction, useState} from "react";
import {Combatant} from "../../Combatant";
import {Character} from "../../../characters/Character";

interface FromSaveProps {
	setSelected: Dispatch<SetStateAction<Combatant | null>>,
	openSaved: boolean,
	setOpenSaved: Dispatch<SetStateAction<boolean>>,
	combatants: Combatant[],
	newCombatant: (
		name: string,
		maxHealth: string,
		armor: string,
		character?: Character | string | null,
		initiative?: string | null
	) => void
}

export default function FromSave({ setSelected, openSaved, setOpenSaved, combatants, newCombatant }: FromSaveProps) {

	const [saveChecked, setSaveChecked] = useState<string[]>([])

	return (
		<Dialog
			open={openSaved}
			onClose={() => setOpenSaved(false)}
			PaperProps={{ component: 'form',
				onSubmit: (event: Event) => {
					event.preventDefault()
					for (const checked of saveChecked) {
						if (checked) {
							const character = storage('get', '', 'saved-combatants', checked)
							newCombatant(character.name, character.maxHealth, character.armor)
						}
					}
					setSelected(combatants.at(-1) ?? null)
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
											setSaveChecked((prev: string[]) => prev.filter((checked) => checked !== monster))
										}
										setSaveChecked((prev: string[]) => ([
											...prev,
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