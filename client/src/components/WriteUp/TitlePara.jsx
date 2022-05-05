import { Fade, Typography } from '@mui/material';
import React from 'react';

const TitlePara = ({ fade, line, heading }) => {
	return (
		<>
			{fade ? (
				<Fade in={fade}>
					<Typography
						component="p"
						type="body1"
						style={{ marginTop: '20px' }}
					>
						<Typography
							component="p"
							type="body1"
							color="secondary"
						>
							{heading}
						</Typography>

						<Typography component="p" type="body1">
							{line.split(':').slice(1).join(':')}
						</Typography>
					</Typography>
				</Fade>
			) : (
				<Typography
					component="p"
					type="body1"
					style={{ marginTop: '20px' }}
				>
					<Typography component="p" type="body1" color="secondary">
						{heading}
					</Typography>

					<Typography component="p" type="body1">
						{line.split(':').slice(1).join(':')}
					</Typography>
				</Typography>
			)}
		</>
	);
};

export default TitlePara;
