import { doc, getDoc } from 'firebase/firestore'
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup } from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'

import { db } from '../../../../util/firebase'
import toStorable from '../../../../util/toStorable'
import storage from '../../../../util/storage'

export default function FromMonster({ setSelected, saveChecked, setSaveChecked, setOpenMonster, openMonster, combatants, newCombatant }) {
	return (
		<Dialog
			open={openMonster}
			onClose={() => setOpenMonster(false)}
			PaperProps={{ component: 'form',
				onSubmit: (event) => {
					event.preventDefault()
					for (const monster of Object.values(saveChecked)) {
						getDoc(doc(db, 'wiki-data', toStorable(monster.name))).then((res) => {
							const data = res.data().html
							const healthMatch = data.match(/<strong>Hit Points<\/strong>\s*(\d+)/)
							const maxHealth = healthMatch ? parseInt(healthMatch[1], 10) : 0
							const armorMatch = data.match(/<strong>Armor Class<\/strong>\s*(\d+)/)
							const armor = armorMatch ? parseInt(armorMatch[1], 10) : 0
							newCombatant(monster.name, maxHealth, armor)
						})
					}
					setSelected(combatants.at(-1))
					setOpenMonster(false)
				}
			}}
		>
			<DialogTitle>
				New Combatant(s) From Monster(s)
			</DialogTitle>
			<DialogContent>
				<FormGroup>
					{/*TODO: Add search when adding monsters*/}
					{storage('get', '', 'wiki-data') ? storage('get', '', 'wiki-data').map((monster) => (
						monster.tags.includes('Monster') ?
							<FormControlLabel
								key={monster.name}
								control={
									<Checkbox
										onClick={() => {
											if (saveChecked[monster.name]) {
												setSaveChecked(({ [monster.name]: _, prevSaveChecked }) => ({
													...prevSaveChecked
												}))
											} else {
												setSaveChecked((prevSaveChecked) => ({
													...prevSaveChecked,
													[monster.name]: monster
												}))
											}
										}}
										checked={saveChecked[monster.name]}
									/>
								}
								label={monster.name}
							/>
							: null)) : null}
				</FormGroup>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {setOpenMonster(false); setSaveChecked([])}}
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