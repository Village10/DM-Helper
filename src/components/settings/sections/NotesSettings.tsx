import Button from '@mui/material/Button'
import * as React from 'react'
import Grid from '@mui/material/Grid2'

import storage from '../../../util/storage'
import settingsTitle from '../../../util/settings/settingsTitle'

export default function NotesSettings() {
	return (
		<Grid
			size={{ xs: 12, sm: 6, lg: 4 }}
		>
			{settingsTitle('Notes')}
			<Button
				variant='contained'
				color='error'
				onClick={async () => {
					storage('delete', '', 'Notes')
					storage('set', 'None', 'Note')
				}}
			>
				Clear Notes
			</Button>
		</Grid>
	)
}