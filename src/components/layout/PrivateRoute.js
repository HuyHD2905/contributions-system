import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authAction";
import { Role } from "../../config/common";

class PrivateRoute extends Component {
	render() {
		const { profile, signOut } = this.props;

		if (profile.role === Role.Admin) {
			return (
				<ul className="right">
					<li>
						<NavLink to="/"></NavLink>
					</li>
					<li>
						<NavLink to="/create/manager">Create Manager</NavLink>
					</li>
					<li>
						<NavLink to="/user/list">Manager List</NavLink>
					</li>
					<li>
						<a onClick={signOut}>Logout</a>
					</li>
					<li>
						<NavLink to="/" className="btn pink lighten-1">
							{profile.firstName !== undefined
								? profile.firstName.charAt(0)
								: null}
							{profile.lastName !== undefined
								? profile.lastName.charAt(0)
								: null}
						</NavLink>
					</li>
				</ul>
			);
		}

		if (profile.role === Role.Manager) {
			return (
				<ul className="right">
					<li>
						<NavLink to="/"></NavLink>
					</li>
					<li>
						<NavLink to="/create/coordinator">Create Coordinator</NavLink>
					</li>
					<li>
						<NavLink to="/user/list">Coorinator List</NavLink>
					</li>
					<li>
						<a onClick={signOut}>Logout</a>
					</li>
					<li>
						<NavLink to="/" className="btn pink lighten-1">
							{profile.firstName !== undefined
								? profile.firstName.charAt(0)
								: null}
							{profile.lastName !== undefined
								? profile.lastName.charAt(0)
								: null}
						</NavLink>
					</li>
				</ul>
			);
		}

		if (profile.role === Role.Coordinator) {
			return (
				<ul className="right">
					<li>
						<NavLink to="/"></NavLink>
					</li>
					<li>
						<NavLink to="/create/student">Create Student</NavLink>
					</li>
					<li>
						<NavLink to="/user/list">Student List</NavLink>
					</li>
					<li>
						<a onClick={signOut}>Logout</a>
					</li>
					<li>
						<NavLink to="/" className="btn pink lighten-1">
							{profile.firstName !== undefined
								? profile.firstName.charAt(0)
								: null}
							{profile.lastName !== undefined
								? profile.lastName.charAt(0)
								: null}
						</NavLink>
					</li>
				</ul>
			);
		}

		return (
			<ul className="right">
				<li>
					<NavLink to="/"></NavLink>
				</li>
				<li>
					<a onClick={signOut}>Logout</a>
				</li>
				<li>
					<NavLink to="/" className="btn pink lighten-1">
						{profile.firstName !== undefined
							? profile.firstName.charAt(0)
							: null}
						{profile.lastName !== undefined ? profile.lastName.charAt(0) : null}
					</NavLink>
				</li>
			</ul>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut()),
	};
};

export default connect(null, mapDispatchToProps)(PrivateRoute);
