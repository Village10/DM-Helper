import Button from '@mui/material/Button'
import * as React from 'react'
import Grid from '@mui/material/Grid2'

import settingsTitle from '../../../util/settings/settingsTitle'

export default function MiscellaneousSettings() {
	return (
		<Grid
			size={{ xs: 12, sm: 6, lg: 4 }}
		>
			{settingsTitle('Miscellaneous')}
			<Button
				variant='contained'
				color='error'
				onClick={() => {
					localStorage.clear()
					window.location.reload()
				}}
			>
				Clear all Data
			</Button>
		</Grid>
	)
}