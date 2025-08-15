import Button from '@mui/material/Button'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid2'
import * as React from 'react'

import storage from '../../../util/storage'

export default function Dropdown({ value, setValue }) {

	const drop = React.useRef(React.createRef())
	const [openDrop, setopenDrop] = React.useState(false)

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
				onClick={() => setopenDrop(true)}
				endIcon={<UnfoldMoreIcon/>}
			>
				{storage('get', '', 'Note')}
			</Button>
			<Menu
				anchorEl={drop.current}
				open={openDrop}
				onClose={() => setopenDrop(false)}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}
			>
				{Object.keys(storage('get', '', 'Notes')).map((item) => (
					<MenuItem
						onClick={() => {
							setopenDrop(false)
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