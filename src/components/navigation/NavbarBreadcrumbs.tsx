import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
	margin: theme.spacing(1, 0),
	[`& .${breadcrumbsClasses.separator}`]: {
		color: theme.palette.action.disabled,
		margin: 1
	},
	[`& .${breadcrumbsClasses.ol}`]: {
		alignItems: 'center'
	}
}))

interface NavbarBreadcrumbsProps {
    tab: string,
}

export default function NavbarBreadcrumbs({ tab }: NavbarBreadcrumbsProps) {
	return (
		<StyledBreadcrumbs
			aria-label='breadcrumb'
			separator={<NavigateNextRoundedIcon
				fontSize='small'
			/>}
		>
			<Typography
				variant='body1'
			>
				{__APP_NAME__}
			</Typography>
			<Typography
				variant='body1'
				sx={{ color: 'text.primary', fontWeight: 600 }}
			>
				{tab}
			</Typography>
		</StyledBreadcrumbs>
	)
}
