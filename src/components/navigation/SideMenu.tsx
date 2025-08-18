import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer'

import titleimage from '../../images/title.png'
import UserAccount from '../account/UserAccount'

import MenuContent from './MenuContent'
import {Dispatch, SetStateAction} from "react";

const drawerWidth = 240

const Drawer = styled(MuiDrawer)({
	width: drawerWidth,
	flexShrink: 0,
	boxSizing: 'border-box',
	mt: 10,
	[`& .${drawerClasses.paper}`]: {
		width: drawerWidth,
		boxSizing: 'border-box'
	}
})

interface SideMenuProps {
    tab: string,
    setTab: Dispatch<SetStateAction<string>>
}

export default function SideMenu({ tab, setTab }: SideMenuProps) {
	return (
		<Drawer
			variant='permanent'
			sx={{
				display: { xs: 'none', md: 'block' },
				[`& .${drawerClasses.paper}`]: {
					backgroundColor: 'background.paper'
				}
			}}
		>
			<img
				src={titleimage}
				alt='Logo'
				style={{ width: '75%', margin: '12.5% 16% 12.5% 9%' }}
			/>
			<MenuContent
				tab={tab}
				setTab={setTab}
			/>
			<UserAccount
				tab={tab}
				setTab={setTab}
			/>
		</Drawer>
	)
}
