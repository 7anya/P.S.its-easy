import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar/Navbar';
import Column from './components/PrefferenceComponent/Column';

const App = () => {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
				<Route path="/pref">
					<Column />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
