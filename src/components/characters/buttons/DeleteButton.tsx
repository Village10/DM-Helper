import Button from '@mui/material/Button'
import Delete from '@mui/icons-material/Delete'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import storage from '../../../util/storage'
import Confirmation from '../../../util/Confirmation'
import {Character} from "../Character";
import {useState} from "react";

export default function DeleteButton({ selected, setSelected }) {

	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

	const [openConfirmation, setOpenConfirmation] = useState(false)

	return (
		<>
			<Button
				variant='contained'
				endIcon={<Delete/>}
				size='small'
				fullWidth={isSmallScreen}
				onClick={() => {setOpenConfirmation(true)}}
				color='error'
			>
				Delete
			</Button>
			<Confirmation
				title="Delete Character"
				name='deleting a character'
				open={openConfirmation}
				setOpen={setOpenConfirmation}
				runFunction={() => {
					const instances = storage('get', '', 'characters')
					const selected_place = instances.findIndex((item: Character) => item.id === selected.id)
					instances.splice(selected_place, 1)
					setSelected(instances[Math.max(Math.min(selected_place, instances.length - 1), 0)])
					storage('set', instances, 'characters')
				}}
			/>
		</>
	)
}