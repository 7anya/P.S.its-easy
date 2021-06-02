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
		marginTop: theme.spacing(3),
		marginLeft: '0px',
		marginRight: '0px',
		width: '100%',
	},
	range: {
		marginTop: theme.spacing(3),
	},
}));

function FilterComponentProjectBank({
	setMainSearch,
	setMainChoice,
	setMainSlider,
	mainSearch,
	setMainBranch,
}) {
	const classes = useStyles();
	const [search, setSearch] = useState('');
	const [slider, setSlider] = useState([0, 100000]);
	const [choice, setChoice] = useState('All');
	const [branch, setBranch] = useState('All');

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
		setMainBranch(branch);
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
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-label">
					Select Branch
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={branch}
					label="Select Year"
					onChange={(e) => setBranch(e.target.value)}
				>
					<MenuItem value={'All'}>All</MenuItem>

					<MenuItem value={'Any'}>Any</MenuItem>
					<MenuItem value={'A1'}>A1</MenuItem>
					<MenuItem value={'A2'}>A2</MenuItem>
					<MenuItem value={'A3'}>A3</MenuItem>
					<MenuItem value={'A4'}>A4</MenuItem>
					<MenuItem value={'A5'}>A5</MenuItem>
					<MenuItem value={'A7'}>A7</MenuItem>
					<MenuItem value={'A8'}>A8</MenuItem>
					<MenuItem value={'AA'}>AA</MenuItem>
					<MenuItem value={'AB'}>AB</MenuItem>
					<MenuItem value={'B1'}>B1</MenuItem>
					<MenuItem value={'B2'}>B2</MenuItem>
					<MenuItem value={'B3'}>B3</MenuItem>
					<MenuItem value={'B4'}>B4</MenuItem>
					<MenuItem value={'B5'}>B5</MenuItem>
					<MenuItem value={'C6'}>C6</MenuItem>
					<MenuItem value={'C7'}>C7</MenuItem>
					<MenuItem value={'D2'}>D2</MenuItem>
					<MenuItem value={'H103'}>H103</MenuItem>
					<MenuItem value={'H106'}>H106</MenuItem>
					<MenuItem value={'H112'}>H112</MenuItem>
					<MenuItem value={'H123'}>H123</MenuItem>
					<MenuItem value={'H124'}>H124</MenuItem>
					<MenuItem value={'H129'}>H129</MenuItem>
					<MenuItem value={'H140'}>H140</MenuItem>
					<MenuItem value={'H141'}>H141</MenuItem>
					<MenuItem value={'H149'}>H149</MenuItem>
					<MenuItem value={'H313'}>H313</MenuItem>
					<MenuItem value={'-'}>Not Specified</MenuItem>
				</Select>
			</FormControl>
			<Typography
				id="range-slider"
				gutterBottom
				className={classes.range}
			>
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
