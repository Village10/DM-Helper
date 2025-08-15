import Button from '@mui/material/Button'
import * as React from 'react'

import settingsTitle from '../../../util/settings/settingsTitle'
import storage from '../../../util/storage'

export default function CombatSettings() {
	return (
		<>
			{settingsTitle('CombatSettings')}
			<Button
				variant='contained'
				color='error'
				onClick={async () => {
					storage('delete', '', 'saved-combatants')
				}}
			>
				Clear Saved Combatants
			</Button>
		</>
	)
}