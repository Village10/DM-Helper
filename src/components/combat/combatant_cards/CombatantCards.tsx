import Grid from '@mui/material/Grid2'
import { CardActionArea, Tooltip } from '@mui/material'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import {
	Bolt,
	Healing,
	LocalHospital,
	ShieldOutlined
} from '@mui/icons-material'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import PersonIcon from '@mui/icons-material/Person'
import Stack from '@mui/material/Stack'

import AddHealth from './AddHealth'
import ChangeHealth from './ChangeHealth'
import RemoveHealth from './RemoveHealth'
import {Combatant} from "../Combatant";
import {Dispatch, SetStateAction} from "react";

interface CombatantCardProps {
	combatants: Combatant[],
	setCombatants: Dispatch<SetStateAction<Combatant[]>>
	selected: Combatant | null,
	setSelected: Dispatch<SetStateAction<Combatant | null>>,
	setOpenEdit: Dispatch<SetStateAction<boolean>>,
	turn: number
}

export default function CombatantCards({ combatants, setCombatants, selected, setSelected, setOpenEdit, turn }: CombatantCardProps) {
	return (
		<Grid
			container
			spacing={2}
			columns={12}
			sx={{ mb: (theme) => theme.spacing(2) }}
		>
			{combatants.map((combatant, index) => (
				<Grid
					size={{ xs: 12, sm: 6, lg: 3 }}
					key={index}
				>
					<CardActionArea
						component='div'
						onClick={() => {
							if (selected && selected.id === combatant.id) {
								setSelected(null)
							}
							else {
								setSelected(combatant)
							}
						}}
						onDoubleClick={() => {
							setSelected(combatant)
							setOpenEdit(true)
						}}
						sx={{
							borderRadius: 1,
							'&:hover': {
								'& .hover': {
									display: 'none'
								}
							}
						}}
					>
						<Card
							sx={(theme) => ({
								height: '100%',
								border: selected && combatant.id === selected.id ? '1px solid red': '1px solid #2f2f2f',
								boxShadow: index === (turn - 1) % combatants.length ? `5px 5px 10px -5px ${theme.palette.secondary.main}` : 'none' })}
						>
							<Box
								sx={{
									position: 'absolute',
									top: '12px',
									right: '12px',
									color: combatant.health === 0 ? 'red' : 'primary',
									borderRadius: '50%',
									display: 'flex',
									alignItems: 'center',
									fontSize: '30px',
									fontWeight: 'bold'
								}}
							>
								<Stack>
									<AddHealth
										combatant={combatant}
										setCombatants={setCombatants}
									/>
									<ChangeHealth
										combatant={combatant}
										setCombatants={setCombatants}
									/>
									<RemoveHealth
										combatant={combatant}
										setCombatants={setCombatants}
									/>
								</Stack>
							</Box>
							<CardContent>
								<Typography
									component='h2'
									variant='subtitle2'
									gutterBottom
									sx={{ fontWeight: '600', display: 'flex', alignItems: 'center' }}
								>
									{combatant.character ? <PersonIcon/> : null}
									{combatant.name}
								</Typography>
								<Stack
									spacing={0.5}
								>
									<Tooltip
										title='Health'
										placement='right'
										arrow
									>
										<Stack
											direction='row'
											alignItems='center'
											spacing={1}
											sx={{ width: 'fit-content' }}
										>
											<LocalHospital/>
											<Typography>
												{Math.min(combatant.health, 999) + ' / ' + combatant.maxHealth}
											</Typography>
										</Stack>
									</Tooltip>
									<Tooltip
										title='Temporary Health'
										placement='right'
										arrow
									>
										<Stack
											direction='row'
											alignItems='center'
											spacing={1}
											sx={{ width: 'fit-content' }}
										>
											<Healing/>
											<Typography>
												{combatant.tempHealth}
											</Typography>
										</Stack>
									</Tooltip>
									<Tooltip
										title='Armor Class'
										placement='right'
										arrow
									>
										<Stack
											direction='row'
											alignItems='center'
											spacing={1}
											sx={{ width: 'fit-content' }}
										>
											<ShieldOutlined/>
											<Typography>
												{combatant.armor}
											</Typography>
										</Stack>
									</Tooltip>
									<Tooltip
										title='Initiative'
										placement='right'
										arrow
									>
										<Stack
											direction='row'
											alignItems='center'
											spacing={1}
											sx={{ width: 'fit-content' }}
										>
											<Bolt/>
											<Typography>
												{combatant.initiative ? combatant.initiative : 'None'}
											</Typography>
										</Stack>
									</Tooltip>
								</Stack>
							</CardContent>
						</Card>
					</CardActionArea>
				</Grid>
			))}
		</Grid>
	)
}