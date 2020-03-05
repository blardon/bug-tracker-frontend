import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './bootstrap.min.css';
import './App.css';
import Header from './component/Header';
import Sidebar from './component/Sidebar';
import Board from './component/Board';

import Home from './component/pages/Home';
import Login from './component/pages/Login';
import Register from './component/pages/Register';
import CreateProject from './component/pages/CreateProject';

import { AuthProvider } from './context/Auth';

function App() {
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		fetch('http://localhost:4000/refresh_token', { method: 'POST', credentials: 'include' }).then(async (res) => {
			const data = await res.json();
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <div>LOADING TOKENS...</div>;
	}

	return (
		<AuthProvider>
			<div className="App bg-light">
				<Router>
					<Header />
					<div className="container-fluid">
						<div className="row">
							<Sidebar />
							<main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
								<Switch>
									<Route exact path="/" component={Home} />
									<Route exact path="/login" component={Login} />
									<Route exact path="/register" component={Register} />
									<Route exact path="/createproject" component={CreateProject} />
									<Route exact path="/projects/:projectId" component={Board} />
								</Switch>
							</main>
						</div>
					</div>
				</Router>
			</div>
		</AuthProvider>
	);
}

export default App;
