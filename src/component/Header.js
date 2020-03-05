import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/Auth';

function Header() {
	const { user } = useContext(AuthContext);

	return (
		<div className="">
			<nav className="bg-white box-shadow nav nav-underline navbar sticky-top flex-md-nowrap p-0">
				<div className="navbar-brand col-sm-3 col-md-2 mr-0">
					<Link to="/">Bug Tracker</Link>
				</div>
				{user && (
					<div className="nav-link text-muted">
						<Link to="/logout">Logout</Link>
					</div>
				)}
				{!user && (
					<div className="nav-link text-muted">
						<Link to="/login">Login</Link>
					</div>
				)}
			</nav>
		</div>
	);
}

export default Header;
