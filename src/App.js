import React from 'react';
import './bootstrap.min.css';
import './App.css';
import Header from './components/Header';

import Board from './components/Board';

function App() {
	return (
		<div className="App bg-light">
			<Header />
			<div className="container">
				<Board />
			</div>
		</div>
	);
}

export default App;
