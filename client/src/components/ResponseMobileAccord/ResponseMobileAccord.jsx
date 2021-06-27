import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Link,
	Typography,
} from '@material-ui/core';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ResponseMobileAccord = ({ xvalues, allStationInfo, index, type }) => {
	return (
		<Scrollbars
			style={{
				height: '71vh',
			}}
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
			{xvalues.slice(index.start, index.end).map((val) => (
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1bh-content"
						id="panel1bh-header"
					>
						{val}
					</AccordionSummary>
					<AccordionDetails style={{ display: 'block' }}>
						<Typography variant="body1" component="p">
							<Typography
								component="span"
								variant="body1"
								style={{ color: '#ffd39c' }}
							>
								Min:{' '}
							</Typography>
							{allStationInfo[val].min}
						</Typography>
						<Typography variant="body1" component="p">
							<Typography
								component="span"
								variant="body1"
								style={{ color: '#ffd39c' }}
							>
								Max:{' '}
							</Typography>
							{allStationInfo[val].max}
						</Typography>
						<Typography variant="body1" component="p">
							<Typography
								component="span"
								variant="body1"
								style={{ color: '#ffd39c' }}
							>
								Mean:{' '}
							</Typography>
							{allStationInfo[val].avg}
						</Typography>
						{allStationInfo[val].count && (
							<Typography variant="body1" component="p">
								<Typography
									component="span"
									variant="body1"
									style={{ color: '#ffd39c' }}
								>
									Count:{' '}
								</Typography>
								{allStationInfo[val].count}
							</Typography>
						)}
						{type === 'PS2' && (
							<Link
								underline="none"
								href={'/ps2/chronicles?search=' + val}
							>
								<Button
									variant="outlined"
									color="secondary"
									style={{
										marginTop: '10px',
									}}
								>
									Checkout It's Chronicles
								</Button>
							</Link>
						)}
					</AccordionDetails>
				</Accordion>
			))}
		</Scrollbars>
	);
};

export default ResponseMobileAccord;
