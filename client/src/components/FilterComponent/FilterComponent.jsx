import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Slider,
	Typography,
	Autocomplete,
	TextField,
} from '@mui/material';

const PREFIX = 'FilterComponent';

const classes = {
	formControl: `${PREFIX}-formControl`,
};

const Root = styled('div')(({ theme }) => ({
	[`& .${classes.formControl}`]: {
		margin: theme.spacing(5),
		marginLeft: '0px',
		marginRight: '0px',
		marginBottom: '0px',
		minWidth: 220,
	},
}));

function FilterComponent({
	setMainSearch,
	setMainChoice,
	setMainSlider,
	mainSearch,
	type,
	stationNames,
}) {
	const [search, setSearch] = useState('');
	const [slider, setSlider] = useState([5, 10]);
	const [choice, setChoice] = useState('Overall');

	console.log(search);

	useEffect(() => {
		setSearch(mainSearch);
	}, [mainSearch]);

	const handleSearch = (newValue = search) => {
		setSearch(newValue);
	};

	const handleSubmit = () => {
		setMainChoice(choice);
		setMainSearch(search);
		setMainSlider(slider);
	};

	useEffect(() => {
		const listener = (event) => {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				console.log('hi');
				document.getElementById('subBtn').click();
				event.preventDefault();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, []);

	const top100Films = ['1', '5', '2', '3'];

	return (
		<Root>
			<Autocomplete
				freeSolo
				options={stationNames.map((option) => option)}
				renderInput={(params) => (
					<TextField {...params} label="Search" />
				)}
				inputValue={search}
				onInputChange={(_event, newValue) => handleSearch(newValue)}
			/>

			{type !== 'response' && (
				<>
					{type === 'PS1' && (
						<FormControl
							variant="outlined"
							className={classes.formControl}
						>
							<InputLabel id="demo-simple-select-label">
								Select Year
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={choice}
								label="Select Year"
								onChange={(e) => setChoice(e.target.value)}
							>
								<MenuItem value={'Overall'}>Overall</MenuItem>
								<MenuItem value={'2021'}>2021</MenuItem>
							</Select>
						</FormControl>
					)}
					{type === 'PS2Sem1' && (
						<FormControl
							variant="outlined"
							className={classes.formControl}
						>
							<InputLabel id="demo-simple-select-label">
								Select Year
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={choice}
								label="Select Year"
								onChange={(e) => setChoice(e.target.value)}
							>
								<MenuItem value={'Overall'}>Overall</MenuItem>

								<MenuItem value={'2020'}>2020</MenuItem>
								<MenuItem value={'2019'}>2019</MenuItem>
								<MenuItem value={'2018'}>2018</MenuItem>
								<MenuItem value={'2017'}>2017</MenuItem>
							</Select>
						</FormControl>
					)}
					{type === 'PS2Sem2' && (
						<FormControl
							variant="outlined"
							className={classes.formControl}
						>
							<InputLabel id="demo-simple-select-label">
								Select Year
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={choice}
								label="Select Year"
								onChange={(e) => setChoice(e.target.value)}
							>
								<MenuItem value={'Overall'}>Overall</MenuItem>
								<MenuItem value={'2021'}>2021</MenuItem>
								<MenuItem value={'2020'}>2020</MenuItem>
								<MenuItem value={'2019'}>2019</MenuItem>
							</Select>
						</FormControl>
					)}
				</>
			)}

			<Typography id="range-slider" sx={{ mt: '10px' }}>
				CGPA range
			</Typography>
			<Slider
				value={slider}
				onChange={(event, newValue) => setSlider(newValue)}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
				getAriaValueText={(value) => `${value} CGPA`}
				min={5}
				max={10}
				step={0.1}
			/>
			<Button
				id="subBtn"
				onClick={handleSubmit}
				variant="outlined"
				color="primary"
			>
				Search
			</Button>
		</Root>
	);
}

export default FilterComponent;
