import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Motorcycle';
import LoginIcon from '@material-ui/icons/ExitToApp';
import RegisterIcon from '@material-ui/icons/ListAlt';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
// import logo from '../../resources/ps-file.png';
// import { CustomThemeContext } from '../../context/CustomThemeProvider';

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

function Navbar(props) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
			{/* <MenuItem>
				<IconButton
					aria-label="show 11 new notifications"
					color="inherit"
				>
					<Badge badgeContent={11} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem> */}
			{/* <MenuItem>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<LoginIcon />
				</IconButton>
				<p>Login</p>
			</MenuItem> */}
			<MenuItem>
				<Button color="inherit">
					<Link href="/ps2/responses" underline="none">
						PS-2 Responses
					</Link>
				</Button>
			</MenuItem>
			<MenuItem>
				<Button color="inherit">
					<Link href="/ps2/chronicles" underline="none">
						PS-2 Chronicles
					</Link>
				</Button>
			</MenuItem>
		</Menu>
	);
	// const { currentTheme, setTheme } = React.useContext(CustomThemeContext);

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
						{/* {props.auth.isAuthenticated ? (
							<>
								<IconButton
									color="inherit"
									onClick={() => {
										if (currentTheme === 'light')
											setTheme('dark');
										else setTheme('light');
									}}
								>
									{currentTheme === 'dark' ? (
										<Brightness7Icon />
									) : (
										<Brightness3Icon />
									)}
								</IconButton>
								<IconButton
									aria-label="show 17 new notifications"
									color="inherit"
									href="/events"
								>
									<CalIcon />
								</IconButton>
								<IconButton
									aria-label="show 17 new notifications"
									color="inherit"
									href="/orders"
								>
									<NotificationsIcon />
								</IconButton>

								<Button
									color="inherit"
									onClick={() => props.logoutUser()}
								>
									Logout
								</Button>
							</>
						) : (
							<>
								<IconButton
									color="inherit"
									onClick={() => {
										if (currentTheme === 'light')
											setTheme('dark');
										else setTheme('light');
									}}
								>
									{currentTheme === 'dark' ? (
										<Brightness7Icon />
									) : (
										<Brightness3Icon />
									)}
								</IconButton>
								<Button color="inherit">
									<Link
										color="inherit"
										underline="none"
										href="/login"
									>
										Login
									</Link>
								</Button>

								<Button color="inherit">
									<Link
										color="inherit"
										underline="none"
										href="/register"
									>
										Register
									</Link>
								</Button>
							</>
						)} */}
						<Button color="inherit">
							<Link href="/ps2/responses" underline="none">
								PS-2 Responses
							</Link>
						</Button>

						<Button color="inherit">
							<Link href="/ps2/chronicles" underline="none">
								PS-2 Chronicles
							</Link>
						</Button>
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
