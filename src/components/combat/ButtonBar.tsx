import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import Card from '@mui/material/Card'

import EditButton from './buttons/EditButton'
import DuplicateButton from './buttons/DuplicateButton'
import SaveCombatantButton from './buttons/SaveCombatantButton'
import NewButton from './buttons/new_button/NewButton'
import DeleteButton from './buttons/delete_button/DeleteButton'
import DetailsButton from './buttons/DetailsButton'
import TurnButton from './buttons/TurnButton'
import {Combatant} from "./Combatant";
import {Dispatch, SetStateAction, useRef, useState} from "react";
import {Character} from "../characters/Character";

interface ButtonBarProps {
	selected: Combatant | null,
	setSelected: Dispatch<SetStateAction<Combatant | null>>,
	openEdit: boolean,
	setOpenEdit: Dispatch<SetStateAction<boolean>>,
	setTab: Dispatch<SetStateAction<string>>,
	setSearch: Dispatch<SetStateAction<string>>,
	combatants: Combatant[],
	setCombatants: Dispatch<SetStateAction<Combatant[]>>,
	newCombatant: (
		name: string,
		maxHealth: string,
		armor: string,
		character?: Character | string | null,
		initiative?: string | null
	) => void,
	turn: number,
	setTurn: Dispatch<SetStateAction<number>>
}

export default function ButtonBar({ selected, setSelected, openEdit, setOpenEdit, setTab, setSearch, combatants, setCombatants, newCombatant, turn, setTurn }: ButtonBarProps) {

	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
	const [open, setOpen] = useState(false)
	const drop = useRef<HTMLButtonElement>(null)

	const primaryButtons =
		<Stack
			direction='row'
			sx={{ flexWrap: 'wrap', gap: 1 }}
		>
			<TurnButton
				{...{ setSelected, combatants, turn, setTurn }}
			/>
		</Stack>

	const secondaryButtons =
		<>
			{selected && selected.character ?
				<DetailsButton
					{...{ selected, setSelected, setTab, setSearch }}
				/>
				: null
			}
			<EditButton
				{...{ selected, setSelected, openEdit, setOpenEdit, combatants, setCombatants }}
			/>
			<DuplicateButton
				{...{ selected, setSelected, combatants, newCombatant }}
			/>
			<SaveCombatantButton
				{...{ selected }}
			/>
			<NewButton
				{...{ setSelected, combatants, newCombatant }}
			/>
			<DeleteButton
				{...{ selected, setSelected, combatants, setCombatants }}
			/>
		</>

	if (isSmallScreen) {
		return (
			<>
				<Stack
					direction='row'
					justifyContent='space-between'
					sx={{
						gap: 1
					}}
				>
					{primaryButtons}
					<IconButton
						ref={drop}
						onClick={() => {
							setOpen(!open)
						}}
						sx={(theme) => ({
							color: theme.palette.text.primary,
							border: '1px solid',
							borderColor: theme.palette.grey[200],
							backgroundColor: alpha(theme.palette.grey[50], 0.3),
							'&:hover': {
								backgroundColor: theme.palette.grey[100],
								borderColor: theme.palette.grey[300]
							},
							'&:active': {
								backgroundColor: theme.palette.grey[200]
							},
							...theme.applyStyles('dark', {
								backgroundColor: theme.palette.grey[800],
								borderColor: theme.palette.grey[700],
								'&:hover': {
									backgroundColor: theme.palette.grey[900],
									borderColor: theme.palette.grey[600]
								},
								'&:active': {
									backgroundColor: theme.palette.grey[900]
								}
							})
						})}
					>
						{open ? <ArrowDropUp/> : <ArrowDropDown/>}
					</IconButton>
				</Stack>
				{!open ? null : (
					<>
						<br/>
						<Card>
							<Stack
								direction='row'
								sx={{ flexWrap: 'wrap', gap: 1 }}
							>
								{secondaryButtons}
							</Stack>
						</Card>
					</>
				)}
				<br/>
			</>
		)
	} else {
		return (
			<>
				<Stack
					direction='row'
					justifyContent='space-between'
					sx={{
						gap: 1
					}}
				>
					{primaryButtons}
					<Stack
						direction='row'
						sx={{ flexWrap: 'wrap', gap: 1 }}
						justifyContent='flex-end'
					>
						{secondaryButtons}
					</Stack>
				</Stack>
				<br/>
			</>
		)
	}
}