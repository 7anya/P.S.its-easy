import {
	Grid,
	Paper,
	TextField,
	Typography,
	Autocomplete,
	Pagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import BigAccordion from './BigAccordion';
import ButtonSelect from './ButtonSelect';
import CircularProgress from '@mui/material/CircularProgress';

const PREFIX = 'StationSelect';

const classes = {
	paper2: `${PREFIX}-paper2`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
	[`& .${classes.paper2}`]: {
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

let pad = 4,
	mar = 4;
if (window.innerWidth <= 800) {
	pad = 2;
	mar = 2;
}

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
	type,
	isLoading = false,
	page,
	setPage,
	pageCount,
}) => {
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

	const handleChange = (event, value) => {
		setPage(value);
	};

	return (
		<Root>
			<Paper elevation={3} className={classes.paper2}>
				<Autocomplete
					freeSolo
					options={stations.map((option) => option.name)}
					renderInput={(params) => (
						<TextField {...params} label="Search" />
					)}
					inputValue={localSearch}
					onInputChange={(_event, newValue) => handleSearch(newValue)}
					sx={{ mb: '10px' }}
				/>
				{/* <SearchBar
                    value={localSearch}
                    onChange={(newValue) => handleSearch(newValue)}
                    onRequestSearch={handleSearch}
                    onCancelSearch={() => handleSearch('')}
                    style={{ marginBottom: '20px' }}
                /> */}

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
							.slice((page - 1) * 15, page * 15)
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
										type={type}
									/>
								);
							})}
					{fadeAccordion && !isLoading && stations.length === 0 && (
						<Grid
							container
							justifyContent="center"
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

					{(!fadeAccordion || isLoading) && (
						<CircularProgress style={{ marginTop: '10%' }} />
					)}
				</Scrollbars>
			</Paper>
			<Grid container justifyContent="center">
				<Pagination
					count={pageCount}
					page={page}
					onChange={handleChange}
					color="primary"
				/>
			</Grid>

			{/* <ButtonSelect
				isPrevDisabled={isPrevDisabled}
				handlePrevious={handlePrevious}
				isNextDisabled={isNextDisabled}
				handleNext={handleNext}
				stations={stations}
				index={index}
			/> */}
		</Root>
	);
};

export default StationSelect;
