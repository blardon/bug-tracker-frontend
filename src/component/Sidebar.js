import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/Auth';

function Sidebar() {
	const { user } = useContext(AuthContext);

	if (user) {
		console.log(user);
	}

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
						My projects
						{user && <span className="badge badge-primary pl-1 pr-1 ml-1">{user.projects.length}</span>}
					</span>
				</h6>
				{user &&
					user.projects.map((project) => (
						<div key={project.id} className="nav-link">
							<Link to={`/projects/${project.id}`}>{project.title}</Link>
						</div>
					))}

				<div className="nav-link">
					<Link to="/createproject">
						<button type="button" className="btn btn-primary">
							Add new project
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Sidebar;
