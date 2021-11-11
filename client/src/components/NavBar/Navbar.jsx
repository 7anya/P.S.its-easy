import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import LogOut from '@material-ui/icons/ExitToApp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));

function Navbar({ user }) {
	const classes = useStyles();
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
						<Link href="/ps2/form" underline="none">
							<Button color="secondary">PS2'21 Sem-1 Form</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Link href="/ps2/formResponses" underline="none">
							<Button color="secondary">
								PS2'21 Sem-1 Responses
							</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Link href="/projectBank" underline="none">
							<Button color="secondary">
								Project Bank(PS-2/Sem-1) '21
							</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Link href="/ps1/responses" underline="none">
							<Button color="inherit">PS-1 Responses</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Link href="/ps1/responses" underline="none">
							<Button color="inherit">PS-1 Chronicles</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Link href="/ps2/sem1/responses" underline="none">
							<Button color="inherit">
								PS-2 Sem-1 Responses
							</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Link href="/ps2/sem1/chronicles" underline="none">
							<Button color="inherit">
								PS-2 Sem-1 Chronicles
							</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Link href="/ps2/sem2/responses" underline="none">
							<Button color="inherit">
								PS-2 Sem-2 Responses
							</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Link href="/ps2/sem2/chronicles" underline="none">
							<Button color="inherit">
								PS-2 Sem-2 Chronicles
							</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Link href={serverURL + 'api/logout'} underline="none">
							<Button color="inherit">Logout</Button>
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
		<div className={classes.grow}>
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
											<Link
												href="/ps2/form"
												underline="none"
											>
												PS-2 Sem-1 '21 Form
											</Link>
										</MenuItem>
										<MenuItem onClick={handleClose4}>
											<Link
												href="/ps2/formResponses"
												underline="none"
											>
												PS-2 Sem-1 '21 Responses
											</Link>
										</MenuItem>
									</Menu>
								</div>
								<Link href="/projectBank" underline="none">
									<Button color="secondary">
										Project Bank(PS-2/Sem-1) '21
									</Button>
								</Link>
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
											<Link
												href="/ps1/responses"
												underline="none"
											>
												PS-1 Responses
											</Link>
										</MenuItem>
										<MenuItem onClick={handleClose1}>
											<Link
												href="/ps1/chronicles"
												underline="none"
											>
												PS-1 Chronicles
											</Link>
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
											<Link
												href="/ps2/sem1/responses"
												underline="none"
											>
												PS-2 Sem-1 Responses
											</Link>
										</MenuItem>
										<MenuItem onClick={handleClose2}>
											<Link
												href="/ps2/sem1/chronicles"
												underline="none"
											>
												PS-2 Sem-1 Chronicles
											</Link>
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
											<Link
												href="/ps2/sem2/responses"
												underline="none"
											>
												PS-2 Sem-2 Responses
											</Link>
										</MenuItem>
										<MenuItem onClick={handleClose3}>
											<Link
												href="/ps2/sem2/chronicles"
												underline="none"
											>
												PS-2 Sem-2 Chronicles
											</Link>
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
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}

export default Navbar;
