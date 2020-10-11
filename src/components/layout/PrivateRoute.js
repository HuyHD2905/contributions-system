import React from "react";
import { NavLink } from "react-router-dom";

const PrivateRoute = () => {
	return (
		<ul className="right">
			<li>
				<NavLink to="/"></NavLink>
			</li>
			<li>
				<NavLink to="/project">Project</NavLink>
			</li>
			<li>
				<NavLink to="/project/create">Create Project</NavLink>
			</li>
			<li>
				<NavLink to="/">Create Student</NavLink>
			</li>
			<li>
				<NavLink to="/">Logout</NavLink>
			</li>
			<li>
				<NavLink to="/" className="btn btn-floating pink lighten-1">
					HuyHD
				</NavLink>
			</li>
		</ul>
	);
};

export default PrivateRoute;
