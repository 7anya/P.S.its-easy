import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Link,
	Typography,
} from '@material-ui/core';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const BigAccordion = ({
	expandedTop,
	setExpandedTop,
	setExpandedBottom,
	expandedBottom,
	station,
	classes,
	setStudent,
}) => {
	const handleChangeTop = (panel) => (event, isExpanded) => {
		setExpandedTop(isExpanded ? panel : false);
		setExpandedBottom(false);
	};

	const handleChangeBottom = (panel) => (event, isExpanded) => {
		setExpandedBottom(isExpanded ? panel : false);
	};
	return (
		<Accordion
			expanded={expandedTop === station.name}
			onChange={handleChangeTop(station.name)}
			style={{
				borderBottom: '2px solid #bb86fc',
				margin: '15px',
			}}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>
					{station.name}
				</Typography>
			</AccordionSummary>
			<AccordionDetails style={{ display: 'block' }}>
				{station['2017'].length > 0 && (
					<Accordion
						expanded={expandedBottom === '2017'}
						onChange={handleChangeBottom('2017')}
						style={{
							borderBottom: '1px solid #bb86fc',
							backgroundColor: '#2d2d2d',
						}}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography className={classes.heading}>
								2017
							</Typography>
						</AccordionSummary>
						{station['2017'].map((student) => (
							<Link
								component="button"
								onClick={() => {
									setStudent(student);
								}}
								color="inherit"
								underline="none"
								style={{
									display: 'block',
									width: '100%',
									borderBottom: '1px solid #bb86fc',
								}}
								onMouseOver={(e) =>
									(e.target.style.color = '#bb86fc')
								}
								onMouseOut={(e) =>
									(e.target.style.color = 'white')
								}
							>
								<AccordionDetails>
									<Typography>{student.name}</Typography>
								</AccordionDetails>
							</Link>
						))}
					</Accordion>
				)}
				{station['2018'].length > 0 && (
					<Accordion
						expanded={expandedBottom === '2018'}
						onChange={handleChangeBottom('2018')}
						style={{
							borderBottom: '1px solid #bb86fc',
							backgroundColor: '#2d2d2d',
						}}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography className={classes.heading}>
								2018
							</Typography>
						</AccordionSummary>
						{station['2018'].map((student) => (
							<Link
								component="button"
								onClick={() => {
									setStudent(student);
								}}
								color="inherit"
								underline="none"
								style={{
									display: 'block',
									width: '100%',
									borderBottom: '1px solid #bb86fc',
								}}
								onMouseOver={(e) =>
									(e.target.style.color = '#bb86fc')
								}
								onMouseOut={(e) =>
									(e.target.style.color = 'white')
								}
							>
								<AccordionDetails>
									<Typography>{student.name}</Typography>
								</AccordionDetails>
							</Link>
						))}
					</Accordion>
				)}
				{station['2019'].length > 0 && (
					<Accordion
						expanded={expandedBottom === '2019'}
						onChange={handleChangeBottom('2019')}
						style={{
							borderBottom: '1px solid #bb86fc',
							backgroundColor: '#2d2d2d',
						}}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography className={classes.heading}>
								2019
							</Typography>
						</AccordionSummary>
						{station['2019'].map((student) => (
							<Link
								component="button"
								onClick={() => {
									setStudent(student);
								}}
								color="inherit"
								underline="none"
								style={{
									display: 'block',
									width: '100%',
									borderBottom: '1px solid #bb86fc',
								}}
								onMouseOver={(e) =>
									(e.target.style.color = '#bb86fc')
								}
								onMouseOut={(e) =>
									(e.target.style.color = 'white')
								}
							>
								<AccordionDetails>
									<Typography>{student.name}</Typography>
								</AccordionDetails>
							</Link>
						))}
					</Accordion>
				)}
				{station['2020'].length > 0 && (
					<Accordion
						expanded={expandedBottom === '2020'}
						onChange={handleChangeBottom('2020')}
						style={{
							borderBottom: '1px solid #bb86fc',
							backgroundColor: '#2d2d2d',
						}}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography className={classes.heading}>
								2020
							</Typography>
						</AccordionSummary>
						{station['2020'].map((student) => (
							<Link
								component="button"
								onClick={() => {
									setStudent(student);
								}}
								color="inherit"
								underline="none"
								style={{
									display: 'block',
									width: '100%',
									borderBottom: '1px solid #bb86fc',
								}}
								onMouseOver={(e) =>
									(e.target.style.color = '#bb86fc')
								}
								onMouseOut={(e) =>
									(e.target.style.color = 'white')
								}
							>
								<AccordionDetails>
									<Typography>{student.name}</Typography>
								</AccordionDetails>
							</Link>
						))}
					</Accordion>
				)}
			</AccordionDetails>
		</Accordion>
	);
};

export default BigAccordion;
