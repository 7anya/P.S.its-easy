import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/ListAlt';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	formControl: {
		marginTop: theme.spacing(1),
		minWidth: 120,
		width: '100%',
	},
}));

export default function AllotmentForm() {
	const classes = useStyles();
	const [campus, setCampus] = React.useState('Hyderabad');

	const handleChange = (event) => {
		setCampus(event.target.value);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Allotment Form for PS 2, Sem 1
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="name"
						label="Name"
						name="name"
						autoComplete="name"
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="id"
						label="ID Number (eg. 2018AAPS0460H)"
						name="id"
					/>
					<FormControl
						variant="outlined"
						className={classes.formControl}
					>
						<InputLabel id="demo-simple-select-outlined-label">
							Campus
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={campus}
							onChange={handleChange}
							label="Campus"
						>
							<MenuItem value={'Hyderabad'}>Hyderabad</MenuItem>
							<MenuItem value={'Goa'}>Goa</MenuItem>
							<MenuItem value={'Pilani'}>Pilani</MenuItem>
						</Select>
					</FormControl>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="cg"
						label="CGPA"
						name="cg"
						type="number"
						inputProps={{ min: 4, max: 10, step: 0.1 }}
					/>
					<FormControl
						variant="outlined"
						className={classes.formControl}
					>
						<InputLabel id="demo-simple-select-outlined-label">
							Station Alloted
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={campus}
							onChange={handleChange}
							label="Campus"
						>
							<MenuItem value={'Hyderabad'}>Hyderabad</MenuItem>
							<MenuItem value={'Goa'}>Goa</MenuItem>
							<MenuItem value={'Pilani'}>Pilani</MenuItem>
						</Select>
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Submit
					</Button>
				</form>
			</div>
		</Container>
	);
}
