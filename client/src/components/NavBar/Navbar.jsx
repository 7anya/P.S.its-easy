import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import LogOut from '@mui/icons-material/ExitToApp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useHistory } from 'react-router-dom';
const PREFIX = 'Navbar';

const classes = {
	grow: `${PREFIX}-grow`,
	menuButton: `${PREFIX}-menuButton`,
	title: `${PREFIX}-title`,
	inputRoot: `${PREFIX}-inputRoot`,
	inputInput: `${PREFIX}-inputInput`,
	sectionDesktop: `${PREFIX}-sectionDesktop`,
	sectionMobile: `${PREFIX}-sectionMobile`,
};

const Root = styled('div')(({ theme }) => ({
	[`&.${classes.grow}`]: {
		flexGrow: 1,
	},

	[`& .${classes.menuButton}`]: {
		marginRight: theme.spacing(2),
	},

	[`& .${classes.title}`]: {
		flexGrow: 1,
	},

	[`& .${classes.inputRoot}`]: {
		color: 'inherit',
	},

	[`& .${classes.inputInput}`]: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},

	[`& .${classes.sectionDesktop}`]: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},

	[`& .${classes.sectionMobile}`]: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));

function Navbar({ user }) {
	let history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const [anchorEl1, setAnchorEl1] = React.useState(null);
	const open1 = Boolean(anchorEl1);
	const handleClick1 = (event) => {
		setAnchorEl1(event.currentTarget);
	};
	const handleClose1 = () => {
		setAnchorEl1(null);
	};

	const [anchorEl2, setAnchorEl2] = React.useState(null);
	const open2 = Boolean(anchorEl2);
	const handleClick2 = (event) => {
		setAnchorEl2(event.currentTarget);
	};
	const handleClose2 = () => {
		setAnchorEl2(null);
	};
	const [anchorEl3, setAnchorEl3] = React.useState(null);
	const open3 = Boolean(anchorEl3);
	const handleClick3 = (event) => {
		setAnchorEl3(event.currentTarget);
	};
	const handleClose3 = () => {
		setAnchorEl3(null);
	};

	const [anchorEl4, setAnchorEl4] = React.useState(null);
	const open4 = Boolean(anchorEl4);
	const handleClick4 = (event) => {
		setAnchorEl4(event.currentTarget);
	};
	const handleClose4 = () => {
		setAnchorEl4(null);
	};

	const [anchorEl5, setAnchorEl5] = React.useState(null);
	const open5 = Boolean(anchorEl5);
	const handleClick5 = (event) => {
		setAnchorEl5(event.currentTarget);
	};
	const handleClose5 = () => {
		setAnchorEl5(null);
	};

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const [serverURL, setServerURL] = React.useState('');

	React.useEffect(() => {
		if (window.location.host === 'localhost:3000') {
			setServerURL('http://localhost:5000/');
		} else {
			setServerURL('/');
		}
	}, []);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	// React.useEffect(() => {
	// 	console.log(props);
	// }, []);

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{user ? (
				<>
					<MenuItem>
						<Button
							color="secondary"
							onClick={() => history.push('/ps2/sem1/form')}
							fullWidth
						>
							PS2'21 Sem-1 Form
						</Button>
					</MenuItem>
					<MenuItem>
						<Button
							color="secondary"
							onClick={() =>
								history.push('/ps2/sem1/formResponses')
							}
							fullWidth
						>
							PS2'21 Sem-1 Responses
						</Button>
					</MenuItem>
					<MenuItem>
						<Button
							color="secondary"
							onClick={() => history.push('/ps2/sem2/form')}
							fullWidth
						>
							PS2'22 Sem-2 Form
						</Button>
					</MenuItem>
					<MenuItem>
						<Button
							color="secondary"
							onClick={() =>
								history.push('/ps2/sem2/formResponses')
							}
							fullWidth
						>
							PS2'22 Sem-2 Responses
						</Button>
					</MenuItem>
					<MenuItem>
						<Button
							color="secondary"
							onClick={() => history.push('/projectBank')}
							fullWidth
						>
							NEW | Project Bank(PS-2) Sem-1 '22
						</Button>
					</MenuItem>
					<MenuItem>
						<Button
							color="primary"
							onClick={() => history.push('/ps1/responses')}
							fullWidth
						>
							PS-1 Responses
						</Button>
					</MenuItem>
					<MenuItem>
						<Button
							color="primary"
							onClick={() => history.push('/ps1/chronicles')}
							fullWidth
						>
							PS-1 Chronicles
						</Button>
					</MenuItem>
					<MenuItem>
						<Button
							color="primary"
							onClick={() => history.push('/ps2/sem1/responses')}
							fullWidth
						>
							PS-2 Sem-1 Responses
						</Button>
					</MenuItem>
					<MenuItem>
						<Button
							color="primary"
							onClick={() => history.push('/ps2/sem1/chronicles')}
							fullWidth
						>
							PS-2 Sem-1 Chronicles
						</Button>
					</MenuItem>
					<MenuItem>
						<Button
							color="primary"
							onClick={() => history.push('/ps2/sem2/responses')}
							fullWidth
						>
							PS-2 Sem-2 Responses
						</Button>
					</MenuItem>
					<MenuItem>
						<Button
							color="primary"
							onClick={() => history.push('/ps2/sem2/chronicles')}
							fullWidth
						>
							PS-2 Sem-2 Chronicles
						</Button>
					</MenuItem>
					<MenuItem>
						<Link
							href={serverURL + 'api/logout'}
							underline="none"
							sx={{ width: '100%' }}
						>
							<Button color="inherit" fullWidth>
								Logout
							</Button>
						</Link>
					</MenuItem>
				</>
			) : (
				<>
					<MenuItem>
						<Button color="inherit">
							<Link
								href={serverURL + 'api/login'}
								underline="none"
							>
								Login
							</Link>
						</Button>
					</MenuItem>
				</>
			)}
		</Menu>
	);

	return (
		<Root className={classes.grow}>
			<AppBar color="inherit" position="static">
				<Toolbar>
					<Typography
						className={classes.title}
						variant="h6"
						noWrap
						style={{ color: '#ffd39c' }}
					>
						<Link color="inherit" underline="none" href="/">
							{/* <img
								src={logo}
								alt="logo"
								style={{
									width: '25px',
									marginRight: '10px',
									marginBottom: '-5px',
								}}
							/> */}
							P.S. It's Easy
						</Link>
					</Typography>

					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{user ? (
							<>
								<div>
									<Button
										id="demo-positioned-button"
										aria-controls="demo-positioned-menu"
										aria-haspopup="true"
										aria-expanded={
											open4 ? 'true' : undefined
										}
										onClick={handleClick4}
										color="secondary"
										endIcon={<KeyboardArrowDownIcon />}
									>
										PS-2 Sem-1 '21
									</Button>
									<Menu
										id="demo-positioned-menu"
										aria-labelledby="demo-positioned-button"
										anchorEl={anchorEl4}
										open={open4}
										onClose={handleClose4}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}
									>
										<MenuItem onClick={handleClose4}>
											<Button
												onClick={() =>
													history.push(
														'/ps2/sem1/form'
													)
												}
											>
												PS-2 Sem-1 '21 Form
											</Button>
										</MenuItem>
										<MenuItem onClick={handleClose4}>
											<Button
												onClick={() =>
													history.push(
														'/ps2/sem1/formResponses'
													)
												}
											>
												PS-2 Sem-1 '21 Responses
											</Button>
										</MenuItem>
									</Menu>
								</div>
								<div>
									<Button
										id="demo-positioned-button"
										aria-controls="demo-positioned-menu"
										aria-haspopup="true"
										aria-expanded={
											open5 ? 'true' : undefined
										}
										onClick={handleClick5}
										color="secondary"
										endIcon={<KeyboardArrowDownIcon />}
									>
										PS-2 Sem-2 '22
									</Button>
									<Menu
										id="demo-positioned-menu"
										aria-labelledby="demo-positioned-button"
										anchorEl={anchorEl5}
										open={open5}
										onClose={handleClose5}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}
									>
										<MenuItem onClick={handleClose5}>
											<Button
												onClick={() =>
													history.push(
														'/ps2/sem2/form'
													)
												}
											>
												PS-2 Sem-2 '22 Form
											</Button>
										</MenuItem>
										<MenuItem onClick={handleClose5}>
											<Button
												onClick={() =>
													history.push(
														'/ps2/sem2/formResponses'
													)
												}
											>
												PS-2 Sem-2 '22 Responses
											</Button>
										</MenuItem>
									</Menu>
								</div>
								<Button
									color="secondary"
									onClick={() => history.push('/projectBank')}
								>
									New | Project Bank(PS-2) Sem-1 '22
								</Button>
								<div>
									<Button
										id="demo-positioned-button"
										aria-controls="demo-positioned-menu"
										aria-haspopup="true"
										aria-expanded={
											open1 ? 'true' : undefined
										}
										onClick={handleClick1}
										color="primary"
										endIcon={<KeyboardArrowDownIcon />}
									>
										PS-1
									</Button>
									<Menu
										id="demo-positioned-menu"
										aria-labelledby="demo-positioned-button"
										anchorEl={anchorEl1}
										open={open1}
										onClose={handleClose1}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}
									>
										<MenuItem onClick={handleClose1}>
											<Button
												onClick={() =>
													history.push(
														'/ps1/responses'
													)
												}
											>
												PS-1 Responses
											</Button>
										</MenuItem>
										<MenuItem onClick={handleClose1}>
											<Button
												onClick={() =>
													history.push(
														'/ps1/chronicles'
													)
												}
											>
												PS-1 Chronicles
											</Button>
										</MenuItem>
									</Menu>
								</div>
								<div>
									<Button
										id="demo-positioned-button"
										aria-controls="demo-positioned-menu"
										aria-haspopup="true"
										aria-expanded={
											open2 ? 'true' : undefined
										}
										onClick={handleClick2}
										color="primary"
										endIcon={<KeyboardArrowDownIcon />}
									>
										PS-2 Sem-1
									</Button>
									<Menu
										id="demo-positioned-menu"
										aria-labelledby="demo-positioned-button"
										anchorEl={anchorEl2}
										open={open2}
										onClose={handleClose2}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}
									>
										<MenuItem onClick={handleClose2}>
											<Button
												onClick={() =>
													history.push(
														'/ps2/sem1/responses'
													)
												}
											>
												PS-2 Sem-1 Responses
											</Button>
										</MenuItem>
										<MenuItem onClick={handleClose2}>
											<Button
												onClick={() =>
													history.push(
														'/ps2/sem1/chronicles'
													)
												}
											>
												PS-2 Sem-1 Chronicles
											</Button>
										</MenuItem>
									</Menu>
								</div>
								<div>
									<Button
										id="demo-positioned-button"
										aria-controls="demo-positioned-menu"
										aria-haspopup="true"
										aria-expanded={
											open3 ? 'true' : undefined
										}
										onClick={handleClick3}
										color="primary"
										endIcon={<KeyboardArrowDownIcon />}
									>
										PS-2 Sem-2
									</Button>
									<Menu
										id="demo-positioned-menu"
										aria-labelledby="demo-positioned-button"
										anchorEl={anchorEl3}
										open={open3}
										onClose={handleClose3}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}
									>
										<MenuItem onClick={handleClose3}>
											<Button
												onClick={() =>
													history.push(
														'/ps2/sem2/responses'
													)
												}
											>
												PS-2 Sem-2 Responses
											</Button>
										</MenuItem>
										<MenuItem onClick={handleClose3}>
											<Button
												onClick={() =>
													history.push(
														'/ps2/sem2/chronicles'
													)
												}
											>
												PS-2 Sem-2 Chronicles
											</Button>
										</MenuItem>
									</Menu>
								</div>

								<Link
									href={serverURL + 'api/logout'}
									underline="none"
								>
									<Button color="inherit">Logout</Button>
								</Link>
							</>
						) : (
							<>
								<Link
									href={serverURL + 'api/login'}
									underline="none"
								>
									<Button color="inherit">Log in</Button>
								</Link>
							</>
						)}
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
							size="large"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Root>
	);
}

export default Navbar;
