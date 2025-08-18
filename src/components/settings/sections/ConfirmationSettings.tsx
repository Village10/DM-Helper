import Grid from '@mui/material/Grid2'
import { FormControlLabel } from '@mui/material'
import Switch from '@mui/material/Switch'

import storage from '../../../util/storage'
import settingsTitle from '../../../util/settings/settingsTitle'
import {useState} from "react";

export default function ConfirmationSettings() {

	const [reRender, setReRender] = useState(false)

	return (
		<Grid
			size={{ xs: 12, sm: 6, lg: 4 }}
		>
			{settingsTitle('Confirmation')}
			{Object.keys(storage('get', '', 'confirmations')).map((key, index) => (
				<Grid key={index}>
					<FormControlLabel
						control={
							<Switch
								checked={storage('get', '', 'confirmations', key)}
								onChange={(event) => {
									storage('set', event.target.checked, 'confirmations', key)
									setReRender(!reRender)
								}}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}
						label={'Confirm when ' + key}
					/>
				</Grid>
			))}
		</Grid>
	)
}