import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SearchComponent from '../components/FilterComponent/FilterComponent';
import useDimensions from 'react-use-dimensions';
import { ChartComponent } from '../components/ChartComponents/ChartComponent';
import { useLocation } from 'react-router';
import fuzz from 'fuzzball';
import ResponsesButtonGroup from '../components/ResponsesButtonGroup/ResponsesButtonGroup';
import ResponseDisplayPaper from '../components/ResponseDisplayPaper/ResponseDisplayPaper';
import ResponseMobileAccord from '../components/ResponseMobileAccord/ResponseMobileAccord';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '90vh',
	},
	paper1: {
		padding: theme.spacing(3),
		textAlign: 'center',
		color: theme.palette.text.primary,
		height: '200px',
		margin: '40px',
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
		margin: '40px',
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
}));

let data = require('../dataset/ps2_sem1_responses.json');

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const ResponsesPage = () => {
	const classes = useStyles();
	const query = useQuery();

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
		const searchParam = query.get('search');
		if (searchParam) {
			setMainSearch(searchParam);
			query.delete('search');
		}
	}, []);

	useEffect(() => {
		let points = [];
		let x = [];
		let newInfo = {};
		if (search === '') {
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
		} else {
			for (const key in data) {
				if (
					fuzz.partial_ratio(
						key.toLowerCase(),
						search.toLowerCase()
					) > 90
				) {
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
			{window.innerWidth <= '800' ? (
				<Grid container direction="row" spacing={0}>
					<Grid
						item
						xs={12}
						ref={measureRef}
						className={classes.chartContainer}
						style={{
							marginLeft: '30px',
							marginRight: '30px',
							marginTop: '20px',
						}}
					>
						<ResponseMobileAccord
							xvalues={xvalues}
							index={index}
							allStationInfo={allStationInfo}
						/>
					</Grid>
					<Grid item xs={12}>
						<ResponsesButtonGroup
							isPrevDisabled={isPrevDisabled}
							handlePrevious={handlePrevious}
							index={index}
							dataPoints={dataPoints}
							isNextDisabled={isNextDisabled}
							handleNext={handleNext}
						/>
					</Grid>
					<Grid item xs={12}>
						<Paper elevation={10} className={classes.paper2}>
							<SearchComponent
								mainSearch={search}
								setMainChoice={setMainChoice}
								setMainSearch={setMainSearch}
								setMainSlider={setMainSlider}
							/>
						</Paper>
					</Grid>
				</Grid>
			) : (
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
						<ResponsesButtonGroup
							isPrevDisabled={isPrevDisabled}
							handlePrevious={handlePrevious}
							index={index}
							dataPoints={dataPoints}
							isNextDisabled={isNextDisabled}
							handleNext={handleNext}
						/>
					</Grid>

					<Grid item xs={4}>
						<ResponseDisplayPaper stationDetails={stationDetails} />
						<Paper elevation={10} className={classes.paper2}>
							<SearchComponent
								mainSearch={search}
								setMainChoice={setMainChoice}
								setMainSearch={setMainSearch}
								setMainSlider={setMainSlider}
							/>
						</Paper>
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default ResponsesPage;
