import {
	Grid,
	makeStyles,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import BigAccordion from './BigAccordion';
import ButtonSelect from './ButtonSelect';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

let pad = 4,
	mar = 4;
if (window.innerWidth <= 800) {
	pad = 2;
	mar = 2;
}

const useStyles = makeStyles((theme) => ({
	paper2: {
		padding: theme.spacing(pad),
		textAlign: 'center',
		color: theme.palette.text.primary,
		marginTop: theme.spacing(2),
		marginBottom: '20px',
		marginLeft: theme.spacing(mar),
		marginRight: theme.spacing(mar),
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.primary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
	},
}));

const StationSelect = ({
	stations,
	index,
	setIndex,
	search,
	setSearch,
	setIsNextDisabled,
	setIsPrevDisabled,
	setStudent,
	isPrevDisabled,
	isNextDisabled,
}) => {
	const classes = useStyles();

	const [fadeAccordion, setFadeAccordion] = React.useState(true);
	const [expandedTop, setExpandedTop] = React.useState(false);
	const [expandedBottom, setExpandedBottom] = React.useState(false);

	const handleNext = () => {
		// console.log(allStationInfo);
		setFadeAccordion(false);

		setTimeout(() => {
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
			setFadeAccordion(true);
		}, 200);
	};

	const handlePrevious = () => {
		setFadeAccordion(false);

		setTimeout(() => {
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
			setFadeAccordion(true);
		}, 200);
	};
	const [localSearch, setLocalSearch] = React.useState(search);

	React.useEffect(() => {
		setLocalSearch(search);
	}, [search]);

	React.useEffect(() => {
		const delayTimeout = setTimeout(() => {
			setSearch(localSearch);
			setFadeAccordion(true);
		}, 2000);

		return () => clearTimeout(delayTimeout);
	}, [localSearch]);

	const handleSearch = (newValue = localSearch) => {
		setFadeAccordion(false);
		setLocalSearch(newValue);

		// setTimeout(() => {

		// }, 0);
	};
	return (
		<>
			<Paper elevation={3} className={classes.paper2}>
				<SearchBar
					value={localSearch}
					onChange={(newValue) => handleSearch(newValue)}
					onRequestSearch={handleSearch}
					onCancelSearch={() => handleSearch('')}
					style={{ marginBottom: '20px' }}
				/>

				<Scrollbars
					style={{ height: '59vh' }}
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
					<Typography variant="h6" color="primary">
						Stations
					</Typography>

					{fadeAccordion &&
						stations
							.slice(index.start, index.end)
							.map((station) => {
								return (
									<BigAccordion
										fade={fadeAccordion}
										expandedTop={expandedTop}
										setExpandedTop={setExpandedTop}
										setExpandedBottom={setExpandedBottom}
										expandedBottom={expandedBottom}
										station={station}
										classes={classes}
										setStudent={setStudent}
									/>
								);
							})}
					{fadeAccordion && stations.length === 0 && (
						<Grid
							container
							justify="center"
							alignItems="center"
							style={{ height: '80%' }}
						>
							<Typography
								component="h6"
								variant="h6"
								align="center"
								color="textSecondary"
							>
								Sorry, No Results Were Found :(
							</Typography>
						</Grid>
					)}

					{!fadeAccordion && (
						<CircularProgress style={{ marginTop: '10%' }} />
					)}
				</Scrollbars>
			</Paper>
			<ButtonSelect
				isPrevDisabled={isPrevDisabled}
				handlePrevious={handlePrevious}
				isNextDisabled={isNextDisabled}
				handleNext={handleNext}
				stations={stations}
				index={index}
			/>
		</>
	);
};

export default StationSelect;
