import { Dialog, DialogActions, DialogTitle } from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'
import CombatantFields from '../../CombatantFields'
import {Dispatch, SetStateAction} from "react";
import {Combatant} from "../../Combatant";
import {Character} from "../../../characters/Character";

interface FromTextProps {
	selected: Combatant | null,
	openNew: boolean,
	setOpenNew: Dispatch<SetStateAction<boolean>>,
	newCombatant:(
		name: string,
		maxHealth: string,
		armor: string,
		character?: Character | null,
		initiative?: string | null
	) => void,
}

export default function FromText({ selected, openNew, setOpenNew, newCombatant }: FromTextProps) {
	return (
		<Dialog
			open={openNew}
			onClose={() => setOpenNew(false)}
			PaperProps={{ component: 'form',
				onSubmit: (event: Event) => {
					event.preventDefault()
					const formData = new FormData(event.currentTarget as HTMLFormElement)
					const formJson = Object.fromEntries(formData.entries()) as Record<string, string>
					newCombatant(formJson.name, formJson.health, formJson.armor, null, formJson.initiative)
					setOpenNew(false)
				}
			}}
		>
			<DialogTitle>
				New Combatant
			</DialogTitle>
			<CombatantFields selected={selected}/>
			<DialogActions>
				<Button
					onClick={() => setOpenNew(false)}
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
	)
}