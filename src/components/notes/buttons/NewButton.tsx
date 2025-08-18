import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

import storage from '../../../util/storage'
import {Dispatch, SetStateAction, useState} from "react";

interface NewButtonProps {
    setValue: Dispatch<SetStateAction<string>>
}

export default function NewButton({ setValue }: NewButtonProps) {

	const [openNew, setOpenNew] = useState(false)
	const [error, setError] = useState(false)

	return (
		<>
			<Button
				variant='outlined'
				size='small'
				endIcon={<AddIcon />}
				onClick={() => {setOpenNew(true)}}
			>
				New
			</Button>
			<Dialog
				open={openNew}
				onClose={() => {setOpenNew(false); setError(false)}}
				PaperProps={{ component: 'form',
					onSubmit: (event: Event) => {
						event.preventDefault()
						const formData = new FormData(event.currentTarget as HTMLFormElement)
						const formJson = Object.fromEntries(formData.entries()) as Record<string, string>
						if (Object.keys(storage('get', '', 'Notes')).includes(formJson.name)) {
							setError(true)
						} else {
							storage('set', '', 'Notes', formJson.name)
							storage('set', formJson.name, 'Note')
							setValue('')
							setError(false)
							setOpenNew(false)
						}
					}
				}}
			>
				<DialogTitle>
					New Note
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						required
						slotProps={{ input: { inputProps: { maxLength: 50 }}}}
						error={error}
						margin='dense'
						id='name'
						name='name'
						label='Name'
						type='string'
						fullWidth
						variant='standard'
						helperText={error ? 'Note already exists': ''}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {setOpenNew(false); setError(false)}}
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