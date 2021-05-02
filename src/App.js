import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar/Navbar';

const App = () => {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
