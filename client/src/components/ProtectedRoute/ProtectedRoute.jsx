import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute(props) {
	const [user, setUser] = useState(null);
	const { Component, ...rest } = props;

	useEffect(() => {
		axios.get('/api/isUser').then((resp) => {
			if (resp.data !== 'No user found' && resp.status === 200) {
				//console.log(resp.data);
				setUser(true);
			} else {
				setUser(false);
			}
		});
	}, []);

	return (
		<Route
			exact
			{...rest}
			render={(props) => {
				if (user === true) {
					return <Component />;
				} else if (user === false) {
					return (
						<Redirect
							to={{
								pathname: '/',
								state: { from: props.location },
							}}
						/>
					);
				}
			}}
		/>
	);
}

export default ProtectedRoute;
