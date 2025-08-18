import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import EditNoteIcon from '@mui/icons-material/EditNote'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import {Dispatch, SetStateAction} from "react";

const mainListItems = [
	{ text: 'Combat', icon: <LocalFireDepartmentIcon /> },
	{ text: 'Characters', icon: <PersonIcon /> },
	{ text: 'Notes', icon: <EditNoteIcon /> },
	{ text: 'Search', icon: <SearchIcon /> }
]

const secondaryListItems = [
	{ text: 'Settings', icon: <SettingsRoundedIcon /> },
	{ text: 'About', icon: <InfoRoundedIcon /> }
]

interface MenuContentProps {
    tab: string,
    setTab: Dispatch<SetStateAction<string>>
}

export default function MenuContent({ tab, setTab }: MenuContentProps) {
	return (
		<Stack
			sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}
		>
			<List
				dense
			>
				{mainListItems.map((item, index) => (
					<ListItem
						key={index}
						disablePadding
						sx={{ display: 'block' }}
					>
						<ListItemButton
							selected={item.text === tab}
							onClick={() => setTab(item.text)}
						>
							<ListItemIcon>
								{item.icon}
							</ListItemIcon>
							<ListItemText
								primary={item.text}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<List
				dense
			>
				{secondaryListItems.map((item, index) => (
					<ListItem
						key={index}
						disablePadding
						sx={{ display: 'block' }}
					>
						<ListItemButton
							selected={item.text === tab}
							onClick={() => setTab(item.text)}
						>
							<ListItemIcon>
								{item.icon}
							</ListItemIcon>
							<ListItemText
								primary={item.text}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Stack>
	)
}
