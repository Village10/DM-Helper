import * as React from 'react'
import { alpha, Theme, useTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'

import AppNavbar from './components/navigation/AppNavbar'
import Header from './components/navigation/Header'
import Combat from './components/combat/Combat'
import Characters from './components/characters/Characters'
import Maps from './components/maps/Maps'
import Notes from './components/notes/Notes'
import Search from './components/search/Search'
import Settings from './components/settings/Settings'
import About from './components/about/About'
import SideMenu from './components/navigation/SideMenu'
import AppTheme from './shared-theme/AppTheme'
import {
	chartsCustomizations,
	dataGridCustomizations,
	datePickersCustomizations,
	treeViewCustomizations
} from './theme/customizations'
import storage from './util/storage'
import getWikiData from './util/getWikiData'

const xThemeComponents = {
	...chartsCustomizations,
	...dataGridCustomizations,
	...datePickersCustomizations,
	...treeViewCustomizations
}

export default function App(props: any) {

	if (!localStorage.getItem('mui-mode')) {
		localStorage.setItem('mui-mode', 'dark')
	}

	storage('createIfNeeded', true, 'Confirm', 'deleting a combatant')
	storage('createIfNeeded', true, 'Confirm', 'deleting a character')
	storage('createIfNeeded', true, 'Confirm', 'deleting a note')
	const [wikiData, setWikiData] = React.useState<{ name: string; tags: string[] }[] | null>(null)
	const [search, setSearch] = React.useState<string>('')
	const [tab, setTab] = React.useState<keyof typeof tabs>('Combat')

	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

	// TODO: Find new name for app
	// TODO: Make app function offline
	// TODO: Transfer from CRA to Vite
	// TODO: Transfer from js to tsx
	// TODO: Use Redux to stop prop drilling
	// TODO: Add tutorial

	React.useEffect(() => {
		getWikiData(setWikiData)
	}, [])

	React.useEffect(() => {
		if (tab.startsWith('Update')) {
			setTab(tab.slice(6) as keyof typeof tabs)
		}
	}, [tab])

	// TODO: Make tabs functionality cleaner
	// TODO: Make feedback tab
	const tabs = {
		Combat: Combat,
		Characters: Characters,
		Maps: Maps,
		Notes: Notes,
		Search: Search,
		Settings: Settings,
		About: About
	}
	const SelectedTab = tabs[tab]

	return (
		<AppTheme
			{...props}
			themeComponents={xThemeComponents}
		>
			<CssBaseline
				enableColorScheme
			/>
			<Box
				sx={{ display: 'flex' }}
			>
				<AppNavbar
					setTab={setTab}
					tab={tab}
				/>
				<SideMenu
					setTab={setTab}
					tab={tab}
				/>
				<Box
					component='main'
					sx={(theme: Theme & {
						vars?: {
							palette: {
								background: {
									defaultChannel: string;
								};
							};
						};}) => ({
						flexGrow: 1,
						backgroundColor: theme.vars
							? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
							: alpha(theme.palette.background.default, 1),
						overflow: 'auto'
					})}
				>
					<Stack
						spacing={2}
						sx={{
							alignItems: 'center',
							mx: 3,
							pb: 5,
							mt: { xs: 16, md: 0 }
						}}
					>
						{isSmallScreen ? null : <Header
							tab={tab}
						/>}
						{SelectedTab && <SelectedTab
							{...{
								search,
								setSearch,
								setTab,
								wikiData,
								setWikiData
							} as any}
						/>}
					</Stack>
				</Box>
			</Box>
		</AppTheme>
	)
}
