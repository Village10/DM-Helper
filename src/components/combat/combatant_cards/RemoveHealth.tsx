import { KeyboardArrowDown } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import * as React from 'react'

import changeHealth from '../../../util/combat/changeHealth'
import {Dispatch, SetStateAction} from "react";
import {Combatant} from "../Combatant";

interface RemoveHealthProps {
	combatant: Combatant,
	setCombatants: Dispatch<SetStateAction<Combatant[]>>,
}

export default function RemoveHealth({ combatant, setCombatants }: RemoveHealthProps) {
	return (
		<IconButton
			sx={{
				borderRadius: 0,
				padding: 0
			}}
			onClick={(e) => {
				e.stopPropagation()
				changeHealth(combatant.id, setCombatants, -1)
			}}
			onDoubleClick={(e) => {
				e.stopPropagation()
			}}
		>
			<KeyboardArrowDown/>
		</IconButton>
	)
}