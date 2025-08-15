import {
	ButtonGroup,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel
} from '@mui/material'
import Button from '@mui/material/Button'
import Delete from '@mui/icons-material/Delete'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import Divider from '@mui/material/Divider'

import storage from '../../../../util/storage'

import { DeleteSaved } from './DeleteSaved'

export default function DeleteButton({ selected, setSelected, combatants, setCombatants }) {
	const [openDelete, setOpenDelete] = React.useState(false)
	const [deleteDrop, setDeleteDrop] = React.useState(false)
	const [openDeleteSaved, setOpenDeleteSaved] = React.useState(false)
	const drop = React.useRef()
	const [saveChecked, setSaveChecked] = React.useState([])
	const [temporaryConfirm, setTemporaryConfirm] = React.useState(false)

	function handleDelete(popup) {
		if (selected) {
			if (storage('get', '', 'Confirm', 'deleting a combatant') && popup) {
				setOpenDelete(true)
			} else {
				const instances = combatants.filter((item) => item.id !== selected.id)
				const index = combatants.findIndex((item) => item.id === selected.id)
				setSelected(instances[Math.max(Math.min(index, instances.length - 1), 0)])
				setCombatants(instances)
			}
		}
	}

	return (
		<>
			<ButtonGroup
				size='small'
				variant='contained'
				color='error'
			>
				<Button
					endIcon={<Delete/>}
					onClick={() => {handleDelete(true)}}
				>
					Delete
				</Button>
				<Button
					ref={drop}
					sx={{ padding: 0 }}
					aria-controls={deleteDrop ? 'basic-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={deleteDrop}
					onClick={() => setDeleteDrop(true)}
				>
					<ArrowDropDownIcon/>
				</Button>
			</ButtonGroup>
			<Menu
				anchorEl={drop.current}
				open={deleteDrop}
				onClose={() => setDeleteDrop(false)}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}
			>
				<MenuItem
					onClick={() => {setDeleteDrop(false); handleDelete(true)}}
				>
					Delete Selected
				</MenuItem>
				<MenuItem
					onClick={() => {setDeleteDrop(false); setOpenDeleteSaved(true); setSaveChecked([])}}
				>
					Delete Saved
				</MenuItem>
				<Divider/>
				<MenuItem
					onClick={() => {setDeleteDrop(false); setCombatants([]); setSelected(null)}}
				>
					Clear Combatants
				</MenuItem>
				<MenuItem
					onClick={() => {setDeleteDrop(false); setCombatants({})}}
				>
					Clear Saved
				</MenuItem>
			</Menu>
			<DeleteSaved
				setSaveChecked={setSaveChecked}
				saveChecked={saveChecked}
				openDeleteSaved={openDeleteSaved}
				setOpenDeleteSaved={setOpenDeleteSaved}
			/>
			<Dialog
				open={openDelete}
				onClose={() => {setOpenDelete(false); setTemporaryConfirm(false)}}
				PaperProps={{ component: 'form',
					onSubmit: (event) => {
						event.preventDefault()
						if (temporaryConfirm) {
							storage('set', false, 'Confirm', 'deleting a combatant')
							setTemporaryConfirm(false)
						}
						handleDelete(false)
						setOpenDelete(false)
					}
				}}
			>
				<DialogTitle>
					Delete Combatant
				</DialogTitle>
				<DialogContent>
					<FormControlLabel
						control={<Checkbox
							checked={temporaryConfirm}
							onClick={() => temporaryConfirm ? setTemporaryConfirm(false) : setTemporaryConfirm(true)}
						/>}
						label="Don't ask again"
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {setOpenDelete(false); setTemporaryConfirm(false)}}
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