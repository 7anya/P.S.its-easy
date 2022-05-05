import React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/ListAlt';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const PREFIX = 'AllotmentForm';

const classes = {
    paper: `${PREFIX}-paper`,
    avatar: `${PREFIX}-avatar`,
    form: `${PREFIX}-form`,
    submit: `${PREFIX}-submit`,
    formControl: `${PREFIX}-formControl`
};

const StyledContainer = styled(Container)((
    {
        theme
    }
) => ({
    [`& .${classes.paper}`]: {
		marginTop: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

    [`& .${classes.avatar}`]: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},

    [`& .${classes.form}`]: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},

    [`& .${classes.submit}`]: {
		margin: theme.spacing(3, 0, 2),
	},

    [`& .${classes.formControl}`]: {
		marginTop: theme.spacing(1),
		minWidth: 120,
		width: '100%',
	}
}));

export default function AllotmentForm(props) {
	let history = useHistory();
	// console.log(props);
	const { user } = props;

	const [form, setForm] = React.useState({
		email: '',
		name: '',
		id: '',
		campus: '',
		cgpa: '',
		station: '',
	});
	const [error, setError] = React.useState('');
	const [stationNames, setStationNames] = React.useState([]);

	const handleChange = (event) => {
		if (event.target.id)
			setForm({ ...form, [event.target.id]: event.target.value });
		else setForm({ ...form, [event.target.name]: event.target.value });
	};

	React.useEffect(() => {
		if (user) setForm({ ...form, email: user.email, name: user.name });
	}, [user]);

	React.useEffect(() => {
		axios.get('/api/sem1/formStationNames').then((resp) => {
			setStationNames(resp.data);
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		for (const property in form) {
			if (form[property] === '') {
				setError('Please fill all fields!');
				return;
			}
		}
		if (form.cgpa < 4 || form.cgpa > 10) {
			setError('Please set the right CGPA!');
			return;
		}
		setError('');
		axios
			.post('/api/sem1/formSubmit', form)
			.then((resp) => history.push('/ps2/sem1/formResponses'));
	};

	return (
        <StyledContainer component="main" maxWidth="xs">
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
						value={form.email}
						disabled
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
						value={form.name}
						disabled
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="id"
						label="ID Number (eg. 2018AAPS0460H)"
						name="id"
						value={form.id}
						onChange={handleChange}
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
							id="campus"
							name="campus"
							value={form.campus}
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
						id="cgpa"
						label="CGPA"
						name="cg"
						type="number"
						inputProps={{ min: 4, max: 10, step: 0.1 }}
						value={form.cgpa}
						onChange={handleChange}
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
							id="station"
							value={form.station}
							onChange={handleChange}
							label="Campus"
							name="station"
						>
							{stationNames.map((station) => (
								<MenuItem name="station" value={station.name}>
									{station.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					{error && (
						<Alert
							variant="outlined"
							severity="error"
							style={{ marginTop: '20px' }}
						>
							{error}
						</Alert>
					)}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</form>
			</div>
		</StyledContainer>
    );
}
