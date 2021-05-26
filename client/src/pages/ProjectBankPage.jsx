import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WriteUp from '../components/WriteUp/WriteUp';

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
		height: '100%',
		marginTop: '10px',
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.secondary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '40%',
		flexShrink: 0,
		marginRight: '4%',
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
		flexBasis: '15%',
		flexShrink: 0,
		marginRight: '4%',
	},
	tertiaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}));

const data = require('../dataset/ps2_sem1_2020_pref.json');

const ProjectBankPage = () => {
	const classes = useStyles();
	const [dataPoints, setDataPoints] = useState([]);
	const [index, setIndex] = useState({ start: 0, end: 0 });
	const [isNextDisabled, setIsNextDisabled] = useState(true);
	const [isPrevDisabled, setIsPrevDisabled] = useState(true);
	const [choice, setMainChoice] = useState('All');
	const [search, setMainSearch] = useState('');
	const [slider, setMainSlider] = useState([0, 1000000]);

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
						newPoints.push(d);
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
	}, [search, choice, slider]);

	return (
		<div className={classes.root}>
			{window.innerWidth <= '800' ? (
				<h5>This Page is not suitable on Mobile. Pls use laptop</h5>
			) : (
				<Grid
					container
					direction="row"
					spacing={0}
					style={{ padding: '20px', height: '100%' }}
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
							{dataPoints
								.slice(index.start, index.end)
								.map((station) => (
									<Accordion
										style={{
											borderBottom: '2px solid #ff6363',
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
													{station['Industry Domain']}
												</Typography>
											)}
											<Typography
												className={
													classes.tertiaryHeading
												}
											>
												{station['Preferred Branches']}
											</Typography>
										</AccordionSummary>
										<AccordionDetails
											style={{ display: 'block' }}
										>
											<WriteUp
												bio={station['Projects'].split(
													'\n'
												)}
											/>
										</AccordionDetails>
									</Accordion>
								))}
						</Scrollbars>
					</Grid>
					<Grid item sm={4} xs={12}></Grid>
				</Grid>
			)}
		</div>
	);
};

export default ProjectBankPage;
