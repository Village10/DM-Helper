import Button from '@mui/material/Button'
import { Delete } from '@mui/icons-material'
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from '@mui/material'
import * as React from 'react'

import storage from '../../../util/storage'

export default function DeleteButton({ value, setValue }) {

	const [openDelete, setOpenDelete] = React.useState(false)
	const [error, setError] = React.useState(false)

	return (
		<>
			<Button
				variant='contained'
				color='error'
				endIcon={<Delete/>}
				size='small'
				onClick={() => {
					if (storage('get', '', 'Note') !== 'None') {
						if (storage('get', '', 'Confirm', 'deleting a note')) {
							setOpenDelete(true)
						} else {
							storage('delete', '', 'Notes', storage('get', '', 'Note'))
							storage('set', 'None', 'Note')
							setValue(value + ' ')
						}
					}}}
			>
				Delete
			</Button>
			<Dialog
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				PaperProps={{ component: 'form',
					onSubmit: (event) => {
						event.preventDefault()
						if (error) {
							storage('set', false, 'Confirm', 'deleting a note')
						}
						storage('delete', '', 'Notes', storage('get', '', 'Note'))
						storage('set', 'None', 'Note')
						setValue(value + ' ')
						setOpenDelete(false)
					}
				}}
			>
				<DialogTitle>
					Delete Note
				</DialogTitle>
				<DialogContent>
					<FormControlLabel
						control={<Checkbox
							checked={error}
							onClick={() => error ? setError(false):setError(true)}
						/>}
						label="Don't ask again"
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setOpenDelete(false)}
					>
						Cancel
					</Button>
					<Button
						type='submit'
						color='error'
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}