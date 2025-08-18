import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import storage from '../../util/storage'
import ButtonBar from './ButtonBar'
import { Combatant } from './Combatant'
import CombatantCards from './combatant_cards/CombatantCards'
import {Character} from "../characters/Character";
import {Dispatch, SetStateAction, useState, useEffect} from "react";

interface CombatProps {
	setTab: Dispatch<SetStateAction<string>>,
	setSearch: Dispatch<SetStateAction<string>>
}

export default function Combat({ setTab, setSearch }: CombatProps) {

	storage('createIfNeeded', {}, 'saved-combatants')
	storage('createIfNeeded', [], 'combatants')
	storage('createIfNeeded', [], 'characters')
	storage('createIfNeeded', 1, 'turn')
	storage('createIfNeeded', 0, 'combatant-id')

	const [combatants, setCombatants] = useState<Combatant[]>(storage('get', '', 'combatants'))
	const [selected, setSelected] = useState<Combatant | null>(null)
	const [openEdit, setOpenEdit] = useState(false)
	const [turn, setTurn] = useState(storage('get', '', 'turn'))

	useEffect(() => storage('set', combatants, 'combatants'), [combatants])
	useEffect(() => {storage('set', turn, 'turn')}, [turn])

	function newCombatant(
		name: string,
		maxHealth: string,
		armor: string,
		character?: Character | string |  null,
		initiative?: string | null
	) {
		const combatant = new Combatant(name, parseInt(maxHealth), parseInt(armor), character)
		if (initiative) {
			combatant.initiative = parseInt(initiative)
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
				{...{ selected, setSelected, openEdit, setOpenEdit, setTab, setSearch, combatants, setCombatants, newCombatant, turn, setTurn}}
			/>
			<CombatantCards
				{...{ combatants, setCombatants, setOpenEdit, selected, setSelected, turn }}
			/>
		</Box>
	)
}