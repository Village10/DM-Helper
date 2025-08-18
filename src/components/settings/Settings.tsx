import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'

import CombatSettings from './sections/CombatSettings'
import CharactersSettings from './sections/CharactersSettings'
import NotesSettings from './sections/NotesSettings'
import SearchSettings from './sections/SearchSettings'
import ConfirmationSettings from './sections/ConfirmationSettings'
import MiscellaneousSettings from './sections/MiscellaneousSettings'
import {Dispatch, SetStateAction} from "react";

interface SettingsProps {
    setWikiData: Dispatch<SetStateAction<{ name: string, tags: string[] }[] | null>>
}

export default function Settings({ setWikiData }: SettingsProps) {

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
				rowSpacing={5}
				columnSpacing={2}
			>
				<ConfirmationSettings />
				<CombatSettings />
				<CharactersSettings />
				<NotesSettings />
				<SearchSettings
					{...{setWikiData}}
				/>
				<MiscellaneousSettings />
			</Grid>
		</Box>
	)
}