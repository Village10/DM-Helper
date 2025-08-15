import Typography from '@mui/material/Typography'
import * as React from 'react'

export default function settingsTitle(title) {
	return (
		<Typography
			variant='h4'
			sx={{
				borderBottom: '3px solid'
			}}
		>
			{title}
		</Typography>
	)
}