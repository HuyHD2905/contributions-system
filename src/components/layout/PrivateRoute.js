import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authAction";

const PrivateRoute = (props) => {
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
				<a onClick={props.signOut}>Logout</a>
			</li>
			<li>
				<NavLink to="/" className="btn btn-floating pink lighten-1">
					HuyHD
				</NavLink>
			</li>
		</ul>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut()),
	};
};

export default connect(null, mapDispatchToProps)(PrivateRoute);
