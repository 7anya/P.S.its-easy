import { Button, Grid } from '@material-ui/core';
import React from 'react';

const ButtonSelect = ({
	isPrevDisabled,
	handlePrevious,
	isNextDisabled,
	handleNext,
}) => {
	return (
		<Grid container style={{ paddingLeft: '50px', paddingRight: '50px' }}>
			<Grid item xs={6}>
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
			<Grid item xs={6}>
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
