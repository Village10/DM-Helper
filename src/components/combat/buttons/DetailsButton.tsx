import Button from '@mui/material/Button'
import { CardActionArea, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import * as React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LaunchIcon from '@mui/icons-material/Launch'
import Box from '@mui/material/Box'
import {Dispatch, SetStateAction} from "react";
import {Combatant} from "../Combatant";

interface DetailsButtonProps {
	selected: Combatant | null,
	setSelected: Dispatch<SetStateAction<Combatant | null>>,
	setTab: Dispatch<SetStateAction<string>>,
	setSearch: Dispatch<SetStateAction<string>>,
}

export default function DetailsButton({ selected, setSelected, setTab, setSearch }: DetailsButtonProps) {
	const [openEdit, setOpenEdit] = React.useState(false)

	return (
		<>
			<Button
				variant='outlined'
				size='small'
				color='success'
				endIcon={<InfoOutlinedIcon/>}
				onClick={() => selected && setOpenEdit(true)}
			>
				Details
			</Button>
			<Dialog
				open={openEdit}
				onClose={() => setOpenEdit(false)}
				PaperProps={{ component: 'form',
					onSubmit: (event: Event) => {
						event.preventDefault()
						setSelected(null)
						setOpenEdit(false)
					}
				}}
			>
				<DialogTitle>
					Details
				</DialogTitle>
				<DialogContent>
					<CardActionArea
						onClick={() => {setSearch(selected!.character!.mainClass); setTab('Search')}}
					>
						<Card >
							<Box
								display='flex'
								gap={10}
								justifyContent='space-between'
								alignItems='center'
							>
								<Typography>
									Class:
									{selected!.character!.mainClass}
								</Typography>
								<LaunchIcon/>
							</Box>
						</Card>
					</CardActionArea>
					<CardActionArea
						onClick={() => {setSearch(selected!.character!.subClass); setTab('Search')}}
					>
						<Card >
							<Box
								display='flex'
								gap={10}
								justifyContent='space-between'
								alignItems='center'
							>
								<Typography>
									Sub-Class:
									{selected!.character!.subClass}
								</Typography>
								<LaunchIcon/>
							</Box>
						</Card>
					</CardActionArea>
					<CardActionArea
						onClick={() => {setSearch(selected!.character!.species); setTab('Search')}}
					>
						<Card >
							<Box
								display='flex'
								gap={10}
								justifyContent='space-between'
								alignItems='center'
							>
								<Typography>
									Species:
									{selected ? selected!.character!.species: null}
								</Typography>
								<LaunchIcon/>
							</Box>
						</Card>
					</CardActionArea>
					<CardActionArea
						onClick={() => {setSearch(selected!.character!.background); setTab('Search')}}
					>
						<Card >
							<Box
								display='flex'
								gap={10}
								justifyContent='space-between'
								alignItems='center'
							>
								<Typography>
									Background:
									{selected!.character!.background}
								</Typography>
								<LaunchIcon/>
							</Box>
						</Card>
					</CardActionArea>
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