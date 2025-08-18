import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link } from '@mui/material'

export default function About() {

	const theme = useTheme()
	const primary = theme.palette.text.primary.replaceAll('%', '%25').replaceAll(' ', '').replaceAll(',', '%2C%20')
	const secondary = theme.palette.background.default.replaceAll('%', '%25').replaceAll(' ', '').replaceAll(',', '%2C%20')

	return (
		<div
			style={{ width: '50%' }}
		>
			<Typography
				variant="h1"
				align="center"
			>
				About {__APP_NAME__}
			</Typography>
			<Typography
				variant="h6"
				align="center"
				style={{ marginBottom: 10, marginTop: 0 }}
			>
				Version {__APP_VERSION__}
			</Typography>
			<div
				style={{
					textAlign: 'center',
					display: 'flex',
					flexWrap: 'wrap',
					columnGap: '0.5rem',
					justifyContent: 'center'
				}}
			>
				<a
					href="https://react.dev"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=' + secondary + '&labelColor=' + primary + '&style=for-the-badge'}
						alt="React"
					/>
				</a>
				<a
					href="https://npmjs.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://img.shields.io/badge/-Npm-CB3837?logo=npm&logoColor=' + secondary + '&labelColor=' + primary + '&style=for-the-badge'}
						alt="Npm"
					/>
				</a>
				<a
					href="https://mui.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://img.shields.io/badge/-MUI-007FFF?logo=mui&logoColor=' + secondary + '&labelColor=' + primary + '&style=for-the-badge'}
						alt="MUI"
					/>
				</a>
				<a
					href="https://dnd.wizards.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://img.shields.io/badge/-D&D-ED1C24?logo=dungeonsanddragons&logoColor=' + secondary + '&labelColor=' + primary + '&style=for-the-badge'}
						alt="D&D"
					/>
				</a>
				<a
					href="https://nodejs.org/en"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://img.shields.io/badge/-NodeJs-5FA04E?logo=nodedotjs&logoColor=' + secondary + '&labelColor=' + primary + '&style=for-the-badge'}
						alt="NodeJs"
					/>
				</a>
				<span
					style={{ flexBasis: '100%' }}
				/>
				<a
					href="https://github.com/Village10/DM-Helper/releases"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://img.shields.io/github/v/release/Village10/DM-Helper?include_prereleases&logoColor=' + secondary + '&labelColor=' + primary + '&style=for-the-badge'}
						alt="GitHub release"
					/>
				</a>
				<a
					href="https://DM-Helper.duckdns.org:3000"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://img.shields.io/badge/Website-URL-green?&logoColor=' + secondary + '&labelColor=' + primary + '&style=for-the-badge'}
						alt="Website"
					/>
				</a>
				<a
					href="https://github.com/Village10/DM-Helper/releases"
				>
					<img
						src={'https://img.shields.io/github/repo-size/Village10/DM-Helper?include_prereleases&logoColor=' + secondary + '&labelColor=' + primary + '&style=for-the-badge'}
						alt="Repo size"
					/>
				</a>
			</div>
			<Typography
				variant="h3"
				align="center"
			>
				<strong>Disclaimers</strong>
			</Typography>
			{__APP_NAME__} is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed
			by Wizards.
			Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.
			<br/><br/>
			Search data adapted from the {' '}
			<Link
				href='http://dnd2024.wikidot.com'
				target='_blank'
			>
				Dnd 2024 Wikidot
			</Link>
			, licensed under Creative Commons Attribution-ShareAlike 3.0 License.
			Original data may have been modified for this application.
		</div>
	)
}