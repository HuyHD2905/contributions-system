import React from "react";
import { Link } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

const Navbar = () => {
	return (
		<nav className="nav-wrapper grey darken-3">
			<div className="container">
				<Link to="/" className="brand-logo">
					Greenwich University
				</Link>
				<PrivateRoute />
				<GuestRoute />
			</div>
		</nav>
	);
};

export default Navbar;
