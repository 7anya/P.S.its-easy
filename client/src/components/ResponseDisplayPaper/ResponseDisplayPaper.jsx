import { Button, Link, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import FadeIn from 'react-fade-in';
import DetailsTypo from './DetailsTypo';

const useStyles = makeStyles((theme) => ({
	paper1: {
		padding: theme.spacing(3),
		textAlign: 'center',
		color: theme.palette.text.primary,
		height: '200px',
		margin: '40px',
		marginTop: '10px',
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.primary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
	},
}));

const ResponseDisplayPaper = ({ stationDetails, type }) => {
	const classes = useStyles();
	return (
		<Paper elevation={3} className={classes.paper1}>
			<FadeIn>
				{stationDetails.name ? (
					<div key={stationDetails.name}>
						<FadeIn>
							<DetailsTypo stationDetails={stationDetails} />
							{type === 'PS2' && (
								<Link
									underline="none"
									href={
										'/ps2/chronicles?search=' +
										stationDetails.name
									}
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
		</Paper>
	);
};

export default ResponseDisplayPaper;
