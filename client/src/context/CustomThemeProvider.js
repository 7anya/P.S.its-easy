import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext({
	currentTheme: 'dark',
	setTheme: null,
});

export const light = {
	palette: {
		type: 'light',
		background: {
			default: '#fff',
		},
	},
};

export const dark = {
	typography: {
		fontFamily: ['"Product Sans"', 'Roboto', 'Arial', 'sans-serif'].join(
			','
		),
	},
	palette: {
		type: 'dark',
		primary: {
			main: '#bb86fc',
		},
		secondary: {
			main: '#ff6363',
		},
		background: {
			default: '#121212',
			paper: '#272727',
		},
	},
};

const CustomThemeProvider = (props) => {
	// eslint-disable-next-line react/prop-types
	const { children } = props;

	// Read current theme from localStorage or maybe from an api
	const currentTheme = localStorage.getItem('appTheme') || 'light';

	// State to hold the selected theme name
	const [themeName, _setThemeName] = useState(currentTheme);

	// Retrieve the theme object by theme name
	const newTheme = createMuiTheme(themeName === 'light' ? light : dark);

	// Wrap _setThemeName to store new theme names in localStorage
	const setThemeName = (name) => {
		localStorage.setItem('appTheme', name);
		_setThemeName(name);
	};

	const contextValue = {
		currentTheme: themeName,
		setTheme: setThemeName,
	};

	return (
		<CustomThemeContext.Provider value={contextValue}>
			<ThemeProvider theme={newTheme}>{children}</ThemeProvider>
		</CustomThemeContext.Provider>
	);
};

export default CustomThemeProvider;
