import Button from '@mui/material/Button'
import { CardActionArea, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LaunchIcon from '@mui/icons-material/Launch'
import Box from '@mui/material/Box'

export default function DetailsButton({ selected, setSelected, setTab, setSearch }) {

	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

	const [openEdit, setOpenEdit] = React.useState(false)

	return (
		<>
			<Button
				variant='outlined'
				size='small'
				color='success'
				endIcon={<InfoOutlinedIcon/>}
				fullWidth={isSmallScreen}
				onClick={selected ? () => setOpenEdit(true): null}
			>
				Details
			</Button>
			<Dialog
				open={openEdit}
				onClose={() => setOpenEdit(false)}
				PaperProps={{ component: 'form',
					onSubmit: (event) => {
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
						onClick={() => {setSearch(selected.mainClass); setTab('Search')}}
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
									{selected ? selected.mainClass: null}
								</Typography>
								<LaunchIcon/>
							</Box>
						</Card>
					</CardActionArea>
					<CardActionArea
						onClick={() => {setSearch(selected.subClass); setTab('Search')}}
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
									{selected ? selected.subClass: null}
								</Typography>
								<LaunchIcon/>
							</Box>
						</Card>
					</CardActionArea>
					<CardActionArea
						onClick={() => {setSearch(selected.species); setTab('Search')}}
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
									{selected ? selected.species: null}
								</Typography>
								<LaunchIcon/>
							</Box>
						</Card>
					</CardActionArea>
					<CardActionArea
						onClick={() => {setSearch(selected.background); setTab('Search')}}
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
									{selected ? selected.background: null}
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