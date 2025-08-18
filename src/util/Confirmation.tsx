import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'

import storage from './storage'

interface ConfirmationProps {
    title: string,
    name: string,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    runFunction: () => void,
}

export default function Confirmation({ title, name, open, setOpen, runFunction }: ConfirmationProps) {

	const [tempConfirm, setTempConfirm] = React.useState(false)
	const [confirm, setConfirm] = React.useState(() => {
		storage('createIfNeeded', true, 'confirmations', name)
		return storage('get', '', 'confirmations', name)
	})

	React.useEffect(() => {storage('set', confirm, 'confirmations', name)}, [confirm, name])
	React.useEffect(() => {
		if (open && !confirm) {
			runFunction()
			setOpen(false)
		}
	}, [open, confirm, runFunction, setOpen])

	if (!confirm) {
		return null
	} else {
		return (
			<Dialog
				open={open}
				onClose={() => {
					setOpen(false)
					setTempConfirm(false)
				}}
				PaperProps={{
					component: 'form',
					onSubmit: (event: React.FormEvent) => {
						event.preventDefault()
						if (tempConfirm) {
							setConfirm(false)
						}
						setTempConfirm(false)
						runFunction()
						setOpen(false)
					}
				}}
			>
				<DialogTitle>
					{ title }
				</DialogTitle>
				<DialogContent>
					<FormControlLabel
						control={<Checkbox
							checked={tempConfirm}
							onChange={(e) => setTempConfirm(e.target.checked)}
						/>}
						label="Don't ask again"
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setOpen(false)
							setTempConfirm(false)
						}}
					>
						Cancel
					</Button>
					<Button
						type='submit'
						color='error'
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}