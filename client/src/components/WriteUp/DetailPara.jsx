import { Fade, Typography } from '@material-ui/core';
import React from 'react';

const DetailPara = ({ fade, details }) => {
	return (
		<>
			<Fade in={fade}>
				<Typography component="p" type="body1">
					<Typography component="span" type="body1" color="secondary">
						Name :
					</Typography>

					<Typography component="span" type="body1">
						{' ' + details.name}
					</Typography>
				</Typography>
			</Fade>
			<Fade in={fade}>
				<Typography component="p" type="body1">
					<Typography component="span" type="body1" color="secondary">
						ID :
					</Typography>

					<Typography component="span" type="body1">
						{' ' + details.id}
					</Typography>
				</Typography>
			</Fade>
		</>
	);
};

export default DetailPara;
