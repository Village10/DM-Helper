import {
	Dialog,
	DialogActions,
	DialogTitle,
} from '@mui/material'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import storage from '../../../util/storage'
import { Character } from '../Character'
import CharacterFields from '../CharacterFields'

export default function NewButton({ setSelected }) {

	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

	const [openNew, setOpenNew] = React.useState(false)

	return (
		<>
			<Button
				variant='outlined'
				size='small'
				endIcon={<AddIcon/>}
				fullWidth={isSmallScreen}
				onClick={() => setOpenNew(true)}
			>
				New
			</Button>
			<Dialog
				open={openNew}
				onClose={() => setOpenNew(false)}
				PaperProps={{ component: 'form',
					onSubmit: (event: Event) => {
						event.preventDefault()
						const formData = new FormData(event.currentTarget as HTMLFormElement)
						const formJson = Object.fromEntries(formData.entries()) as Record<string, string>
						new Character(formJson.name, formJson.level, formJson.health, formJson.armor, formJson.mainClass, formJson.subClass, formJson.species, formJson.background)
						setSelected(storage('get', '', 'characters').at(-1))
						storage('get', '', 'characters').at(-1).initiative = formJson.initiative ? formJson.initiative : null
						setOpenNew(false)
					}
				}}
			>
				<DialogTitle>
					New Character
				</DialogTitle>
				<CharacterFields />
				<DialogActions>
					<Button
						onClick={() => setOpenNew(false)}
					>
						Cancel
					</Button>
					<Button
						type='submit'
					>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}