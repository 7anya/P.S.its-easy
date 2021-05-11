import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CustomThemeProvider from './context/CustomThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
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
});

// const theme = createMuiTheme({
// 	typography: {
// 		fontFamily: ['"Product Sans"', 'Roboto', 'Arial', 'sans-serif'].join(
// 			','
// 		),
// 		allVariants: {
// 			color: '#f9cec4',
// 		},
// 	},
// 	palette: {
// 		type: 'dark',
// 		primary: {
// 			main: '#f9cec4',
// 		},
// 		secondary: {
// 			main: '#228990',
// 		},
// 		background: {
// 			default: '#474b5f',
// 			paper: '#232530',
// 		},
// 	},
// });

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	</ThemeProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
