import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'

import getWikiData from '../../../util/getWikiData'
import settingsTitle from '../../../util/settings/settingsTitle'
import storage from '../../../util/storage'
import {Dispatch, SetStateAction} from "react";

interface SearchSettingsProps {
    setWikiData: Dispatch<SetStateAction<{ name: string, tags: string[] }[] | null>>
}

export default function SearchSettings({ setWikiData }: SearchSettingsProps) {

	// FEATURE: Add search cache size setting
	return (
		<Grid
			size={{ xs: 12, sm: 6, lg: 4 }}
		>
			{settingsTitle('Search')}
			<Button
				variant='contained'
				color='error'
				onClick={async () => {
					storage('delete', '', 'search-cache')
				}}
				sx={{marginBottom: 1}}
			>
				Clear Cache
			</Button>
			<br/>
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
	)
}