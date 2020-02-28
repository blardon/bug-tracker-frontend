import React from 'react';

function Header() {
	return (
		<div className="">
			<nav className="bg-white box-shadow nav nav-underline navbar sticky-top flex-md-nowrap p-0">
				<a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">
					Bug Tracker
				</a>
				<a className="nav-link text-muted">Logout</a>
			</nav>
		</div>
	);
}

export default Header;
