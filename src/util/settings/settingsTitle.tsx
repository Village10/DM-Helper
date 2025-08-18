import Typography from '@mui/material/Typography'
import * as React from 'react'

export default function settingsTitle(title: string) {
	return (
		<Typography
			variant='h4'
			sx={{
				borderBottom: '3px solid',
				marginBottom: '10px'
			}}
		>
			{title}
		</Typography>
	)
}