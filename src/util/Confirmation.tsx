import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from '@mui/material'
import Button from '@mui/material/Button'

import storage from './storage'
import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";

interface ConfirmationProps {
    title: string,
    name: string,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    runFunction: () => void,
}

export default function Confirmation({ title, name, open, setOpen, runFunction }: ConfirmationProps) {

	const [tempConfirm, setTempConfirm] = useState(false)
	const [confirm, setConfirm] = useState(() => {
		storage('createIfNeeded', true, 'confirmations', name)
		return storage('get', '', 'confirmations', name)
	})

	useEffect(() => {storage('set', confirm, 'confirmations', name)}, [confirm, name])
	useEffect(() => {
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
					onSubmit: (event: FormEvent) => {
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