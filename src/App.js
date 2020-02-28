import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './bootstrap.min.css';
import './App.css';
import Header from './component/Header';
import Sidebar from './component/Sidebar';

import Board from './component/Board';
import Login from './component/pages/Login';
import Register from './component/pages/Register';

function App() {
	return (
		<div className="App bg-light">
			<Header />
			<div className="container-fluid">
				<div className="row">
					<Sidebar />
					<main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
						<Router>
							<Route exact path="/" component={Board} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
						</Router>
					</main>
				</div>
			</div>
		</div>
	);
}

export default App;
