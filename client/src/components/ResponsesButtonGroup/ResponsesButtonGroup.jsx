import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import ShowingTypo from './ShowingTypo';

const ResponsesButtonGroup = ({
	isPrevDisabled,
	handlePrevious,
	index,
	dataPoints,
	isNextDisabled,
	handleNext,
}) => {
	let marginTop,
		marginBottom = '0px';
	if (window.innerWidth < 800) {
		marginTop = '30px';
		marginBottom = '30px';
	} else {
		marginTop = '50px';
	}
	return (
		<Grid
			container
			style={{ marginTop: marginTop, marginBottom: marginBottom }}
		>
			<Grid item xs={4}>
				<Grid
					container
					alignItems="center"
					direction="row"
					justify="center"
				>
					<Button
						disabled={isPrevDisabled}
						onClick={handlePrevious}
						variant="outlined"
						color="secondary"
					>
						Previous
					</Button>
				</Grid>
			</Grid>
			<Grid item xs={4}>
				<Grid
					container
					alignItems="center"
					direction="row"
					justify="center"
				>
					<ShowingTypo index={index} dataPoints={dataPoints} />
				</Grid>
			</Grid>
			<Grid item xs={4}>
				<Grid
					container
					alignItems="center"
					direction="row"
					justify="center"
				>
					<Button
						disabled={isNextDisabled}
						onClick={handleNext}
						variant="outlined"
						color="secondary"
					>
						Next
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ResponsesButtonGroup;
