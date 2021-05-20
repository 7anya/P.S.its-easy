import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Fade,
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
	fade,
	setStudent,
}) => {
	const handleChangeTop = (panel) => (event, isExpanded) => {
		setExpandedTop(isExpanded ? panel : false);
		setExpandedBottom(false);
	};

	const handleChangeBottom = (panel) => (event, isExpanded) => {
		setExpandedBottom(isExpanded ? panel : false);
	};

	const years = ['2017', '2018', '2019', '2020'];
	return (
		<Fade in={fade}>
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
					<Link underline="none" href={"/ps2/responses?search="+station.name} ><Button variant="outlined" color="primary" style={{marginBottom:"10px"}} >Checkout It's Responses</Button></Link>
					{years.map((year) => {
						return (
							station[year].length > 0 && (
								<Accordion
									expanded={expandedBottom === year}
									onChange={handleChangeBottom(year)}
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
											{year}
										</Typography>
									</AccordionSummary>
									{station[year].map((student) => (
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
												borderBottom:
													'1px solid #bb86fc',
											}}
											onMouseOver={(e) =>
												(e.target.style.color =
													'#bb86fc')
											}
											onMouseOut={(e) =>
												(e.target.style.color = 'white')
											}
										>
											<AccordionDetails>
												<Typography>
													{student.name}
												</Typography>
											</AccordionDetails>
										</Link>
									))}
								</Accordion>
							)
						);
					})}
				</AccordionDetails>
			</Accordion>
		</Fade>
	);
};

export default BigAccordion;
