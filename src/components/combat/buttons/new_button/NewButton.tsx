import { ButtonGroup } from '@mui/material'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {Dispatch, SetStateAction, useRef, useState} from 'react'

import FromSave from './FromSave'
import FromCharacter from './FromCharacter'
import FromText from './FromText'
import FromMonster from './FromMonster'
import {Combatant} from "../../Combatant";
import {Character} from "../../../characters/Character";

interface NewButtonProps {
	setSelected: Dispatch<SetStateAction<Combatant | null>>,
	combatants: Combatant[],
	newCombatant:(
		name: string,
		maxHealth: string,
		armor: string,
		character?: Character | string | null,
		initiative?: string | null
	) => void,
}

export default function NewButton({ setSelected, combatants, newCombatant }: NewButtonProps) {

	const [openNew, setOpenNew] = useState<boolean>(false)
	const [openSaved, setOpenSaved] = useState<boolean>(false)
	const [openCharacter, setOpenCharacter] = useState<boolean>(false)
	const [openMonster, setOpenMonster] = useState<boolean>(false)
	const [openDrop, setOpenDrop] = useState<boolean>(false)
	const drop = useRef<HTMLButtonElement>(null)

	return (
		<>
			<ButtonGroup>
				<Button
					variant='outlined'
					size='small'
					endIcon={<AddIcon/>}
					onClick={() => setOpenNew(true)}
				>
					New
				</Button>
				<Button
					ref={drop}
					size='small'
					sx={{ padding: 0 }}
					aria-controls={openDrop ? 'basic-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={openDrop ? 'true' : undefined}
					onClick={() => setOpenDrop(true)}
				>
					<ArrowDropDownIcon/>
				</Button>
			</ButtonGroup>
			<Menu
				anchorEl={drop.current}
				open={openDrop}
				onClose={() => setOpenDrop(false)}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}
			>
				<MenuItem
					onClick={() => {
						setOpenDrop(false)
						setOpenNew(true)
					}}
				>
					From Text
				</MenuItem>
				<MenuItem
					onClick={() => {
						setOpenDrop(false)
						setOpenSaved(true)
					}}
				>
					From Save
				</MenuItem>
				<MenuItem
					onClick={() => {
						setOpenDrop(false);
						setOpenCharacter(true)
					}}
				>
					From Character
				</MenuItem>
				<MenuItem
					onClick={() => {setOpenDrop(false); setOpenMonster(true);}}
				>
					From Monster
				</MenuItem>
			</Menu>
			<FromSave
				{...{ openSaved, setOpenSaved, combatants, newCombatant, setSelected }}
			/>
			<FromText
				{...{ newCombatant, openNew, setOpenNew }}
			/>
			<FromCharacter
				{...{ combatants, newCombatant, setSelected, openCharacter, setOpenCharacter }}
			/>
			<FromMonster
				{...{ setOpenMonster, newCombatant, openMonster }}
			/>
		</>
	)
}