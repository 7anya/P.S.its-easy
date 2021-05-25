import { Typography } from '@material-ui/core';
import React from 'react';

const ShowingTypo = ({ index, dataPoints }) => {
	return (
		<Typography component="p" style={{ marginTop: '5px' }}>
			{window.innerWidth < 800 ? (
				<>
					<Typography component="span" color="secondary">
						Page
						{' ' + index.end / 15 + ' of ' + dataPoints.length / 15}
					</Typography>
				</>
			) : (
				<>
					<Typography component="span" color="secondary">
						Page{' '}
					</Typography>
					<Typography component="span" style={{ color: '#ffd39c' }}>
						{index.end / 15}{' '}
					</Typography>
					<Typography component="span" color="secondary">
						of{' '}
					</Typography>
					<Typography component="span" style={{ color: '#ffd39c' }}>
						{dataPoints.length / 15}{' '}
					</Typography>
				</>
			)}
		</Typography>
	);
};

export default ShowingTypo;
