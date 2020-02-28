import React from 'react';

function Sidebar() {
	return (
		<nav className="col-md-2 d-none d-md-block bg-light sidebar">
			<div className="sidebar-sticky">
				<ul className="nav flex-column">
					<li className="nav-item">
						<a className="nav-link active" href="/">
							Home
						</a>
					</li>
				</ul>
				<h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
					<span>
						Projects <span class="badge badge-primary pl-1 pr-1 ml-1">3</span>
					</span>
				</h6>
				<a className="nav-link" href="/">
					Project 1
				</a>
				<a className="nav-link" href="/">
					Project 2
				</a>
			</div>
		</nav>
	);
}

export default Sidebar;
