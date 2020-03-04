import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './bootstrap.min.css';
import './App.css';
import Header from './component/Header';
import Sidebar from './component/Sidebar';

import Board from './component/Board';
import Login from './component/pages/Login';
import Register from './component/pages/Register';

import { AuthProvider } from './context/Auth';

function App() {
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		fetch('http://localhost:4000/refresh_token', { method: 'POST', credentials: 'include' }).then(async (res) => {
			const data = await res.json();
			console.log(data);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <div>LOADING TOKENS...</div>;
	}

	return (
		<AuthProvider>
			<div className="App bg-light">
				<Header />
				<div className="container-fluid">
					<div className="row">
						<Sidebar />
						<main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
							<Router>
								<Switch>
									<Route exact path="/" component={Board} />
									<Route exact path="/login" component={Login} />
									<Route exact path="/register" component={Register} />
								</Switch>
							</Router>
						</main>
					</div>
				</div>
			</div>
		</AuthProvider>
	);
}

export default App;
