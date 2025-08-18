import Button from '@mui/material/Button'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import {Combatant} from "../Combatant";
import {Character} from "../../characters/Character";

interface DuplicateButtonProps {
	selected: Combatant | null,
	newCombatant: (
		name: string,
		maxHealth: string,
		armor: string,
		character?: Character | string | null,
		initiative?: string | null
	) => void
}

export default function DuplicateButton({ selected, newCombatant }: DuplicateButtonProps) {
	return (
		<>
			<Button
				variant='outlined'
				size='small'
				color='success'
				endIcon={<ContentCopyIcon/>}
				onClick={() => {
					if (selected) {
						newCombatant(selected.name, (selected.maxHealth).toString(), (selected.armor).toString(), selected.character)
					}
				}}
			>
				Duplicate
			</Button>
		</>
	)
}