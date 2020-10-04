import React from "react";
import { NavLink } from "react-router-dom";

const GuestRoute = () => {
	return (
		<ul className="right">
			<li>
				<NavLink to="/"></NavLink>
			</li>
			<li>
				<NavLink to="/">Signup</NavLink>
			</li>
			<li>
				<NavLink to="/">Signin</NavLink>
			</li>
		</ul>
	);
};

export default GuestRoute;
