import React from 'react'
import Drawer, { drawerClasses } from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'

import titleimage from '../../images/title.png'
import UserAccount from '../account/UserAccount'

import MenuContent from './MenuContent'

export default function SideMenuMobile({ open, toggleDrawer, tab, setTab }) {
	return (
		<Drawer
			anchor='right'
			open={open}
			onClose={toggleDrawer(false)}
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1,
				[`& .${drawerClasses.paper}`]: {
					backgroundImage: 'none',
					backgroundColor: 'background.paper'
				}
			}}
		>
			<Stack
				sx={{
					maxWidth: '70dvw',
					height: '100%'
				}}
			>
				<Stack
					sx={{
						width: '75%',
						justifyContent: 'center',
						alignItems: 'center',
						margin: '5% 12.5%'
					}}
				>
					<img
						src={titleimage}
						alt='Logo'
						style={{ width: '100%' }}
					/>
				</Stack>
				<Stack
					sx={{ flexGrow: 1 }}
				>
					<MenuContent
						setTab={setTab}
						tab={tab}
					/>
					<UserAccount
						tab={tab}
						setTab={setTab}
					/>
				</Stack>
			</Stack>
		</Drawer>
	)
}
