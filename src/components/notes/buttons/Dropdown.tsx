import Button from '@mui/material/Button'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid2'

import storage from '../../../util/storage'
import {Dispatch, SetStateAction, useRef, useState} from "react";

interface DropdownProps {
    value: string,
    setValue: Dispatch<SetStateAction<string>>
}

export default function Dropdown({ value, setValue }: DropdownProps) {

	const [openDrop, setOpenDrop] = useState(false)
    const drop = useRef(null)

	return (
		<Grid
			container
		>
			<Button
				variant={'outlined'}
				ref={drop}
				size='small'
				aria-controls={openDrop ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={openDrop ? 'true' : undefined}
				onClick={() => setOpenDrop(true)}
				endIcon={<UnfoldMoreIcon/>}
			>
				{storage('get', '', 'Note')}
			</Button>
			<Menu
				anchorEl={drop.current}
				open={openDrop}
				onClose={() => setOpenDrop(false)}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}
			>
				{Object.keys(storage('get', '', 'Notes')).map((item) => (
					<MenuItem
						onClick={() => {
							setOpenDrop(false)
							storage('set', value, 'Notes', storage('get', '', 'Note'))
							storage('set', item, 'Note')
							if (item === 'None') {
								setValue(value + ' ')
							} else {
								setValue(storage('get', '', 'Notes', item))
							}
						}}
					>
						{item}
					</MenuItem>
				))}
			</Menu>
		</Grid>
	)
}