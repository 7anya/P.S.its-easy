import { Fade, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import DetailPara from './DetailPara';
import Scroll from './Scroll';
import TitlePara from './TitlePara';

const useStyles = makeStyles((theme) => ({
	chartContainer: {
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(4),
		marginRight: theme.spacing(4),
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.secondary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
		padding: theme.spacing(4),
	},
}));

const WriteUp = ({ fade, details, bio }) => {
	const classes = useStyles();
	return (
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
				{bio.map((line) => {
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
					} else if (check(line, 'objectives of the project')) {
						return (
							<TitlePara
								fade={fade}
								line={line}
								heading="Objectives of The Project :"
							/>
						);
					} else if (check(line, 'outcomes of the project')) {
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
						check(line, 'brief description of working environment')
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
					} else if (check(line, 'academic courses relevant')) {
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
								<Typography component="p" type="body1">
									{line}
								</Typography>
							</Fade>
						);
					}
				})}
			</Scroll>
		</Paper>
	);
};

const check = (line, content) => {
	return line.toLowerCase().replace(/\s+/g, ' ').includes(content);
};

export default WriteUp;
