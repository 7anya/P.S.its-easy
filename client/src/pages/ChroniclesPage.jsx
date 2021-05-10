import { Grid, Link, makeStyles, Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import data from '../dataset/chronicles_combined_new.json';

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
	const [bio, setBio] = useState('');

	useEffect(() => {
		//console.log(data);
		const newArray = [];
		newArray.push({
			name: 'Amazon Development Center, Bangalore',
			...data['Amazon Development Center, Bangalore'],
		});
		newArray.push({
			name: 'Amazon Development Center, Chennai',
			...data['Amazon Development Center, Chennai'],
		});
		newArray.push({
			name: 'Amazon Development Center, Delhi',
			...data['Amazon Development Center, Delhi'],
		});
		newArray.push({
			name: 'Amazon Development Center,Hyderabad',
			...data['Amazon Development Center, Hyderabad'],
		});
		console.log(newArray);
		setStations(newArray);
	}, []);

	return (
		<div className={classes.root}>
			<Grid container direction="row" spacing={0}>
				<Grid item xs={8} className={classes.chartContainer}>
					<Typography
						component="p"
						type="body1"
						style={{ whiteSpace: 'pre-line' }}
					>
						{bio}
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Paper elevation={3} className={classes.paper1}></Paper>
					<Paper elevation={3} className={classes.paper2}>
						{stations.map((station) => {
							return (
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography className={classes.heading}>
											{station.name}
										</Typography>
									</AccordionSummary>
									<AccordionDetails
										style={{ display: 'block' }}
									>
										{station['2017'].length > 0 && (
											<Accordion>
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
																setBio(
																	student.writeUp
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
											<Accordion>
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
														<AccordionDetails>
															<Typography>
																{student.name}
															</Typography>
														</AccordionDetails>
													)
												)}
											</Accordion>
										)}
										{station['2019'].length > 0 && (
											<Accordion>
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
														<AccordionDetails>
															<Typography>
																{student.name}
															</Typography>
														</AccordionDetails>
													)
												)}
											</Accordion>
										)}
										{station['2020'].length > 0 && (
											<Accordion>
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
														<AccordionDetails>
															<Typography>
																{student.name}
															</Typography>
														</AccordionDetails>
													)
												)}
											</Accordion>
										)}
									</AccordionDetails>
								</Accordion>
							);
						})}
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default ChroniclesPage;
