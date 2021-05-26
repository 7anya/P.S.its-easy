import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import './App.css';
import ResponsesPage from './pages/ResponsesPage';
import NavBar from './components/NavBar/Navbar';
import Column from './components/PrefferenceComponent/Column';
import ChroniclesPage from './pages/ChroniclesPage';
import { Scrollbars } from 'react-custom-scrollbars';
import HomePage from './pages/HomePage';
import axios from 'axios';
import PS1ResponsesPage from './pages/PS1ResponsesPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProjectBankPage from './pages/ProjectBankPage';

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		axios.get('/api/isUser').then((resp) => {
			if (resp.data !== 'No user found' && resp.status === 200) {
				//console.log(resp.data);
				setUser(resp.data);
			}
		});
	}, []);

	return (
		<Scrollbars style={{ width: '100vw', height: '100vh' }}>
			<Router>
				<NavBar user={user} />
				<Switch>
					<Route exact path="/">
						<HomePage user={user} />
					</Route>
					<ProtectedRoute
						exact
						path="/ps2/responses"
						Component={ResponsesPage}
					/>
					<ProtectedRoute
						exact
						path="/ps1/responses"
						Component={PS1ResponsesPage}
					/>
					<ProtectedRoute
						exact
						path="/ps2/chronicles"
						Component={ChroniclesPage}
					/>
					<ProtectedRoute
						exact
						path="/projectBank"
						Component={ProjectBankPage}
					/>
					{/* <Route exact path="/ps2/responses">
						<ResponsesPage />
					</Route> */}
					{/* <Route exact path="/ps1/responses">
						<PS1ResponsesPage />
					</Route>
					<Route exact path="/ps2/chronicles">
						<ChroniclesPage />
					</Route> */}

					<Route path="*">
						<Redirect to={{ pathname: '/' }} />
					</Route>
				</Switch>
			</Router>
		</Scrollbars>
	);
};

export default App;
