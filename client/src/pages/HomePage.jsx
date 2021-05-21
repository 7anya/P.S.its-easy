import { Button, Grid, Link, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Banner } from '../resources/undraw_Charts_re_5qe9.svg';

const HomePage = ({ user }) => {
	const [serverURL, setServerURL] = useState('');

	useEffect(() => {
		if (window.location.host === 'localhost:3000') {
			setServerURL('http://localhost:5000/');
		} else {
			setServerURL('/');
		}
	}, []);
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
						{user ? (
							<>
								<Typography
									component="h4"
									variant="h4"
									color="textSecondary"
									style={{ marginTop: '50px' }}
								>
									Welcome {user.name} !
								</Typography>
								<Link
									underline="none"
									href={serverURL + 'api/logout'}
								>
									<Button variant="outlined" color="primary">
										Log Out
									</Button>
								</Link>
							</>
						) : (
							<Link
								underline="none"
								href={serverURL + 'api/login'}
							>
								<Button variant="outlined" color="primary">
									Log In with Google
								</Button>
							</Link>
						)}
					</Typography>
				</Grid>
			</Grid>
		</>
	);
};

export default HomePage;
