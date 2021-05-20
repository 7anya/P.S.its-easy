import { Typography } from '@material-ui/core';
import React from 'react';

const ShowingTypo = ({ index, dataPoints }) => {
	return (
		<Typography component="p">
			<Typography component="span" color="secondary">
				Showing{' '}
			</Typography>
			<Typography component="span" style={{ color: '#ffd39c' }}>
				{index.start + 1}{' '}
			</Typography>
			<Typography component="span" color="secondary">
				to{' '}
			</Typography>
			<Typography component="span" style={{ color: '#ffd39c' }}>
				{index.end}{' '}
			</Typography>
			<Typography component="span" color="secondary">
				of{' '}
			</Typography>
			<Typography component="span" style={{ color: '#ffd39c' }}>
				{dataPoints.length}{' '}
			</Typography>
			<Typography component="span" color="secondary">
				Results{' '}
			</Typography>
		</Typography>
	);
};

export default ShowingTypo;
