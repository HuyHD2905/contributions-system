import React from "react";
import { Link } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";
import { connect } from "react-redux";

const Navbar = (props) => {
	const { auth, profile } = props;

	return (
		<nav className="nav-wrapper grey darken-3">
			<div className="container">
				<Link to="/" className="brand-logo">
					Contribution System
				</Link>
				{auth.uid ? <PrivateRoute profile={profile} /> : <GuestRoute />}
			</div>
		</nav>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
	};
};

export default connect(mapStateToProps)(Navbar);
