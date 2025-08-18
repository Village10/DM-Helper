import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import { Dialog, DialogActions, DialogTitle } from '@mui/material'
import * as React from 'react'
import CombatantFields from '../CombatantFields'
import {Dispatch, SetStateAction} from "react";
import {Combatant} from "../Combatant";

interface EditButtonProps {
	selected: Combatant | null,
	setSelected: Dispatch<SetStateAction<Combatant | null>>,
	openEdit: boolean,
	setOpenEdit: Dispatch<SetStateAction<boolean>>,
	combatants: Combatant[],
	setCombatants: Dispatch<SetStateAction<Combatant[]>>
}

export default function EditButton({ selected, setSelected, openEdit, setOpenEdit, combatants, setCombatants }: EditButtonProps) {
	return (
		<>
			<Button
				variant='outlined'
				size='small'
				color='success'
				endIcon={<EditIcon/>}
				onClick={() => selected && setOpenEdit(true)}
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
						const instances = { ...combatants }
						const index = instances.findIndex((obj) => obj.id === selected?.id)
						instances[index] = {
							...instances[index],
							'name': formJson.name,
							'maxHealth': parseInt(formJson.maxHealth),
							'armor': parseInt(formJson.armor),
							'initiative': parseInt(formJson.initiative)
						}
						setSelected(instances[index])
						setCombatants(instances)
						setOpenEdit(false)
					}
				}}
			>
				<DialogTitle>
					Edit Combatant
				</DialogTitle>
				<CombatantFields {...{selected}}/>
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