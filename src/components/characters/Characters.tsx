import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import { CardActionArea } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import PersonIcon from '@mui/icons-material/Person'

import storage from '../../util/storage'

import ButtonBar from './ButtonBar'
import {Character} from "./Character";
import {Dispatch, SetStateAction, useState} from "react";

interface CharactersProps {
    setSearch: Dispatch<SetStateAction<string>>,
    setTab: Dispatch<SetStateAction<string>>,
}

export default function Characters({ setSearch, setTab }: CharactersProps) {

	// FIX: How characters are stored
	storage('createIfNeeded', 0, 'character-id')
	const [selected, setSelected] = useState<Character | null>(null)

	return (
		<Box
			sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}
		>
			<Typography
				variant='h1'
				align='center'
				style={{ marginBottom: 20 }}
			>
				Characters
			</Typography>
			<ButtonBar
				selected={selected}
				setSelected={setSelected}
				setTab={setTab}
				setSearch={setSearch}
			/>
			<Grid
				container
				spacing={2}
				columns={12}
				sx={{ mb: (theme) => theme.spacing(2) }}
			>
				{storage('get', '', 'characters').map((item: Character) => (
					<Grid
						key={ item.id }
						size={{ xs: 12, sm: 6, lg: 3 }}
					>
						<CardActionArea
							onClick={() => {
								if (!selected) {
									setSelected(item)
								} else if (selected.id !== item.id) {
									setSelected(item)
								}
								else {
									setSelected(null)
								}
							}}
						>
							<Card
								sx={{ height: '100%', border: selected ? item.id === selected.id ? '1px solid red': '1px solid #2f2f2f' : '1px solid #2f2f2f' }}
							>
								<Box
									sx={{
										position: 'absolute',
										top: '12px',
										right: '12px',
										borderRadius: '50%',
										display: 'flex',
										alignItems: 'right',
										justifyContent: 'right',
										fontSize: '30px',
										fontWeight: 'bold'
									}}
								>
									{item.level}
								</Box>
								<CardContent>
									<Typography
										component='h2'
										variant='subtitle2'
										gutterBottom
										sx={{ fontWeight: '600', display: 'flex', alignItems: 'center' }}
									>
										<PersonIcon/>
										{item.name}
									</Typography>
									<Typography
										sx={{ color: 'text.secondary', mb: '8px' }}
									>
										Max Health:
										{' '}
										{item.maxHealth}
										<br/>
										Armor Class:
										{' '}
										{item.armor}
										<br/>
										Class:
										{' '}
										{item.mainClass}
										<br/>
										Sub-Class:
										{' '}
										{item.subClass}
										<br/>
										Species:
										{' '}
										{item.species}
										<br/>
										Background:
										{' '}
										{item.background}
										<br/>
									</Typography>
								</CardContent>
							</Card>
						</CardActionArea>
					</Grid>
				))}
			</Grid>
		</Box>
	)
}