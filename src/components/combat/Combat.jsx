import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import storage from '../../util/storage'

import ButtonBar from './ButtonBar'
import { Combatant } from './Combatant'
import CombatantCards from './combatant_cards/CombatantCards'

export default function Combat({ setTab, setSearch }) {
	storage('createIfNeeded', {}, 'saved-combatants')
	storage('createIfNeeded', [], 'combatants')
	storage('createIfNeeded', [], 'Characters')
	storage('createIfNeeded', 1, 'Turn')
	storage('createIfNeeded', 0, 'combatant-id')

	// TODO: Rename "Combatants" storage
	const [combatants, setCombatants] = React.useState(storage('get', '', 'combatants'))
	const [selected, setSelected] = React.useState(null)
	const [openEdit, setOpenEdit] = React.useState(false)
	const [turn, setTurn] = React.useState(storage('get', '', 'Turn'))

	React.useEffect(() => storage('set', combatants, 'combatants'), [combatants])
	React.useEffect(() => {storage('set', turn, 'Turn')}, [turn])

	function newCombatant(name, max_health, armor, character, initiative) {
		const combatant = new Combatant(name, max_health, armor, character)
		if (initiative) {
			combatant.initiative = initiative
		}
		setCombatants((prev) => [...prev, combatant].sort((a, b) => {
			if (!a.initiative) {return 1}
			if (!b.initiative) {return -1}
			return b.initiative - a.initiative
		}))
		setSelected(combatant)
	}

	return (
		<Box
			sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}
		>
			<Typography
				variant='h1'
				align='center'
				style={{ marginBottom: 20 }}
			>
				Combat
			</Typography>
			<ButtonBar
				selected={selected}
				setSelected={setSelected}
				openEdit={openEdit}
				setOpenEdit={setOpenEdit}
				setTab={setTab}
				setSearch={setSearch}
				combatants={combatants}
				setCombatants={setCombatants}
				newCombatant={newCombatant}
				turn={turn}
				setTurn={setTurn}
			/>
			<CombatantCards
				combatants={combatants}
				setCombatants={setCombatants}
				setOpenEdit={setOpenEdit}
				selected={selected}
				setSelected={setSelected}
				turn={turn}
			/>
		</Box>
	)
}