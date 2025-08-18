import Button from '@mui/material/Button'
import * as React from 'react'
import Grid from '@mui/material/Grid2'

import settingsTitle from '../../../util/settings/settingsTitle'
import storage from '../../../util/storage'

export default function CombatSettings() {
	return (
		<Grid
			size={{ xs: 12, sm: 6, lg: 4 }}
		>
			{settingsTitle('Combat Settings')}
			<Button
				variant='contained'
				color='error'
				onClick={async () => {
					storage('delete', '', 'saved-combatants')
				}}
			>
				Clear Saved Combatants
			</Button>
		</Grid>
	)
}