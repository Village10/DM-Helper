import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import { Dialog, DialogActions, DialogTitle} from '@mui/material'
import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import storage from '../../../util/storage'
import CharacterFields from '../CharacterFields'
import {Character} from "../Character";

export default function EditButton({ selected, setSelected }) {

	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

	const [openEdit, setOpenEdit] = React.useState(false)

	// FIX: Default values

	return (
		<>
			<Button
				variant='outlined'
				size='small'
				color='success'
				endIcon={<EditIcon/>}
				fullWidth={isSmallScreen}
				onClick={() => selected ? setOpenEdit(true): null}
			>
				Edit
			</Button>
			<Dialog
				open={openEdit}
				onClose={() => setOpenEdit(false)}
				PaperProps={{ component: 'form',
					onSubmit: (event: Event) => {
						event.preventDefault()
						const formData = new FormData(event.currentTarget as HTMLFormElement)
						const formJson = Object.fromEntries(formData.entries()) as Record<string, string>
						selected.name = formJson.name
						selected.level = parseInt(formJson.level)
						selected.maxHealth = parseInt(formJson.health)
						selected.armor = parseInt(formJson.armor)
						selected.mainClass = formJson.mainClass
						selected.subClass = formJson.subClass
						selected.species = formJson.species
						selected.background = formJson.background
						storage('set', storage('get', '', 'characters').map((character: Character) => character.id === selected.id ? selected : character), 'Characters')
						setSelected(null)
						setOpenEdit(false)
					}
				}}
			>
				<DialogTitle>
					Edit Character
				</DialogTitle>
				<CharacterFields />
				<DialogActions>
					<Button
						onClick={() => setOpenEdit(false)}
					>
						Cancel
					</Button>
					<Button
						type='submit'
					>
						Done
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}