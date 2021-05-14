import React from 'react';
import Scrollbars from 'react-custom-scrollbars';

const Scroll = ({ children }) => {
	return (
		<Scrollbars
			style={{ height: '69vh' }}
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
			{children}
		</Scrollbars>
	);
};

export default Scroll;
