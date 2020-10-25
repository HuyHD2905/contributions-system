import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authAction";
import { Role } from "../../config/common";

class Signup extends Component {
	state = {
		userId: "",
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		role: Role.Admin,
		studentId: null,
		faculty: "All",
	};

	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.signUp(this.state);
	};

	render() {
		const { auth, authError } = this.props;

		if (auth.uid) {
			return <Redirect to="/" />;
		}

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Sign Up</h5>
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
						<button className="btn pink lighten-1 z-depth-0">Sign up</button>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (credentials) => dispatch(signUp(credentials)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
