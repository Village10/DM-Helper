import { ButtonGroup } from '@mui/material'
import Button from '@mui/material/Button'
import Delete from '@mui/icons-material/Delete'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'

import { DeleteSaved } from './DeleteSaved'
import Confirmation from '../../../../util/Confirmation'
import { Dispatch, SetStateAction, useState, useRef } from "react";
import { Combatant } from '../../Combatant'

interface DeleteButtonProps {
	selected: Combatant | null,
	setSelected: Dispatch<SetStateAction<Combatant | null>>,
	combatants: Combatant[],
	setCombatants: Dispatch<SetStateAction<Combatant[]>>,
}

export default function DeleteButton({ selected, setSelected, combatants, setCombatants }: DeleteButtonProps) {
	const [openConfirmation, setOpenConfirmation] = useState(false)
	const [openDeleteSaved, setOpenDeleteSaved] = useState(false)
	const [deleteDrop, setDeleteDrop] = useState(false)
	const drop = useRef<HTMLButtonElement>(null)

	return (
		<>
			<ButtonGroup
				size='small'
				variant='contained'
				color='error'
			>
				<Button
					endIcon={<Delete/>}
					onClick={() => {setOpenConfirmation(true)}}
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
					onClick={() => {setDeleteDrop(false); setOpenConfirmation(true)}}
				>
					Delete Selected
				</MenuItem>
				<MenuItem
					onClick={() => {
                        setDeleteDrop(false)
                        setOpenDeleteSaved(true)
                    }}
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
					onClick={() => {setDeleteDrop(false); setCombatants([])}}
				>
					Clear Saved
				</MenuItem>
			</Menu>
			<DeleteSaved
				{...{ openDeleteSaved, setOpenDeleteSaved}}
			/>
			<Confirmation
				title="Delete Combatant"
				name='deleting a combatant'
				open={openConfirmation}
				setOpen={setOpenConfirmation}
				runFunction={() => {
					const instances = combatants.filter((item) => item.id !== selected?.id)
					const index = combatants.findIndex((item) => item.id === selected?.id)
					setSelected(instances[Math.max(Math.min(index, instances.length - 1), 0)])
					setCombatants(instances)
				}}
			/>
		</>
	)
}