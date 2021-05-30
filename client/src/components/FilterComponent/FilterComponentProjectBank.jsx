import React, { useState, useEffect } from 'react';
import SearchBar from 'material-ui-search-bar';
import {
	Button,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Slider,
	Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(5),
		marginLeft: '0px',
		marginRight: '0px',
		width: '100%',
	},
}));

function FilterComponentProjectBank({
	setMainSearch,
	setMainChoice,
	setMainSlider,
	mainSearch,
}) {
	const classes = useStyles();
	const [search, setSearch] = useState('');
	const [slider, setSlider] = useState([0, 100000]);
	const [choice, setChoice] = useState('All');

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

	return (
		<div>
			<SearchBar
				value={search}
				onChange={(newValue) => handleSearch(newValue)}
				onRequestSearch={handleSearch}
				onCancelSearch={() => handleSearch('')}
			/>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-label">
					Select Domain
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={choice}
					label="Select Year"
					onChange={(e) => setChoice(e.target.value)}
				>
					<MenuItem value={'All'}>All</MenuItem>

					<MenuItem value={'IT'}>IT</MenuItem>
					<MenuItem value={'Electronics'}>Electronics</MenuItem>
					<MenuItem value={'Finance and Mgmt'}>
						Finance and Mgmt
					</MenuItem>
					<MenuItem value={'Mechanical'}>Mechanical</MenuItem>
					<MenuItem value={'Govt Research Lab'}>
						Govt Research Lab
					</MenuItem>
					<MenuItem value={'Health Care'}>Health Care</MenuItem>
					<MenuItem value={'Chemical'}>Chemical</MenuItem>
					<MenuItem value={'Infrastructure'}>Infrastructure</MenuItem>
					<MenuItem value={'Others'}>Others</MenuItem>
					<MenuItem value={'nan'}>Not Specified</MenuItem>
				</Select>
			</FormControl>
			<Typography id="range-slider" gutterBottom>
				Stipend Range
			</Typography>
			<Slider
				value={slider}
				onChange={(event, newValue) => setSlider(newValue)}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
				getAriaValueText={(value) => `₹ ${value / 1000}k`}
				valueLabelFormat={(value) => `₹ ${value / 1000}k`}
				min={0}
				max={100000}
				step={1000}
			/>
			<Button onClick={handleSubmit} variant="outlined" color="primary">
				Search
			</Button>
		</div>
	);
}

export default FilterComponentProjectBank;
