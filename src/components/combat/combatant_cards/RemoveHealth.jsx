import { KeyboardArrowDown } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import * as React from 'react'

import changeHealth from '../../../util/combat/changeHealth'

export default function RemoveHealth({ combatant, setCombatants }) {
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