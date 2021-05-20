import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';

const ButtonSelect = ({
	isPrevDisabled,
	handlePrevious,
	isNextDisabled,
	handleNext,
	stations,
	index
}) => {
	return (
		<Grid container style={{ paddingLeft: '50px', paddingRight: '50px' }}>
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
						color="primary"
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
					<Typography align="center" color="primary" style={{ marginTop: "5px" }}>{index.start + 1} - {index.end} of {stations.length}</Typography>
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
						color="primary"
					>
						Next
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ButtonSelect;
