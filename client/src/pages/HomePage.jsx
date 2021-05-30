import {
	Button,
	Grid,
	Icon,
	IconButton,
	Link,
	Typography,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Banner } from '../resources/undraw_Charts_re_5qe9.svg';
import { loadCSS } from 'fg-loadcss';

const HomePage = ({ user }) => {
	const [serverURL, setServerURL] = useState('');
	const [users, setUsers] = useState(0);

	useEffect(() => {
		if (window.location.host === 'localhost:3000') {
			setServerURL('http://localhost:5000/');
		} else {
			setServerURL('/');
		}

		axios.get('/api/noOfUsers').then((res) => {
			let i = 1;
			let counter = setInterval(() => {
				if (i <= res.data) {
					setUsers(i);
					i++;
				} else {
					clearInterval(counter);
				}
			}, 100);
		});
	}, []);

	React.useEffect(() => {
		const node = loadCSS(
			'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
			document.querySelector('#font-awesome-css')
		);

		return () => {
			node.parentNode.removeChild(node);
		};
	}, []);
	return (
		<>
			{window.innerWidth <= '800' ? (
				<>
					<Grid
						container
						alignItems="center"
						direction="row"
						justify="center"
						style={{
							height: '80vh',
							padding: '5%',
							// backgroundImage: `url("/undraw_Charts_re_5qe9.svg")`,
							// backgroundSize: '90%',
							// backgroundRepeat: 'no-repeat',
							// backgroundPosition: 'center',
						}}
					>
						<div>
							<Typography
								component="h2"
								variant="h2"
								align="center"
							>
								P.S. It's Easy
							</Typography>
							<Grid
								container
								justify="center"
								alignItems="center"
							>
								<Link
									href="https://github.com/7anya/P.S.its-easy"
									target="_blank"
									underline="none"
								>
									<IconButton
										color="primary"
										component="span"
									>
										<Icon
											className="fab fa-github"
											color="primary"
											fontSize="large"
										></Icon>
									</IconButton>
								</Link>
								<Link
									href="https://one-to-tan.blogspot.com/2021/05/ps-its-easy.html"
									target="_blank"
									underline="none"
								>
									<IconButton
										color="primary"
										component="span"
									>
										<Icon
											className="fab fa-blogger"
											color="primary"
											fontSize="large"
										></Icon>
									</IconButton>
								</Link>
							</Grid>
							<Typography
								component="h6"
								variant="h6"
								align="center"
								style={{ marginTop: '5%' }}
							>
								<Typography component="span" variant="h6">
									We have{' '}
								</Typography>
								<Typography
									component="span"
									variant="h6"
									color="secondary"
								>
									{users}{' '}
								</Typography>
								<Typography component="span" variant="h6">
									happy{' '}
								</Typography>
								<Typography
									component="span"
									variant="h6"
									color="secondary"
								>
									BITSians{' '}
								</Typography>
								<Typography component="span" variant="h6">
									onboard :)
								</Typography>
							</Typography>
						</div>

						<div style={{ textAlign: 'center' }}>
							{user ? (
								<>
									<Typography
										component="h4"
										variant="h4"
										color="textSecondary"
										style={{ marginTop: '5%' }}
									>
										Hey 👋{' '}
										{user.name
											.split(' ')
											.slice(0, 2)
											.join(' ')
											.replace(' ', '\u00A0')}
									</Typography>
									<Link
										underline="none"
										href={serverURL + 'api/logout'}
										style={{ marginTop: '5%' }}
									>
										<Button
											variant="outlined"
											color="primary"
											style={{ marginTop: '5%' }}
										>
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
						</div>
					</Grid>
					<Typography align="center" component="h6" variant="h6">
						<Typography component="span" variant="h6">
							Made with 💜 by{' '}
						</Typography>
						<Link
							href="https://github.com/Joe2k"
							target="_blank"
							underline="none"
						>
							<Typography
								component="span"
								color="primary"
								variant="h6"
							>
								Jonny{' '}
							</Typography>
						</Link>

						<Typography component="span" variant="h6">
							and{' '}
						</Typography>
						<Link
							href="https://github.com/7anya"
							target="_blank"
							underline="none"
						>
							<Typography
								component="span"
								color="primary"
								variant="h6"
							>
								Tan
							</Typography>
						</Link>
					</Typography>
				</>
			) : (
				<>
					<Grid
						container
						alignItems="center"
						direction="row"
						justify="center"
						style={{ height: '84vh' }}
					>
						<Grid item xs={6} style={{}}>
							<Banner />
						</Grid>
						<Grid
							item
							xs={6}
							style={{ paddingLeft: '5vw', paddingRight: '5vw' }}
						>
							<Typography
								component="h1"
								variant="h1"
								align="center"
							>
								P.S. It's Easy
							</Typography>
							<Grid
								container
								justify="center"
								alignItems="center"
							>
								<Link
									href="https://github.com/7anya/P.S.its-easy"
									target="_blank"
									underline="none"
								>
									<IconButton
										color="primary"
										component="span"
									>
										<Icon
											className="fab fa-github"
											color="primary"
											fontSize="large"
										></Icon>
									</IconButton>
								</Link>
								<Link
									href="https://one-to-tan.blogspot.com/2021/05/ps-its-easy.html"
									target="_blank"
									underline="none"
								>
									<IconButton
										color="primary"
										component="span"
									>
										<Icon
											className="fab fa-blogger"
											color="primary"
											fontSize="large"
										></Icon>
									</IconButton>
								</Link>
							</Grid>
							<Typography
								component="h6"
								variant="h6"
								align="center"
								style={{ marginTop: '5%' }}
							>
								<Typography component="span" variant="h6">
									We have{' '}
								</Typography>
								<Typography
									component="span"
									variant="h6"
									color="secondary"
								>
									{users}{' '}
								</Typography>
								<Typography component="span" variant="h6">
									happy{' '}
								</Typography>
								<Typography
									component="span"
									variant="h6"
									color="secondary"
								>
									BITSians{' '}
								</Typography>
								<Typography component="span" variant="h6">
									onboard :)
								</Typography>
							</Typography>
							{user ? (
								<>
									<Typography
										component="h4"
										variant="h4"
										color="textSecondary"
										style={{ marginTop: '5%' }}
										align="center"
									>
										Hey 👋{' '}
										{user.name
											.split(' ')
											.slice(0, 2)
											.join(' ')
											.replace(' ', '\u00A0')}
									</Typography>
									<Grid
										container
										justify="center"
										alignItems="center"
										style={{ marginTop: '5%' }}
									>
										<Link
											underline="none"
											href={serverURL + 'api/logout'}
										>
											<Button
												variant="outlined"
												color="primary"
											>
												Log Out
											</Button>
										</Link>
									</Grid>
								</>
							) : (
								<Grid
									container
									justify="center"
									alignItems="center"
									style={{ marginTop: '5%' }}
								>
									<Link
										underline="none"
										href={serverURL + 'api/login'}
									>
										<Button
											variant="outlined"
											color="primary"
										>
											Log In with Google
										</Button>
									</Link>
								</Grid>
							)}
						</Grid>
					</Grid>
					<Typography align="center" component="h6" variant="h6">
						<Typography component="span" variant="h5">
							Made with 💜 by{' '}
						</Typography>
						<Link
							href="https://github.com/Joe2k"
							target="_blank"
							underline="none"
						>
							<Typography
								component="span"
								color="primary"
								variant="h5"
							>
								Jonny{' '}
							</Typography>
						</Link>

						<Typography component="span" variant="h5">
							and{' '}
						</Typography>
						<Link
							href="https://github.com/7anya"
							target="_blank"
							underline="none"
						>
							<Typography
								component="span"
								color="primary"
								variant="h5"
							>
								Tan
							</Typography>
						</Link>
					</Typography>
				</>
			)}
		</>
	);
};

export default HomePage;
