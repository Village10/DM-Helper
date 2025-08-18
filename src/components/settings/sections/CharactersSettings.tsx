import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'

import storage from '../../../util/storage'
import settingsTitle from '../../../util/settings/settingsTitle'

export default function CharactersSettings() {
	return (
		<Grid
			size={{ xs: 12, sm: 6, lg: 4 }}
		>
			{settingsTitle('Characters')}
			<Button
				variant='contained'
				color='error'
				onClick={async () => {
					storage('delete', '', 'characters')
				}}
			>
				Clear Characters
			</Button>
		</Grid>
	)
}