import React, { useState } from 'react';
import SearchBar from 'material-ui-search-bar';
import {
	Button,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Slider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(5),
		minWidth: 220,
	},
}));

function SearchComponent({ setMainSearch, setMainChoice }) {
	const classes = useStyles();
	const [search, setSearch] = useState('');
	const [slider, setSlider] = useState([5, 10]);
	const [choice, setChoice] = useState('Overall');

	const handleSearch = (newValue = search) => {
		setSearch(newValue);
	};

	const handleSubmit = () => {
		setMainChoice(choice);
		setMainSearch(search);
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
			<Slider
				value={slider}
				onChange={(event, newValue) => setSlider(newValue)}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
				getAriaValueText={(value) => `${value}`}
				min={5}
				max={10}
				step={0.1}
			/>
			<Button onClick={handleSubmit}>Apply!</Button>
		</div>
	);
}

export default SearchComponent;
