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
import Notes from './components/notes/Notes'
import Search from './components/search/Search'
import Settings from './components/settings/Settings'
import About from './components/about/About'
import SideMenu from './components/navigation/SideMenu'
import AppTheme from './shared-theme/AppTheme'
import storage from './util/storage'
import getWikiData from './util/getWikiData'

// FIX: Any type prop
export default function App(props: any) {

	if (!localStorage.getItem('mui-mode')) {
		localStorage.setItem('mui-mode', 'dark')
	}

	storage('createIfNeeded', true, 'confirmations', 'deleting a character')
	storage('createIfNeeded', true, 'confirmations', 'deleting a note')
	const [wikiData, setWikiData] = React.useState<{ name: string, tags: string[] }[] | null>(null)
	const [search, setSearch] = React.useState<string>('')
	const [tab, setTab] = React.useState<string>('Combat')

	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

	// FIX: Find new name
	// FIX: Make app function offline
	// TODO: Transfer from js to tsx
	// TODO: Add tutorial
	// TODO: Make tabs functionality cleaner
	// TODO: Make feedback tab
	// FEATURE: Use Redux to stop prop drilling
	// FEATURE: Add to DriveThroughRPG
	// FEATURE: Dice roller

	React.useEffect(() => {
		getWikiData(setWikiData)
	}, [])

	React.useEffect(() => {
		if (tab.startsWith('Update')) {
			setTab(tab.slice(6) as keyof typeof tabs)
		}
	}, [tab])

	const tabs = {
		Combat,
		Characters,
		Notes,
		Search,
		Settings,
		About
	}
	const SelectedTab = tabs[tab]

	return (
		<AppTheme
			{...props}
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
