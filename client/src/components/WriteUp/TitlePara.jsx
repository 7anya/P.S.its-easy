import { Fade, Typography } from '@material-ui/core';
import React from 'react';

const TitlePara = ({ fade, line, heading }) => {
	return (
		<Fade in={fade}>
			<Typography
				component="p"
				type="body1"
				style={{ marginTop: '20px' }}
			>
				<Typography component="p" type="body1" color="secondary">
					{heading}
				</Typography>

				<Typography component="p" type="body1">
					{line.split(':')[1]}
				</Typography>
			</Typography>
		</Fade>
	);
};

export default TitlePara;
