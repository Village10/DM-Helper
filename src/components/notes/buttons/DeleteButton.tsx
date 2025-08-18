import Button from '@mui/material/Button'
import { Delete } from '@mui/icons-material'
import * as React from 'react'

import storage from '../../../util/storage'
import Confirmation from '../../../util/Confirmation'
import {Dispatch, SetStateAction} from "react";

interface DeleteButtonProps {
    value: string,
    setValue: Dispatch<SetStateAction<string>>
}

export default function DeleteButton({ value, setValue }: DeleteButtonProps) {

	const [openConfirmation, setOpenConfirmation] = React.useState(false)

	return (
		<>
			<Button
				variant='contained'
				color='error'
				endIcon={<Delete/>}
				size='small'
				onClick={() => setOpenConfirmation(true)}
			>
				Delete
			</Button>
			<Confirmation
				title='Delete Note'
				name='deleting a note'
				open={openConfirmation}
				setOpen={setOpenConfirmation}
				runFunction={() => {
					storage('delete', '', 'Notes', storage('get', '', 'Note'))
					storage('set', 'None', 'Note')
					setValue(value + ' ')
				}}
			/>
		</>
	)
}