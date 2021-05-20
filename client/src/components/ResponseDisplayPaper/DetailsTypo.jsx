import { Typography } from '@material-ui/core';
import React from 'react';

const DetailsTypo = ({ stationDetails }) => {
	return (
		<>
			<Typography variant="body1" component="p">
				<Typography
					component="span"
					variant="body1"
					style={{ color: '#ffd39c' }}
				>
					Name:{' '}
				</Typography>
				{stationDetails.name}
			</Typography>
			<Typography variant="body1" component="p">
				<Typography
					component="span"
					variant="body1"
					style={{ color: '#ffd39c' }}
				>
					Min:{' '}
				</Typography>
				{stationDetails.min}
			</Typography>
			<Typography variant="body1" component="p">
				<Typography
					component="span"
					variant="body1"
					style={{ color: '#ffd39c' }}
				>
					Max:{' '}
				</Typography>
				{stationDetails.max}
			</Typography>
			<Typography variant="body1" component="p">
				<Typography
					component="span"
					variant="body1"
					style={{ color: '#ffd39c' }}
				>
					Mean:{' '}
				</Typography>
				{stationDetails.median}
			</Typography>
		</>
	);
};

export default DetailsTypo;
