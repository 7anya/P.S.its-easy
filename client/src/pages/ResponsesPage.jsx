import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import FadeIn from 'react-fade-in';
import SearchComponent from '../components/FilterComponent/FilterComponent';
import useDimensions from 'react-use-dimensions';
import { ChartComponent } from '../components/ChartComponents/ChartComponent';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '90vh',
	},
	paper1: {
		padding: theme.spacing(4),
		textAlign: 'center',
		color: theme.palette.text.primary,
		height: '180px',
		margin: '50px',
		marginTop: '10px',
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.primary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
	},
	paper2: {
		padding: theme.spacing(4),
		textAlign: 'center',
		color: theme.palette.text.primary,
		margin: '50px',
		marginTop: '0px',
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.primary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
	},
	formControl: {
		margin: theme.spacing(5),
		minWidth: 220,
	},
	chartContainer: {
		height: '72vh',
		marginTop: '10px',
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.secondary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
	},
	svg: {
		backgroundColor: 'darkgreen',
	},
}));

let data = require('../dataset/data.json');

const ResponsesPage = () => {
	const classes = useStyles();

	const [dataPoints, setDataPoints] = useState([]);
	const [xvalues, setXvalues] = useState([]);
	const [index, setIndex] = useState({ start: 0, end: 0 });
	const [isNextDisabled, setIsNextDisabled] = useState(true);
	const [isPrevDisabled, setIsPrevDisabled] = useState(true);
	const [stationDetails, setStationDetails] = useState({});
	const [allStationInfo, setAllStationInfo] = useState({});
	const [choice, setMainChoice] = useState('Overall');
	const [search, setMainSearch] = useState('');
	const [slider, setMainSlider] = useState([5, 10]);
	const [measureRef, { width }] = useDimensions();

	useEffect(() => {
		//console.log(data);
		let points = [];
		let x = [];
		let newInfo = {};
		for (const key in data) {
			if (key.toLowerCase().includes(search.toLowerCase())) {
				//console.log(key);
				let y = [];
				if (
					(choice === 'Overall' || choice === '2020') &&
					data[key]['2020']
				)
					y.push(...data[key]['2020']['CG']);
				if (
					(choice === 'Overall' || choice === '2019') &&
					data[key]['2019']
				)
					y.push(...data[key]['2019']['CG']);
				if (
					(choice === 'Overall' || choice === '2018') &&
					data[key]['2018']
				)
					y.push(...data[key]['2018']['CG']);
				if (
					(choice === 'Overall' || choice === '2017') &&
					data[key]['2017']
				)
					y.push(...data[key]['2017']['CG']);

				if (y.length > 0) {
					let min = 0,
						max = 0,
						avg = 0;
					min = Math.min(...y);
					min = Math.round(min * 100) / 100;
					max = Math.max(...y);
					max = Math.round(max * 100) / 100;
					avg = y.reduce((a, b) => a + b, 0) / y.length;
					avg = Math.round(avg * 100) / 100;
					newInfo = {
						...newInfo,
						[key]: { min, max, avg },
					};
					//console.log(slider[0], slider[1]);
					if (max >= slider[0] && min <= slider[1]) {
						points.push({ x: key, y: y });
						x.push(key);
					}
				}
			}
		}
		if (points.length > 15) {
			let i = points.length;
			while (i % 15 !== 0) {
				points.push({ x: '-', y: [0] });
				i++;
			}
			setIndex({ start: 0, end: 15 });
			setIsNextDisabled(false);
			setIsPrevDisabled(true);
		} else {
			for (let i = points.length; i < 15; i++) {
				points.push({ x: '-', y: [0] });
			}
			setIndex({ start: 0, end: 15 });
			setIsPrevDisabled(true);
			setIsNextDisabled(true);
		}
		// console.log(points.slice(1, 10));
		setDataPoints(points);
		setXvalues(x);
		setAllStationInfo(newInfo);
	}, [choice, search, slider]);

	const handleNext = () => {
		// console.log(allStationInfo);

		if (index.end + 15 < dataPoints.length) {
			setIndex({ start: index.start + 15, end: index.end + 15 });
			setIsPrevDisabled(false);
		} else if (index.start + 15 <= dataPoints.length) {
			setIndex({ start: index.start + 15, end: dataPoints.length });
			setIsPrevDisabled(false);
			setIsNextDisabled(true);
		}
	};

	const handlePrevious = () => {
		if (index.start - 15 > 0) {
			setIndex({ start: index.start - 15, end: index.end - 15 });
			setIsNextDisabled(false);
		} else if (index.end - 15 >= 0) {
			setIndex({ start: 0, end: index.end - 15 });
			setIsPrevDisabled(true);
			setIsNextDisabled(false);
		}
	};
	const getKeyValue = (obj) => (key) => obj[key];

	return (
		<div className={classes.root}>
			<Grid container direction="row" spacing={0}>
				<Grid
					item
					xs={8}
					ref={measureRef}
					className={classes.chartContainer}
				>
					<ChartComponent
						xvalues={xvalues}
						index={index}
						dataPoints={dataPoints}
						width={width}
						setStationDetails={setStationDetails}
						allStationInfo={allStationInfo}
						getKeyValue={getKeyValue}
					/>
					<Grid container style={{ marginTop: '50px' }}>
						<Grid item xs={6}>
							<Grid
								container
								alignItems="center"
								direction="row"
								justify="center"
							>
								<Button
									disabled={isPrevDisabled}
									onClick={handlePrevious}
									variant="outlined"
									color="secondary"
								>
									Previous
								</Button>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<Grid
								container
								alignItems="center"
								direction="row"
								justify="center"
							>
								<Button
									disabled={isNextDisabled}
									onClick={handleNext}
									variant="outlined"
									color="secondary"
								>
									Next
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<Paper elevation={3} className={classes.paper1}>
						<FadeIn>
							{stationDetails.name ? (
								<div key={stationDetails.name}>
									<FadeIn>
										<Typography
											variant="body1"
											component="p"
										>
											<Typography
												component="span"
												variant="body1"
												style={{ color: '#ffd39c' }}
											>
												Name:{' '}
											</Typography>
											{stationDetails.name}
										</Typography>
										<Typography
											variant="body1"
											component="p"
										>
											<Typography
												component="span"
												variant="body1"
												style={{ color: '#ffd39c' }}
											>
												Min:{' '}
											</Typography>
											{stationDetails.min}
										</Typography>
										<Typography
											variant="body1"
											component="p"
										>
											<Typography
												component="span"
												variant="body1"
												style={{ color: '#ffd39c' }}
											>
												Max:{' '}
											</Typography>
											{stationDetails.max}
										</Typography>
										<Typography
											variant="body1"
											component="p"
										>
											<Typography
												component="span"
												variant="body1"
												style={{ color: '#ffd39c' }}
											>
												Mean:{' '}
											</Typography>
											{stationDetails.median}
										</Typography>
									</FadeIn>
								</div>
							) : (
								<Typography
									variant="h6"
									component="h1"
									key={'hi'}
								>
									Hower over a station to print more details!
								</Typography>
							)}
						</FadeIn>
					</Paper>
					<Paper elevation={10} className={classes.paper2}>
						<SearchComponent
							setMainChoice={setMainChoice}
							setMainSearch={setMainSearch}
							setMainSlider={setMainSlider}
						/>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default ResponsesPage;
