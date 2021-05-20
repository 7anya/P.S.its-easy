import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { ReactComponent as Banner } from '../resources/undraw_Charts_re_5qe9.svg';

const HomePage = () => {
	return (
		<>
			<Grid container>
				<Grid
					item
					xs={6}
					style={{ padding: '50px', position: 'relative' }}
				>
					<Banner style={{ position: 'absolute', left: 20 }} />
				</Grid>
				<Grid
					item
					xs={6}
					style={{ padding: '50px', paddingLeft: '100px' }}
				>
					<Typography component="h1" variant="h1" align="center">
						ps its easyyyyyyy
						<Button variant="outlined" color="primary">
							Log In with Google
						</Button>
					</Typography>
				</Grid>
			</Grid>
		</>
	);
};

export default HomePage;
