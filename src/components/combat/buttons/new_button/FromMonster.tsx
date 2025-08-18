import { doc, getDoc } from 'firebase/firestore'
import {
	Autocomplete,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormGroup,
	TextField
} from '@mui/material'
import Button from '@mui/material/Button'

import { db } from '../../../../util/firebase'
import toStorable from '../../../../util/toStorable'
import storage from '../../../../util/storage'
import {Dispatch, SetStateAction, SyntheticEvent} from "react";
import {Character} from "../../../characters/Character";

interface FromMonsterProps {
	openMonster: boolean,
	setOpenMonster: Dispatch<SetStateAction<boolean>>,
	newCombatant: (
		name: string,
		maxHealth: string,
		armor: string,
		character?: Character | string | null,
		initiative?: string | null
	) => void
}

export default function FromMonster({ openMonster, setOpenMonster, newCombatant }: FromMonsterProps) {
	return (
		<Dialog
			open={openMonster}
			onClose={() => setOpenMonster(false)}
		>
			<DialogTitle>
				New Combatant From Monster
			</DialogTitle>
			<DialogContent>
				<FormGroup>
					<Autocomplete
						id='search-bar'
						freeSolo
						sx={{pt: 1}}
						onChange={(_event: SyntheticEvent, newValue: string | null) => {
							if (newValue) {
								document.getElementById('search-bar')?.blur()
								getDoc(doc(db, 'wiki-data', toStorable(newValue))).then((res) => {
									const data = res.data()?.html
									const healthMatch = data.match(/<strong>Hit Points<\/strong>\s*(\d+)/)
									const maxHealth = healthMatch ? healthMatch[1] : 0
									const armorMatch = data.match(/<strong>Armor Class<\/strong>\s*(\d+)/)
									const armor = armorMatch ? armorMatch[1] : 0
									newCombatant(newValue, maxHealth, armor, newValue)
								})
								setOpenMonster(false)
							}
						}}
						autoFocus
						options={
							storage('get', '', 'wiki-data')
								?.flatMap((item: {name: string, tags: string[]}) => item.tags.includes('monster') ? [item.name] : [])
								|| ['Error. Please refresh Wiki Data.']
						}
						renderInput={(params) =>
							<TextField
								{...params}
								label='Search...'
							/>}
					/>
				</FormGroup>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {
						setOpenMonster(false)
					}}
				>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}