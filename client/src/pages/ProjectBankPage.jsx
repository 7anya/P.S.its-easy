import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Badge,
	Button,
	Grid,
	Link,
	Paper,
	Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WriteUp from '../components/WriteUp/WriteUp';
import FilterComponentProjectBank from '../components/FilterComponent/FilterComponentProjectBank';
import ResponsesButtonGroup from '../components/ResponsesButtonGroup/ResponsesButtonGroup';
import ButtonSelect from '../components/StationSelect/ButtonSelect';
import { CSVLink, CSVDownload } from 'react-csv';
import axios from 'axios';

const PREFIX = 'ProjectBankPage';

const classes = {
	root: `${PREFIX}-root`,
	mainComp: `${PREFIX}-mainComp`,
	down: `${PREFIX}-down`,
	paper1: `${PREFIX}-paper1`,
	paper2: `${PREFIX}-paper2`,
	formControl: `${PREFIX}-formControl`,
	chartContainer: `${PREFIX}-chartContainer`,
	heading: `${PREFIX}-heading`,
	secondaryHeading: `${PREFIX}-secondaryHeading`,
	tertiaryHeading: `${PREFIX}-tertiaryHeading`,
};

const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		flexGrow: 1,
		height: '90vh',
	},

	[`& .${classes.mainComp}`]: {
		padding: theme.spacing(3),
		paddingTop: theme.spacing(1),
		height: '100%',
	},

	[`& .${classes.down}`]: {
		paddingRight: theme.spacing(3),
		padding: theme.spacing(6),
		paddingTop: theme.spacing(3),
	},

	[`& .${classes.paper1}`]: {
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

	[`& .${classes.paper2}`]: {
		padding: theme.spacing(3),
		textAlign: 'center',
		color: theme.palette.text.primary,
		marginLeft: theme.spacing(6),
		marginRight: theme.spacing(3),
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.primary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
	},

	[`& .${classes.formControl}`]: {
		margin: theme.spacing(5),
		minWidth: 220,
	},

	[`& .${classes.chartContainer}`]: {
		height: '100%',
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.secondary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
	},

	[`& .${classes.heading}`]: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '40%',
		flexShrink: 0,
		marginRight: '4%',
	},

	[`& .${classes.secondaryHeading}`]: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
		flexBasis: '15%',
		flexShrink: 0,
		marginRight: '4%',
	},

	[`& .${classes.tertiaryHeading}`]: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}));

//const data = require('../dataset/ps2_sem1_2020_pref.json');

const ProjectBankPage = () => {
	const [data, setData] = useState([]);
	const [dataPoints, setDataPoints] = useState([]);
	const [index, setIndex] = useState({ start: 0, end: 0 });
	const [isNextDisabled, setIsNextDisabled] = useState(true);
	const [isPrevDisabled, setIsPrevDisabled] = useState(true);
	const [choice, setMainChoice] = useState('All');
	const [search, setMainSearch] = useState('');
	const [slider, setMainSlider] = useState([0, 200000]);
	const [branch, setMainBranch] = useState('All');

	useEffect(() => {
		axios.get('/api/problembank').then((res) => {
			setData(res.data);
			// let pref = {};
			// res.data.forEach((d) => {
			// 	pref[d['Industry Domain']] = {};
			// });
			// console.log(pref);
		});
	}, []);

	useEffect(() => {
		let newPoints = [];
		data.forEach((d) => {
			if (
				d['Company Name']
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				d['Location'].toLowerCase().includes(search.toLowerCase())
			) {
				if (choice === 'All' || d['Industry Domain'] === choice) {
					if (
						d['Stipend (UG)'] >= slider[0] &&
						d['Stipend (UG)'] <= slider[1]
					) {
						if (
							branch === 'All' ||
							d['Preferred Branches'].includes(branch)
						) {
							newPoints.push(d);
						}
					}
				}
			}
		});
		if (newPoints.length > 15) {
			setIndex({ start: 0, end: 15 });
			setIsNextDisabled(false);
			setIsPrevDisabled(true);
		} else {
			setIndex({ start: 0, end: newPoints.length });
			setIsPrevDisabled(true);
			setIsNextDisabled(true);
		}
		setDataPoints(newPoints);
		console.log(newPoints);
	}, [search, choice, slider, data, branch]);

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
			setIndex({ start: 0, end: 15 });
			setIsPrevDisabled(true);
			setIsNextDisabled(false);
		}
	};

	return (
		<Root className={classes.root}>
			{window.innerWidth <= '800' ? (
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					alignContent="center"
					style={{ flexGrow: 1, height: '100%', padding: '10px' }}
				>
					<Typography
						component="h5"
						variant="h5"
						color="textSecondary"
						align="center"
					>
						This page is not yet supported on mobile. Please use a
						bigger screen!
					</Typography>
				</Grid>
			) : (
				<Grid
					container
					direction="row"
					spacing={0}
					className={classes.mainComp}
				>
					<Grid
						item
						sm={8}
						xs={12}
						className={classes.chartContainer}
					>
						<Scrollbars
							style={{ height: '100%' }}
							renderThumbVertical={({ style, ...props }) => (
								<div
									{...props}
									style={{
										...style,
										backgroundColor: '#ff6363',
										width: '4px',
										opacity: '0.7',
									}}
								/>
							)}
						>
							{dataPoints.length === 0 && (
								<Grid
									container
									justifyContent="center"
									alignItems="center"
									style={{ height: '100%' }}
								>
									<Typography
										component="h5"
										variant="h5"
										align="center"
										color="textSecondary"
									>
										Sorry, No Results Were Found :(
									</Typography>
								</Grid>
							)}
							{dataPoints.length > 0 &&
								dataPoints
									.slice(index.start, index.end)
									.map((station) => (
										<Accordion
											style={{
												borderBottom:
													'2px solid #ff6363',
												margin: '15px',
											}}
										>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
											>
												<Typography
													className={classes.heading}
												>
													{station['Company Name']}
												</Typography>

												<Typography
													className={
														classes.secondaryHeading
													}
												>
													{station['Location']}
												</Typography>
												{station['Industry Domain'] ===
												'nan' ? (
													<Typography
														className={
															classes.secondaryHeading
														}
													>
														-
													</Typography>
												) : (
													<Typography
														className={
															classes.secondaryHeading
														}
													>
														{
															station[
																'Industry Domain'
															]
														}
													</Typography>
												)}
												<Typography
													className={
														classes.tertiaryHeading
													}
												>
													{
														station[
															'Preferred Branches'
														]
													}
												</Typography>
											</AccordionSummary>
											<AccordionDetails
												style={{ display: 'block' }}
											>
												<div
													style={{
														position: 'absolute',
														left: '70%',
													}}
												>
													<Link
														underline="none"
														href={
															'/ps2/sem2/responses?search=' +
															station[
																'Company Name'
															].split(' ')[0]
														}
														target="_blank"
													>
														<Button
															variant="outlined"
															color="secondary"
															style={{
																display:
																	'block',
																marginBottom:
																	'10px',
															}}
															fullWidth
														>
															Checkout Responses
														</Button>
													</Link>
													<Link
														underline="none"
														href={
															'/ps2/sem2/chronicles?search=' +
															station[
																'Company Name'
															].split(' ')[0]
														}
														target="_blank"
													>
														<Button
															variant="outlined"
															color="secondary"
															style={{
																display:
																	'block',
															}}
															fullWidth
														>
															Checkout Chronicles
														</Button>
													</Link>
												</div>

												<div>
													<Typography
														component="span"
														color="secondary"
													>
														Stipend :{' '}
													</Typography>
													<Typography component="span">
														{'₹ ' +
															station[
																'Stipend (UG)'
															]}
													</Typography>
												</div>

												<WriteUp
													bio={station[
														'Projects'
													].split('\n')}
												/>

												<div>
													<Typography
														component="span"
														color="secondary"
													>
														Remarks :{' '}
													</Typography>
													{station['Facilities (Raw)']
														.split('\n')
														.map((a) => {
															if (
																a.includes(
																	'OtherInfo'
																)
															) {
																return (
																	<Typography component="span">
																		{a.replace(
																			'OtherInfo: ',
																			''
																		)}
																	</Typography>
																);
															}
														})}
												</div>
											</AccordionDetails>
										</Accordion>
									))}
						</Scrollbars>
					</Grid>
					<Grid item sm={4} xs={12}>
						<Paper elevation={10} className={classes.paper2}>
							<FilterComponentProjectBank
								mainSearch={search}
								setMainChoice={setMainChoice}
								setMainSearch={setMainSearch}
								setMainSlider={setMainSlider}
								setMainBranch={setMainBranch}
								stationNames={data}
							/>
						</Paper>
						<div style={{ marginTop: '20px' }}>
							<ButtonSelect
								isPrevDisabled={isPrevDisabled}
								handlePrevious={handlePrevious}
								isNextDisabled={isNextDisabled}
								handleNext={handleNext}
								stations={dataPoints}
								index={index}
							/>
						</div>
						<Grid
							container
							justifyContent="center"
							alignItems="center"
							className={classes.down}
						>
							<CSVLink
								data={data}
								style={{
									textDecoration: 'none',
									width: '100%',
								}}
								filename={'StationDetails.csv'}
							>
								<Button
									variant="outlined"
									color="primary"
									fullWidth
								>
									Download CSV
								</Button>
							</CSVLink>
							<Typography
								component="p"
								variant="body1"
								color="textSecondary"
								align="center"
								style={{ padding: '10px' }}
							>
								You can reorder this CSV with any sheets app and
								then upload it in the PSD portal with this
								amazing{' '}
								<Link
									href="https://github.com/Joe2k/PS-Companion"
									target="_blank"
									underline="hover"
								>
									PS&nbsp;Companion
								</Link>{' '}
								Extension :)
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			)}
		</Root>
	);
};

export default ProjectBankPage;
