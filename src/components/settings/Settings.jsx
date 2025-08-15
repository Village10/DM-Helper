import Typography from '@mui/material/Typography'
import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import { FormControlLabel } from '@mui/material'
import Switch from '@mui/material/Switch'
import * as PropTypes from 'prop-types'

import settingsTitle from '../../util/settings/settingsTitle'
import storage from '../../util/storage'
import getWikiData from '../../util/getWikiData'

import CombatSettings from './sections/CombatSettings'

CombatSettings.propTypes = { onClick: PropTypes.func }
export default function Settings({ setWikiData }) {

	const [reRender, setReRender] = React.useState(false)

	// TODO: Add confirmation for clearing all data
	return (
		<Box
			sx={{ width: '100%' }}
		>
			<Typography
				variant='h1'
				align='center'
				style={{ marginBottom: 20 }}
			>
				Settings
			</Typography>
			<Grid
				container
				spacing={2}
			>
				<Grid
					container
					direction='column'
					sx={{ flexGrow: 1 }}
				>
					<CombatSettings />
					{settingsTitle('Characters')}
					<Button
						variant='contained'
						color='error'
						onClick={async () => {
							storage('delete', '', 'Characters')
						}}
					>
						Clear Characters
					</Button>
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
					{settingsTitle('Search')}
					<Button
						variant='contained'
						color='success'
						onClick={async () => {
							getWikiData(setWikiData)
						}}
					>
						Refresh Data From Wiki
					</Button>
				</Grid>
				<Grid
					container
					direction='column'
					sx={{ flexGrow: 1 }}
				>
					{settingsTitle('Confirmation')}
					{Object.keys(storage('get', '', 'Confirm')).map((key) => (
						<Grid>
							<FormControlLabel
								control={
									<Switch
										checked={storage('get', '', 'Confirm', key)}
										onChange={(event) => {
											storage('set', event.target.checked, 'Confirm', key)
											setReRender(!reRender)
										}}
										inputProps={{ 'aria-label': 'controlled' }}
									/>
								}
								label={'Confirm when ' + key}
							/>
						</Grid>
					))}
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
			</Grid>
		</Box>
	)
}