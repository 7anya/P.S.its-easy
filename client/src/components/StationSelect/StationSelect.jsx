import { makeStyles, Paper } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import BigAccordion from './BigAccordion';
import ButtonSelect from './ButtonSelect';

const useStyles = makeStyles((theme) => ({
	paper2: {
		padding: theme.spacing(4),
		textAlign: 'center',
		color: theme.palette.text.primary,
		marginTop: theme.spacing(2),
		marginBottom: '20px',
		marginLeft: theme.spacing(4),
		marginRight: theme.spacing(4),
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

	const [expandedTop, setExpandedTop] = React.useState(false);
	const [expandedBottom, setExpandedBottom] = React.useState(false);

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

	const handleSearch = (newValue = search) => {
		setSearch(newValue);
	};
	return (
		<>
			<Paper elevation={3} className={classes.paper2}>
				<SearchBar
					value={search}
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
					{stations.slice(index.start, index.end).map((station) => {
						return (
							<BigAccordion
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
				</Scrollbars>
			</Paper>
			<ButtonSelect
				isPrevDisabled={isPrevDisabled}
				handlePrevious={handlePrevious}
				isNextDisabled={isNextDisabled}
				handleNext={handleNext}
			/>
		</>
	);
};

export default StationSelect;