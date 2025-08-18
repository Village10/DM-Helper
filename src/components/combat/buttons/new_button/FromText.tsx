import { Dialog, DialogActions, DialogTitle } from '@mui/material'
import Button from '@mui/material/Button'
import CombatantFields from '../../CombatantFields'
import {Dispatch, SetStateAction} from "react";
import {Character} from "../../../characters/Character";

interface FromTextProps {
	openNew: boolean,
	setOpenNew: Dispatch<SetStateAction<boolean>>,
	newCombatant:(
		name: string,
		maxHealth: string,
		armor: string,
		character?: Character | string | null,
		initiative?: string | null
	) => void,
}

export default function FromText({ openNew, setOpenNew, newCombatant }: FromTextProps) {
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
			<CombatantFields />
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