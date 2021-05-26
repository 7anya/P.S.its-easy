import { Fade, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import DetailPara from './DetailPara';
import Scroll from './Scroll';
import TitlePara from './TitlePara';

let pad = 4,
	mar = 4;
if (window.innerWidth <= 800) {
	pad = 2;
	mar = 2;
}

const useStyles = makeStyles((theme) => ({
	chartContainer: {
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(mar),
		marginRight: theme.spacing(mar),
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.secondary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
		padding: theme.spacing(pad),
	},
}));

const WriteUp = ({ fade, details, bio }) => {
	const classes = useStyles();
	return (
		<>
			{fade ? (
				<Paper className={classes.chartContainer}>
					{/* <Typography
							component="h1"
							align="center"
							variant="h4"
							color="secondary"
						>
							PS-2 Chronicles
						</Typography> */}
					<Scroll>
						<DetailPara fade={fade} details={details} />
						{details.name === '' ? (
							<Fade in={fade}>
								<Typography
									style={{ marginTop: '50px' }}
									color="textSecondary"
									align="center"
								>
									Please select a student to view their
									Chronicles Write-Up!
								</Typography>
							</Fade>
						) : (
							bio.map((line) => {
								if (check(line, 'short summary of work done')) {
									return (
										<TitlePara
											fade={fade}
											line={line}
											heading="Short Summary Of Work Done :"
										/>
									);
								} else if (
									check(line, 'tools used') ||
									check(line, 'tool used')
								) {
									return (
										<TitlePara
											fade={fade}
											line={line}
											heading="Tools Used :"
										/>
									);
								} else if (
									check(line, 'objectives of the project')
								) {
									return (
										<TitlePara
											fade={fade}
											line={line}
											heading="Objectives of The Project :"
										/>
									);
								} else if (
									check(line, 'outcomes of the project')
								) {
									return (
										<TitlePara
											fade={fade}
											line={line}
											heading="Outcomes Of The Project :"
										/>
									);
								} else if (check(line, 'major learning')) {
									return (
										<TitlePara
											fade={fade}
											line={line}
											heading="Major Learning Outcomes :"
										/>
									);
								} else if (
									check(
										line,
										'brief description of working environment'
									)
								) {
									return (
										<TitlePara
											fade={fade}
											line={line}
											heading="Brief Description of Working Environment :"
										/>
									);
								} else if (
									check(line, 'details of papers/patents') ||
									check(line, 'details of papers / patents')
								) {
									return (
										<TitlePara
											fade={fade}
											line={line}
											heading="Details of Papers/Patents :"
										/>
									);
								} else if (
									check(line, 'academic courses relevant')
								) {
									return (
										<TitlePara
											fade={fade}
											line={line}
											heading="Academic Courses Relevant :"
										/>
									);
								} else if (check(line, 'student write-up')) {
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
											<Typography
												component="p"
												type="body1"
											>
												{line}
											</Typography>
										</Fade>
									);
								}
							})
						)}
					</Scroll>
				</Paper>
			) : (
				bio.map((line) => {
					if (check(line, 'project:')) {
						return (
							<TitlePara line={line} heading="Project Number :" />
						);
					} else if (check(line, 'title:')) {
						return (
							<TitlePara
								line={line}
								heading="Title of Project :"
							/>
						);
					} else if (check(line, 'description:')) {
						return (
							<TitlePara
								line={line}
								heading="Description of The Project :"
							/>
						);
					} else if (check(line, 'skills:')) {
						return <TitlePara line={line} heading="Skills :" />;
					} else if (check(line, 'students required:')) {
						return (
							<TitlePara
								line={line}
								heading="Students Required :"
							/>
						);
					} else if (check(line, 'min cgpa')) {
						return <TitlePara line={line} heading="Min CGPA :" />;
					} else if (check(line, 'max cgpa')) {
						return <TitlePara line={line} heading="Max CGPA :" />;
					} else {
						return (
							<Typography component="p" type="body1">
								{line}
							</Typography>
						);
					}
				})
			)}
		</>
	);
};

const check = (line, content) => {
	return line.toLowerCase().replace(/\s+/g, ' ').includes(content);
};

export default WriteUp;
