import React, { useContext } from 'react';
import { AuthContext } from '../../context/Auth';
import { Redirect } from 'react-router-dom';

function Home() {
	const { user } = useContext(AuthContext);

	if (!user) {
		return <Redirect to="/login" />;
	}

	return (
		<div>
			<h1>Home</h1>
			<h6>Select projects or create new project</h6>
		</div>
	);
}

export default Home;
