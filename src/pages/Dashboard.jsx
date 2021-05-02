import React, { useState, useEffect } from 'react';
import {
	VictoryChart,
	VictoryBoxPlot,
	VictoryTheme,
	VictoryAxis,
	VictoryZoomContainer,
} from 'victory';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	Slider,
	TextField,
	Typography,
} from '@material-ui/core';
import FadeIn from 'react-fade-in';
import SearchBar from 'material-ui-search-bar';
import SearchComponent from '../components/SearchComponent/SearchComponent';
import useDimensions from 'react-use-dimensions';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '100vh',
	},
	paper1: {
		padding: theme.spacing(5),
		textAlign: 'center',
		color: theme.palette.text.primary,
		height: '200px',
		margin: '50px',
		marginTop: '70px',
	},
	paper2: {
		padding: theme.spacing(5),
		textAlign: 'center',
		color: theme.palette.text.primary,
		margin: '50px',
		marginTop: '50px',
	},
	formControl: {
		margin: theme.spacing(5),
		minWidth: 220,
	},
	chartContainer: {
		height: '70vh',
		backgroundColor: theme.palette.grey[200],
	},
	svg: {
		backgroundColor: 'darkgreen',
	},
}));

let data = require('../dataset/data.json');

const Dashboard = () => {
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
	const [slider, setSlider] = useState([5, 10]);
	const [measureRef, { width }] = useDimensions();

	useEffect(() => {
		console.log('loading start');

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
					points.push({ x: key, y: y });
					x.push(key);
					let min = 0,
						max = 0,
						avg = 0;
					min = Math.min(...y);
					max = Math.max(...y);
					avg = y.reduce((a, b) => a + b, 0) / y.length;
					newInfo = {
						...newInfo,
						[key]: { min, max, avg },
					};
				}
			}
		}
		if (points.length >= 15) {
			setIndex({ start: 0, end: 15 });
			setIsNextDisabled(false);
			setIsPrevDisabled(true);
		} else {
			setIndex({ start: 0, end: points.length });
			setIsPrevDisabled(true);
			setIsNextDisabled(true);
		}
		// console.log(points.slice(1, 10));
		setDataPoints(points);
		setXvalues(x);
		setAllStationInfo(newInfo);
		console.log('loading end');
	}, [choice, search]);

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
			<Grid container direction="row" spacing={2}>
				<Grid
					item
					xs={8}
					ref={measureRef}
					className={classes.chartContainer}
				>
					<VictoryChart
						padding={{
							bottom: 100,
							left: 50,
							right: 50,
						}}
						domainPadding={20}
						theme={VictoryTheme.material}
						width={width}
						domain={{ x: [0, 18], y: [5, 10] }}
						containerComponent={
							<VictoryZoomContainer
								zoomDomain={{ x: [0, 18], y: [5, 10] }}
							/>
						}
					>
						<VictoryAxis
							style={{
								tickLabels: {
									fontSize: 12,
									padding: 1,
									angle: 25,
									verticalAnchor: 'middle',
									textAnchor: 'start',
									width: 0,
									height: 0,
								},
							}}
							tickValues={xvalues.slice(index.start, index.end)}
							theme={VictoryTheme.material}
							animate={{
								onExit: {
									duration: 500,
								},
								onEnter: {
									duration: 500,
								},
							}}
						/>
						<VictoryAxis
							dependentAxis
							style={{
								tickLabels: { fontSize: 12, padding: 5 },
							}}
							theme={VictoryTheme.material}
						/>
						<VictoryBoxPlot
							animate={{
								duration: 2000,
								onLoad: { duration: 1000 },
							}}
							boxWidth={10}
							whiskerWidth={6}
							data={dataPoints.slice(index.start, index.end)}
							style={{
								min: { strokeWidth: 2.5 },
								max: { strokeWidth: 2.5 },
							}}
							events={[
								{
									target: 'max',
									eventHandlers: {
										onMouseEnter: () => {
											return [
												{
													target: 'q1',
													mutation: (props) => {
														setStationDetails({
															name: props.datum.x,
															min: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.min,
															max: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.max,
															median: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.avg,
														});

														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'tomato',
																}
															),
														};
													},
												},
												{
													target: 'q3',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'tomato',
																}
															),
														};
													},
												},
												{
													target: 'min',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
												{
													target: 'max',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
												{
													target: 'median',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
											];
										},
										onMouseLeave: () => {
											return [
												{
													target: 'q1',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'#455A64',
																}
															),
														};
													},
												},
												{
													target: 'q3',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'#455A64',
																}
															),
														};
													},
												},
												{
													target: 'min',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
												{
													target: 'max',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
												{
													target: 'median',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
											];
										},
									},
								},
								{
									target: 'min',
									eventHandlers: {
										onMouseEnter: () => {
											return [
												{
													target: 'q1',
													mutation: (props) => {
														setStationDetails({
															name: props.datum.x,
															min: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.min,
															max: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.max,
															median: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.avg,
														});

														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'tomato',
																}
															),
														};
													},
												},
												{
													target: 'q3',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'tomato',
																}
															),
														};
													},
												},
												{
													target: 'min',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
												{
													target: 'max',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
												{
													target: 'median',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
											];
										},
										onMouseLeave: () => {
											return [
												{
													target: 'q1',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'#455A64',
																}
															),
														};
													},
												},
												{
													target: 'q3',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'#455A64',
																}
															),
														};
													},
												},
												{
													target: 'min',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
												{
													target: 'max',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
												{
													target: 'median',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
											];
										},
									},
								},
								{
									target: 'q1',
									eventHandlers: {
										onMouseEnter: () => {
											return [
												{
													target: 'q1',
													mutation: (props) => {
														setStationDetails({
															name: props.datum.x,
															min: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.min,
															max: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.max,
															median: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.avg,
														});

														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'tomato',
																}
															),
														};
													},
												},
												{
													target: 'q3',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'tomato',
																}
															),
														};
													},
												},
												{
													target: 'min',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
												{
													target: 'max',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
												{
													target: 'median',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
											];
										},
										onMouseLeave: () => {
											return [
												{
													target: 'q1',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'#455A64',
																}
															),
														};
													},
												},
												{
													target: 'q3',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'#455A64',
																}
															),
														};
													},
												},
												{
													target: 'min',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
												{
													target: 'max',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
												{
													target: 'median',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
											];
										},
									},
								},
								{
									target: 'q3',
									eventHandlers: {
										onMouseEnter: () => {
											return [
												{
													target: 'q1',
													mutation: (props) => {
														setStationDetails({
															name: props.datum.x,
															min: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.min,
															max: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.max,
															median: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.avg,
														});

														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'tomato',
																}
															),
														};
													},
												},
												{
													target: 'q3',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'tomato',
																}
															),
														};
													},
												},
												{
													target: 'min',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
												{
													target: 'max',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
												{
													target: 'median',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
											];
										},
										onMouseLeave: () => {
											return [
												{
													target: 'q1',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'#455A64',
																}
															),
														};
													},
												},
												{
													target: 'q3',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'#455A64',
																}
															),
														};
													},
												},
												{
													target: 'min',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
												{
													target: 'max',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
												{
													target: 'median',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
											];
										},
									},
								},
								{
									target: 'median',
									eventHandlers: {
										onMouseEnter: () => {
											return [
												{
													target: 'q1',
													mutation: (props) => {
														setStationDetails({
															name: props.datum.x,
															min: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.min,
															max: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.max,
															median: getKeyValue(
																allStationInfo
															)(props.datum.x)
																.avg,
														});

														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'tomato',
																}
															),
														};
													},
												},
												{
													target: 'q3',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'tomato',
																}
															),
														};
													},
												},
												{
													target: 'min',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
												{
													target: 'max',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
												{
													target: 'median',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'tomato',
															},
														};
													},
												},
											];
										},
										onMouseLeave: () => {
											return [
												{
													target: 'q1',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'#455A64',
																}
															),
														};
													},
												},
												{
													target: 'q3',
													mutation: (props) => {
														return {
															style: Object.assign(
																props.style,
																{
																	fill:
																		'#455A64',
																}
															),
														};
													},
												},
												{
													target: 'min',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
												{
													target: 'max',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
												{
													target: 'median',
													mutation: (props) => {
														return {
															style: {
																...props.style,
																stroke:
																	'#455A64',
															},
														};
													},
												},
											];
										},
									},
								},
							]}
						/>
					</VictoryChart>
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
								>
									Next
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<Paper className={classes.paper1}>
						<FadeIn>
							{stationDetails.name ? (
								<div key={stationDetails.name}>
									<FadeIn>
										<Typography
											variant="body1"
											component="p"
										>
											Name: {stationDetails.name}
										</Typography>
										<Typography
											variant="body1"
											component="p"
										>
											Min: {stationDetails.min}
										</Typography>
										<Typography
											variant="body1"
											component="p"
										>
											Max: {stationDetails.max}
										</Typography>
										<Typography
											variant="body1"
											component="p"
										>
											Median: {stationDetails.median}
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
					<Paper className={classes.paper2}>
						<SearchComponent
							setMainChoice={setMainChoice}
							setMainSearch={setMainSearch}
						/>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;
