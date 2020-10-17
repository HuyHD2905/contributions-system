import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { isEmpty, repeat } from "lodash";
import { firestoreConnect } from "react-redux-firebase";
import { signUp } from "../../../store/actions/authAction";
import { Role } from "../../../config/common";

class CreateStudent extends Component {
	isLoaded = false;
	state = {
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		studentId: "",
		role: Role.Student,
		faculty: "",
	};

	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	handleSelectChange = (name, e) => {
		this.setState({
			[name]: e.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.signUp(this.state);
	};

	componentDidUpdate() {
		const { users, profile } = this.props;
		if (!this.isLoaded && !isEmpty(users) && !isEmpty(profile.faculty)) {
			let newStudentId = users.filter(function (user) {
				return user.role === Role.Student;
			}).length;

			this.setState({
				studentId: `GCS${repeat("0", 2)}${newStudentId + 1}`,
				faculty: profile.faculty,
			});
			this.isLoaded = true;
		}
	}

	render() {
		const { auth, authError, profile } = this.props;

		if (
			!auth.uid &&
			profile.role !== (Role.Admin || Role.Manager || Role.Coordinator)
		) {
			return <Redirect to="/" />;
		}

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Create Student Account</h5>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" onChange={this.handleChange} />
					</div>

					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={this.handleChange} />
					</div>

					<div className="input-field">
						<label htmlFor="firstName">First Name</label>
						<input type="text" id="firstName" onChange={this.handleChange} />
					</div>

					<div className="input-field">
						<label htmlFor="lastName">Last Name</label>
						<input type="text" id="lastName" onChange={this.handleChange} />
					</div>

					<div className="input-field">
						<button className="btn pink lighten-1 z-depth-0">
							Create Account
						</button>
					</div>

					<div className="red-text">
						{authError ? <p>{authError}</p> : null}
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		authError: state.auth.authError,
		profile: state.firebase.profile,
		users: state.firestore.ordered.users,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (credentials) => dispatch(signUp(credentials)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([{ collection: "users" }])
)(CreateStudent);
