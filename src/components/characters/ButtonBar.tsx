import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import DetailsButton from './buttons/DetailsButton'
import EditButton from './buttons/EditButton'
import NewButton from './buttons/NewButton'
import DeleteButton from './buttons/DeleteButton'

export default function ButtonBar({ selected, setSelected, setTab, setSearch }) {

	const theme = useTheme()
	const isVerySmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

	if (isVerySmallScreen) {
		return (
			<>
				<Stack
					direction='row'
					justifyContent='space-between'
					sx={{
						gap: 1
					}}
				>
					<DetailsButton
						selected={selected}
						setSelected={setSelected}
						setSearch={setSearch}
						setTab={setTab}
					/>
					<EditButton
						selected={selected}
						setSelected={setSelected}
					/>
					<NewButton
						setSelected={setSelected}
					/>
					<DeleteButton
						selected={selected}
						setSelected={setSelected}
					/>
				</Stack>
				<br/>
			</>
		)
	} else {
		return (
			<>
				<Stack
					direction='row'
					justifyContent='space-between'
					sx={{
						gap: 1
					}}
				>
					<Stack
						direction='row'
						sx={{ flexWrap: 'wrap', gap: 1 }}
					>
						<DetailsButton
							selected={selected}
							setSelected={setSelected}
							setSearch={setSearch}
							setTab={setTab}
						/>
					</Stack>
					<Stack
						direction='row'
						sx={{ flexWrap: 'wrap', gap: 1 }}
					>
						<EditButton
							selected={selected}
							setSelected={setSelected}
						/>
						<NewButton
							setSelected={setSelected}
						/>
						<DeleteButton
							selected={selected}
							setSelected={setSelected}
						/>
					</Stack>
				</Stack>
				<br/>
			</>
		)
	}
}