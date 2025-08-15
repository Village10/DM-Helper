import Button from '@mui/material/Button'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import * as React from 'react'

export default function DuplicateButton({ selected, setSelected, combatants, newCombatant }) {
	return (
		<>
			<Button
				variant='outlined'
				size='small'
				color='success'
				endIcon={<ContentCopyIcon/>}
				onClick={() => {
					if (selected) {
						if (selected.character) {
							newCombatant(selected.name, selected.max_health, selected.armor, selected.character)
						} else {
							newCombatant(selected.name, selected.max_health, selected.armor)
						}
						setSelected(combatants.at(-1))
					}
				}}
			>
				Duplicate
			</Button>
		</>
	)
}