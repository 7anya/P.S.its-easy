import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import ResponsesPage from './pages/ResponsesPage';
import NavBar from './components/NavBar/Navbar';
import Column from './components/PrefferenceComponent/Column';
import ChroniclesPage from './pages/ChroniclesPage';

const App = () => {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route path="/ps2/responses">
					<ResponsesPage />
				</Route>
				<Route path="/ps2/chronicles">
					<ChroniclesPage />
				</Route>
				<Route path="/pref">
					<Column />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
