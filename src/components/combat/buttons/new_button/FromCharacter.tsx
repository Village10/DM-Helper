import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup } from '@mui/material'
import Button from '@mui/material/Button'

import storage from '../../../../util/storage'
import {Dispatch, SetStateAction, useState} from "react";
import {Combatant} from "../../Combatant";
import {Character} from "../../../characters/Character";

interface FromCharacterProps {
	openCharacter: boolean,
	setOpenCharacter: Dispatch<SetStateAction<boolean>>,
	setSelected: Dispatch<SetStateAction<Combatant | null>>,
	combatants: Combatant[],
	newCombatant: (
		name: string,
		maxHealth: string,
		armor: string,
		character?: Character | string | null,
		initiative?: string | null
	) => void
}

export default function FromCharacter({ openCharacter, setOpenCharacter, setSelected, combatants, newCombatant }: FromCharacterProps) {

	const [saveChecked, setSaveChecked] = useState<Record<number, Character>>({})

	return (
		<Dialog
			open={openCharacter}
			onClose={() => setOpenCharacter(false)}
			PaperProps={{ component: 'form',
				onSubmit: (event: Event) => {
					event.preventDefault()
					for (const character of Object.values(saveChecked)) {
						newCombatant(character.name, (character.maxHealth).toString(), (character.armor).toString(), character)
					}
					setSelected(combatants.at(-1) ?? null)
					setOpenCharacter(false)
				}
			}}
		>
			<DialogTitle>
				New Combatant(s) From Character(s)
			</DialogTitle>
			<DialogContent>
				<FormGroup>
					{storage('get', '', 'characters').map((character: Character) => (
						<FormControlLabel
							key={character.id}
							control={
								<Checkbox
									onClick={() => {
										if (saveChecked[character.id]) {
											setSaveChecked((prev) => {
												const { [character.id]: _, ...rest } = prev
												return rest
											})
										} else {
											setSaveChecked((prev) => ({
												...prev,
												[character.id]: character
											}))
										}
									}}
									checked={!!saveChecked[character.id]}
								/>
							}
							label={character.name}
						/>
					))}
				</FormGroup>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {setOpenCharacter(false); setSaveChecked([])}}
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