import { Button, Link, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import FadeIn from 'react-fade-in';
import DetailsTypo from './DetailsTypo';

const PREFIX = 'ResponseDisplayPaper';

const classes = {
	paper1: `${PREFIX}-paper1`,
};

const StyledPaper = styled(Paper)(({ theme }) => ({
	[`&.${classes.paper1}`]: {
		padding: theme.spacing(3),
		textAlign: 'center',
		color: theme.palette.text.primary,
		height: '200px',
		margin: '40px',
		marginTop: '10px',
		marginBottom: '30px',
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.primary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
	},
}));

const ResponseDisplayPaper = ({ stationDetails, type }) => {
	return (
		<StyledPaper elevation={3} className={classes.paper1}>
			<FadeIn>
				{stationDetails.name ? (
					<div key={stationDetails.name}>
						<FadeIn>
							<DetailsTypo stationDetails={stationDetails} />
							{type === 'PS1' && (
								<Link
									underline="none"
									href={
										'/ps1/chronicles?search=' +
										stationDetails.name.split(' ')[0]
									}
									target="_blank"
								>
									<Button
										variant="outlined"
										color="primary"
										style={{ marginTop: '10px' }}
									>
										Checkout It's Chronicles
									</Button>
								</Link>
							)}
							{type === 'PS2Sem1' && (
								<Link
									underline="none"
									href={
										'/ps2/sem1/chronicles?search=' +
										stationDetails.name.split(' ')[0]
									}
									target="_blank"
								>
									<Button
										variant="outlined"
										color="primary"
										style={{ marginTop: '10px' }}
									>
										Checkout It's Chronicles
									</Button>
								</Link>
							)}
							{type === 'PS2Sem2' && (
								<Link
									underline="none"
									href={
										'/ps2/sem2/chronicles?search=' +
										stationDetails.name.split(' ')[0]
									}
									target="_blank"
								>
									<Button
										variant="outlined"
										color="primary"
										style={{ marginTop: '10px' }}
									>
										Checkout It's Chronicles
									</Button>
								</Link>
							)}
						</FadeIn>
					</div>
				) : (
					<FadeIn>
						<Typography variant="h6" component="h1" key={'hi'}>
							Hover over a station to print more details!
						</Typography>
					</FadeIn>
				)}
			</FadeIn>
		</StyledPaper>
	);
};

export default ResponseDisplayPaper;
