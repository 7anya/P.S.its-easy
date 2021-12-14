import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import './App.css';
import ResponsesPage from './pages/ResponsesPage';
import ResponsesPagePS2Sem2 from './pages/ResponsesPagePS2Sem2';
import NavBar from './components/NavBar/Navbar';
import ChroniclesPage from './pages/ChroniclesPage';
import ChroniclesPageSem2 from './pages/ChroniclesPageSem2';
import ChroniclesPagePS1 from './pages/ChroniclesPagePS1';
import { Scrollbars } from 'react-custom-scrollbars';
import HomePage from './pages/HomePage';
import axios from 'axios';
import PS1ResponsesPage from './pages/PS1ResponsesPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProjectBankPage from './pages/ProjectBankPage';
import AllotmentForm from './pages/AllotmentForm';
import {
	Backdrop,
	CircularProgress,
	Fade,
	makeStyles,
} from '@material-ui/core';
import PS2FormResponses from './pages/PS2FormResponses';
import AllotmentFormSem2 from './pages/AllotmentFormSem2';
import PS2FormResponsesSem2 from './pages/PS2FormResponsesSem2';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#121212',
	},
}));

const App = () => {
	const classes = useStyles();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		window.addEventListener('load', () => {
			setLoading(false);
		});
		axios.get('/api/isUser').then((resp) => {
			if (resp.data !== 'No user found' && resp.status === 200) {
				// console.log(resp.data);
				setUser(resp.data);
			}
		});
	}, []);

	return (
		<Scrollbars style={{ width: '100vw', height: '100vh' }}>
			<Fade in={loading}>
				<Backdrop className={classes.backdrop} open={loading}>
					<CircularProgress color="primary" />
				</Backdrop>
			</Fade>
			<Router>
				<NavBar user={user} />
				<Switch>
					<Route exact path="/">
						<HomePage user={user} />
					</Route>
					<ProtectedRoute
						exact
						path="/ps2/sem1/responses"
						Component={ResponsesPage}
					/>
					<ProtectedRoute
						exact
						path="/ps2/sem2/responses"
						Component={ResponsesPagePS2Sem2}
					/>
					<ProtectedRoute
						exact
						path="/ps1/responses"
						Component={PS1ResponsesPage}
					/>
					<ProtectedRoute
						exact
						path="/ps2/sem1/chronicles"
						Component={ChroniclesPage}
					/>
					<ProtectedRoute
						exact
						path="/ps2/sem2/chronicles"
						Component={ChroniclesPageSem2}
					/>
					<ProtectedRoute
						exact
						path="/ps1/chronicles"
						Component={ChroniclesPagePS1}
					/>
					<ProtectedRoute
						exact
						path="/projectBank"
						Component={ProjectBankPage}
					/>
					<ProtectedRoute
						exact
						path="/ps2/sem1/form"
						Component={AllotmentForm}
					/>
					<ProtectedRoute
						exact
						path="/ps2/sem1/formResponses"
						Component={PS2FormResponses}
					/>
					<ProtectedRoute
						exact
						path="/ps2/sem2/form"
						Component={AllotmentFormSem2}
					/>
					<ProtectedRoute
						exact
						path="/ps2/sem2/formResponses"
						Component={PS2FormResponsesSem2}
					/>

					<Route path="*">
						<Redirect to={{ pathname: '/' }} />
					</Route>
				</Switch>
			</Router>
		</Scrollbars>
	);
};

export default App;
