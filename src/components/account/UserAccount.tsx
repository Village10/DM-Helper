import * as React from 'react'
import { Avatar, CardActionArea } from '@mui/material'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { listClasses } from '@mui/material/List'
import { paperClasses } from '@mui/material/Paper'
import Divider, { dividerClasses } from '@mui/material/Divider'
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { DeleteOutlined } from '@mui/icons-material'

import { auth, db, user } from '../../util/firebase'
import Confirmation from '../../util/Confirmation'
const provider = new GoogleAuthProvider()

export default function ProfileButton({ setTab, tab }) {

	// FIX: Save data to firestore
	// TODO: Cleanup account system code
	const [openConfirmation, setOpenConfirmation] = React.useState(false)
	const [, setUpdate] = useState(false)
	const [openDrop, setOpenDrop] = React.useState(false)
	const drop = React.useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const auth = getAuth()

		// Set up the listener for authentication state changes
		const unsubscribe = onAuthStateChanged(auth, (_user) => {
			setUpdate((prev) => !prev)
		})
		setUpdate((prev) => !prev)

		// Cleanup the listener when the component unmounts
		return () => unsubscribe()
	}, [])

	const handleLogout = () => {
		signOut(auth)
			.then(() => setTab('Update' + tab))
			.catch((error) => console.error(error))
		setOpenDrop(false)
	}

	if (!user) {
		return (
			<CardActionArea
				onClick={() => {
					signInWithPopup(auth, provider).then(async (result) => {
						const userDocRef = doc(db, 'users', result.user.uid)
						const docSnap = await getDoc(userDocRef)

						if (docSnap.exists()) {
							setOpenConfirmation(true)
						} else {
							const localStorageData = { ...localStorage }
							await setDoc(userDocRef, { localStorageData })
							setTab('Update' + tab)
						}
					}).catch((error) => console.log(error))
				}}
			>
				<Stack
					direction='row'
					sx={{
						p: 2,
						gap: 1,
						alignItems: 'center',
						borderTop: '1px solid',
						borderColor: 'divider'
					}}
				>
					<Avatar
						sizes='small'
						sx={{ width: 36, height: 36 }}
					/>
					<Box
						sx={{ mr: 'auto' }}
					>
						<Typography
							variant='body2'
							sx={{ fontWeight: 500, lineHeight: '16px' }}
						>
							Sign In
						</Typography>
					</Box>
				</Stack>
			</CardActionArea>
		)
	}

	return (
		<>
			<CardActionArea
				onClick={() => setOpenDrop(!openDrop)}
				ref={drop}
			>
				<Stack
					direction='row'
					sx={{
						p: 2,
						gap: 1,
						alignItems: 'center',
						borderTop: '1px solid',
						borderColor: 'divider'
					}}
				>
					<Avatar
						sizes='small'
						alt={user.displayName ?? undefined}
						src={user.photoURL ?? undefined}
						sx={{ width: 36, height: 36 }}
					>
						{user.displayName?.charAt(0)}
					</Avatar>
					<Box
						sx={{ mr: 'auto' }}
					>
						<Typography
							variant='body2'
							sx={{ fontWeight: 500, lineHeight: '16px' }}
						>
							{user.displayName}
						</Typography>
						<Typography
							variant='caption'
							sx={{ color: 'text.secondary' }}
						>
							{user.email}
						</Typography>
					</Box>
				</Stack>
			</CardActionArea>
			<Menu
				anchorEl={drop.current}
				id='menu'
				open={openDrop}
				onClose={() => setOpenDrop(false)}
				onClick={() => setOpenDrop(false)}
				transformOrigin={{ horizontal: 'left', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
				sx={{
					[`& .${listClasses.root}`]: {
						padding: '4px'
					},
					[`& .${paperClasses.root}`]: {
						padding: 0
					},
					[`& .${dividerClasses.root}`]: {
						margin: '4px -4px'
					}
				}}
			>
				<MenuItem
					onClick={() => {
						setOpenDrop(false)
						handleLogout()
					}}
					sx={{
						[`& .${listItemIconClasses.root}`]: {
							ml: 'auto',
							minWidth: 0
						}
					}}
				>
					<ListItemText>
						Logout
					</ListItemText>
					<ListItemIcon>
						<LogoutRoundedIcon
							fontSize='small'
						/>
					</ListItemIcon>
				</MenuItem>
				<Divider />
				<MenuItem
					onClick={() => setOpenDrop(false)}
					sx={{
						[`& .${listItemIconClasses.root}`]: {
							ml: '5px',
							minWidth: 0
						}
					}}
				>
					{/*TODO: Make functional*/}
					<ListItemText>
						Delete Account
					</ListItemText>
					<ListItemIcon>
						<DeleteOutlined
							fontSize='small'
						/>
					</ListItemIcon>
				</MenuItem>
			</Menu>
			<Confirmation
				title="Overwrite Current Data With Account Data"
				name='overwriting data'
				open={openConfirmation}
				setOpen={setOpenConfirmation}
				runFunction={async () => {
					const userDocRef = doc(db, 'users', user!.uid)
					const docSnap = await getDoc(userDocRef)
					const savedData = docSnap.data()?.localStorageData
					Object.keys(savedData).forEach((key) => {
						localStorage.setItem(key, savedData[key])
					})
					setTab('Update' + tab)
				}}
			/>
		</>
	)
}