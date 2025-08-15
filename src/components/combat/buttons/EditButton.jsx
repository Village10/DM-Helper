import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import * as React from 'react'

export default function EditButton({ selected, setSelected, openEdit, setOpenEdit, combatants, setCombatants }) {
	return (
		<>
			<Button
				variant='outlined'
				size='small'
				color='success'
				endIcon={<EditIcon/>}
				onClick={selected ? () => setOpenEdit(true): null}
			>
				Edit
			</Button>
			<Dialog
				open={openEdit}
				onClose={() => setOpenEdit(false)}
				PaperProps={{ component: 'form',
					onSubmit: (event) => {
						event.preventDefault()
						const formData = new FormData(event.currentTarget)
						const formJson = Object.fromEntries(formData.entries())
						const instances = { ...combatants }
						const index = instances.findIndex((obj) => obj.id === selected.id)
						instances[index] = {
							...instances[index],
							'name': formJson.name,
							'max_health': parseInt(formJson.max_health),
							'health': Math.min(parseInt(formJson.max_health), instances[index].health),
							'temp_health': parseInt(formJson.temp_health),
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
				<DialogContent>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='name'
						label='Name'
						type='string'
						defaultValue={selected ? selected.name: null}
						inputProps={{ maxLength: 20 }}
						helperText='Max 20 characters'
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						required
						margin='dense'
						id='max_health'
						name='max_health'
						label='Max Health'
						type='number'
						InputProps={{ inputProps: { min: 1 } }}
						defaultValue={selected ? selected.max_health: null}
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						required
						margin='dense'
						id='temp_health'
						name='temp_health'
						label='Temporary Health'
						InputProps={{ inputProps: { min: 0 } }}
						defaultValue={selected ? selected.temp_health: null}
						type='number'
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						required
						margin='dense'
						id='armor'
						name='armor'
						label='Armor Class'
						type='number'
						InputProps={{ inputProps: { min: 0 } }}
						defaultValue={selected ? selected.armor: null}
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						margin='dense'
						id='initiative'
						name='initiative'
						label='Initiative'
						type='number'
						defaultValue={selected ? selected.initiative: null}
						fullWidth
						variant='standard'
					/>
				</DialogContent>
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