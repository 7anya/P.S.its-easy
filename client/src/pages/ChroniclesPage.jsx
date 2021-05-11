import { Button, Grid, Link, makeStyles, Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import data from '../dataset/chronicles_combined_new.json';
import { Scrollbars } from 'react-custom-scrollbars';
import Fade from '@material-ui/core/Fade';
import SearchBar from 'material-ui-search-bar';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '90vh',
	},
	paper1: {
		padding: theme.spacing(4),
		textAlign: 'center',
		color: theme.palette.text.primary,
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
		marginTop: '10px',
		marginBottom: '20px',
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
		marginTop: '10px',
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.secondary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
		padding: theme.spacing(4),
	},
	svg: {
		backgroundColor: 'darkgreen',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

function ChroniclesPage() {
	const classes = useStyles();
	const [stations, setStations] = useState([]);
	const [full, setFull] = useState([]);
	const [bio, setBio] = useState([]);
	const [index, setIndex] = useState({ start: 0, end: 0 });
	const [search, setSearch] = useState('');
	const [isNextDisabled, setIsNextDisabled] = useState(true);
	const [isPrevDisabled, setIsPrevDisabled] = useState(true);
	const [student, setStudent] = useState({ name: '', id: '', writeUp: '' });
	const [expandedTop, setExpandedTop] = React.useState(false);
	const [expandedBottom, setExpandedBottom] = React.useState(false);
	const [fade, setFade] = useState(true);

	useEffect(() => {
		setFade(false);

		setTimeout(() => {
			if (student.name !== '') {
				const lines = student.writeUp.split('\n');
				setBio(lines);
			}
			setFade(true);
		}, 200);
	}, [student]);

	useEffect(() => {
		//console.log(data);
		const newArray = [];
		for (const property in data) {
			newArray.push({
				name: property,
				...data[property],
			});
		}

		if (newArray.length > 15) {
			setIndex({ start: 0, end: 15 });
			setIsNextDisabled(false);
			setIsPrevDisabled(true);
		} else {
			setIndex({ start: 0, end: 15 });
			setIsPrevDisabled(true);
			setIsNextDisabled(true);
		}
		setFull(newArray);
	}, []);

	useEffect(() => {
		const newStations = full.filter((each) => {
			return each.name.toLowerCase().includes(search);
		});
		setStations(newStations);

		if (newStations.length > 15) {
			setIndex({ start: 0, end: 15 });
			setIsNextDisabled(false);
			setIsPrevDisabled(true);
		} else {
			setIndex({ start: 0, end: newStations.length });
			setIsPrevDisabled(true);
			setIsNextDisabled(true);
		}
	}, [search, full]);

	const handleNext = () => {
		// console.log(allStationInfo);

		if (index.end + 15 < stations.length) {
			setIndex({ start: index.start + 15, end: index.end + 15 });
			setIsPrevDisabled(false);
		} else if (index.start + 15 <= stations.length) {
			setIndex({ start: index.start + 15, end: stations.length });
			setIsPrevDisabled(false);
			setIsNextDisabled(true);
		}
		setExpandedTop(false);
		setExpandedBottom(false);
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
		setExpandedTop(false);
		setExpandedBottom(false);
	};

	const handleChangeTop = (panel) => (event, isExpanded) => {
		setExpandedTop(isExpanded ? panel : false);
		setExpandedBottom(false);
	};

	const handleChangeBottom = (panel) => (event, isExpanded) => {
		setExpandedBottom(isExpanded ? panel : false);
	};

	const handleSearch = (newValue = search) => {
		setSearch(newValue);
	};

	return (
		<div className={classes.root}>
			<Grid container direction="row" spacing={0}>
				<Grid item xs={8} className={classes.chartContainer}>
					<Scrollbars
						style={{ height: '75vh' }}
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
						{bio.map((line) => {
							if (
								line
									.toLowerCase()
									.replace(/\s+/g, ' ')
									.includes('short summary of work done')
							) {
								return (
									<Fade in={fade}>
										<Typography
											component="p"
											type="body1"
											style={{ marginTop: '20px' }}
										>
											<Typography
												component="p"
												type="body1"
												color="secondary"
											>
												Short Summary Of Work Done :
											</Typography>

											<Typography
												component="p"
												type="body1"
											>
												{line.split(':')[1]}
											</Typography>
										</Typography>
									</Fade>
								);
							} else if (
								line
									.toLowerCase()
									.replace(/\s+/g, ' ')
									.includes('tools used') ||
								line
									.toLowerCase()
									.replace(/\s+/g, ' ')
									.includes('tool used')
							) {
								return (
									<Fade in={fade}>
										<Typography
											component="p"
											type="body1"
											style={{ marginTop: '20px' }}
										>
											<Typography
												component="p"
												type="body1"
												color="secondary"
											>
												Tools Used :
											</Typography>
											<Typography
												component="p"
												type="body1"
											>
												{line.split(':')[1]}
											</Typography>
										</Typography>
									</Fade>
								);
							} else if (
								line
									.toLowerCase()
									.replace(/\s+/g, ' ')
									.includes('objectives of the project')
							) {
								return (
									<Fade in={fade}>
										<Typography
											component="p"
											type="body1"
											style={{ marginTop: '20px' }}
										>
											<Typography
												component="p"
												type="body1"
												color="secondary"
											>
												Objectives of The Project :
											</Typography>
											<Typography
												component="p"
												type="body1"
											>
												{line.split(':')[1]}
											</Typography>
										</Typography>
									</Fade>
								);
							} else if (
								line
									.toLowerCase()
									.replace(/\s+/g, ' ')
									.includes('outcomes of the project')
							) {
								return (
									<Fade in={fade}>
										<Typography
											component="p"
											type="body1"
											style={{ marginTop: '20px' }}
										>
											<Typography
												component="p"
												type="body1"
												color="secondary"
											>
												Outcomes Of The Project :
											</Typography>
											<Typography
												component="p"
												type="body1"
											>
												{line.split(':')[1]}
											</Typography>
										</Typography>
									</Fade>
								);
							} else if (
								line
									.toLowerCase()
									.replace(/\s+/g, ' ')
									.includes('major learning')
							) {
								return (
									<Fade in={fade}>
										<Typography
											component="p"
											type="body1"
											style={{ marginTop: '20px' }}
										>
											<Typography
												component="p"
												type="body1"
												color="secondary"
											>
												Major Learning Outcomes :
											</Typography>
											<Typography
												component="p"
												type="body1"
											>
												{line.split(':')[1]}
											</Typography>
										</Typography>
									</Fade>
								);
							} else if (
								line
									.toLowerCase()
									.replace(/\s+/g, ' ')
									.includes(
										'brief description of working environment'
									)
							) {
								return (
									<Fade in={fade}>
										<Typography
											component="p"
											type="body1"
											style={{ marginTop: '20px' }}
										>
											<Typography
												component="p"
												type="body1"
												color="secondary"
											>
												Brief Description of Working
												Environment :
											</Typography>
											<Typography
												component="p"
												type="body1"
											>
												{line.split(':')[1]}
											</Typography>
										</Typography>
									</Fade>
								);
							} else if (
								line
									.toLowerCase()
									.replace(/\s+/g, ' ')
									.includes('details of papers/patents') ||
								line
									.toLowerCase()
									.replace(/\s+/g, ' ')
									.includes('details of papers / patents')
							) {
								return (
									<Fade in={fade}>
										<Typography
											component="p"
											type="body1"
											style={{ marginTop: '20px' }}
										>
											<Typography
												component="p"
												type="body1"
												color="secondary"
											>
												Details of Papers/Patents :
											</Typography>
											<Typography
												component="p"
												type="body1"
											>
												{line.split(':')[1]}
											</Typography>
										</Typography>
									</Fade>
								);
							} else if (
								line
									.toLowerCase()
									.replace(/\s+/g, ' ')
									.includes('academic courses relevant')
							) {
								return (
									<Fade in={fade}>
										<Typography
											component="p"
											type="body1"
											style={{ marginTop: '20px' }}
										>
											<Typography
												component="p"
												type="body1"
												color="secondary"
											>
												Academic Courses Relevant :
											</Typography>
											<Typography
												component="p"
												type="body1"
											>
												{line.split(':')[1]}
											</Typography>
										</Typography>
									</Fade>
								);
							} else if (
								line
									.toLowerCase()
									.replace(/\s+/g, ' ')
									.includes('student write-up')
							) {
								return (
									<Fade in={fade}>
										<Typography
											component="p"
											type="body1"
										></Typography>
									</Fade>
								);
							} else {
								return (
									<Fade in={fade}>
										<Typography component="p" type="body1">
											{line}
										</Typography>
									</Fade>
								);
							}
						})}
					</Scrollbars>
				</Grid>
				<Grid item xs={4}>
					{/* <Paper elevation={3} className={classes.paper1}></Paper> */}
					<Paper elevation={3} className={classes.paper2}>
						<SearchBar
							value={search}
							onChange={(newValue) => handleSearch(newValue)}
							onRequestSearch={handleSearch}
							onCancelSearch={() => handleSearch('')}
							style={{ marginBottom: '20px' }}
						/>
						<Scrollbars
							style={{ height: '60vh' }}
							renderThumbVertical={({ style, ...props }) => (
								<div
									{...props}
									style={{
										...style,
										backgroundColor: '#bb86fc',
										width: '4px',
										opacity: '0.7',
									}}
								/>
							)}
						>
							{stations
								.slice(index.start, index.end)
								.map((station) => {
									return (
										<Accordion
											expanded={
												expandedTop === station.name
											}
											onChange={handleChangeTop(
												station.name
											)}
										>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
											>
												<Typography
													className={classes.heading}
												>
													{station.name}
												</Typography>
											</AccordionSummary>
											<AccordionDetails
												style={{ display: 'block' }}
											>
												{station['2017'].length > 0 && (
													<Accordion
														expanded={
															expandedBottom ===
															'2017'
														}
														onChange={handleChangeBottom(
															'2017'
														)}
													>
														<AccordionSummary
															expandIcon={
																<ExpandMoreIcon />
															}
															aria-controls="panel1a-content"
															id="panel1a-header"
														>
															<Typography
																className={
																	classes.heading
																}
															>
																2017
															</Typography>
														</AccordionSummary>
														{station['2017'].map(
															(student) => (
																<Link
																	component="button"
																	onClick={() => {
																		setStudent(
																			student
																		);
																	}}
																	color="inherit"
																	underline="none"
																	style={{
																		display:
																			'block',
																	}}
																>
																	<AccordionDetails>
																		<Typography>
																			{
																				student.name
																			}
																		</Typography>
																	</AccordionDetails>
																</Link>
															)
														)}
													</Accordion>
												)}
												{station['2018'].length > 0 && (
													<Accordion
														expanded={
															expandedBottom ===
															'2018'
														}
														onChange={handleChangeBottom(
															'2018'
														)}
													>
														<AccordionSummary
															expandIcon={
																<ExpandMoreIcon />
															}
															aria-controls="panel1a-content"
															id="panel1a-header"
														>
															<Typography
																className={
																	classes.heading
																}
															>
																2018
															</Typography>
														</AccordionSummary>
														{station['2018'].map(
															(student) => (
																<Link
																	component="button"
																	onClick={() => {
																		setStudent(
																			student
																		);
																	}}
																	color="inherit"
																	underline="none"
																	style={{
																		display:
																			'block',
																	}}
																>
																	<AccordionDetails>
																		<Typography>
																			{
																				student.name
																			}
																		</Typography>
																	</AccordionDetails>
																</Link>
															)
														)}
													</Accordion>
												)}
												{station['2019'].length > 0 && (
													<Accordion
														expanded={
															expandedBottom ===
															'2019'
														}
														onChange={handleChangeBottom(
															'2019'
														)}
													>
														<AccordionSummary
															expandIcon={
																<ExpandMoreIcon />
															}
															aria-controls="panel1a-content"
															id="panel1a-header"
														>
															<Typography
																className={
																	classes.heading
																}
															>
																2019
															</Typography>
														</AccordionSummary>
														{station['2019'].map(
															(student) => (
																<Link
																	component="button"
																	onClick={() => {
																		setStudent(
																			student
																		);
																	}}
																	color="inherit"
																	underline="none"
																	style={{
																		display:
																			'block',
																	}}
																>
																	<AccordionDetails>
																		<Typography>
																			{
																				student.name
																			}
																		</Typography>
																	</AccordionDetails>
																</Link>
															)
														)}
													</Accordion>
												)}
												{station['2020'].length > 0 && (
													<Accordion
														expanded={
															expandedBottom ===
															'2020'
														}
														onChange={handleChangeBottom(
															'2020'
														)}
													>
														<AccordionSummary
															expandIcon={
																<ExpandMoreIcon />
															}
															aria-controls="panel1a-content"
															id="panel1a-header"
														>
															<Typography
																className={
																	classes.heading
																}
															>
																2020
															</Typography>
														</AccordionSummary>
														{station['2020'].map(
															(student) => (
																<Link
																	component="button"
																	onClick={() => {
																		setStudent(
																			student
																		);
																	}}
																	color="inherit"
																	underline="none"
																	style={{
																		display:
																			'block',
																	}}
																>
																	<AccordionDetails>
																		<Typography>
																			{
																				student.name
																			}
																		</Typography>
																	</AccordionDetails>
																</Link>
															)
														)}
													</Accordion>
												)}
											</AccordionDetails>
										</Accordion>
									);
								})}
						</Scrollbars>
					</Paper>
					<Grid
						container
						style={{ paddingLeft: '50px', paddingRight: '50px' }}
					>
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
									color="primary"
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
									color="primary"
								>
									Next
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default ChroniclesPage;
