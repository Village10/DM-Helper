import { KeyboardArrowUp } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'

import changeHealth from '../../../util/combat/changeHealth'
import {Combatant} from "../Combatant";
import {Dispatch, SetStateAction} from "react";

interface AddHealthProps {
	combatant: Combatant,
	setCombatants: Dispatch<SetStateAction<Combatant[]>>
}

export default function AddHealth({ combatant, setCombatants }: AddHealthProps) {
	return (
		<IconButton
			sx={{
				borderRadius: 0,
				padding: 0
			}}
			onClick={(e) => {
				e.stopPropagation()
				changeHealth(combatant.id, setCombatants, 1)

			}}
			onDoubleClick={(e) => {
				e.stopPropagation()
			}}
		>
			<KeyboardArrowUp/>
		</IconButton>
	)
}