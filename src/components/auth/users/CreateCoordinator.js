import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import { signUp } from "../../../store/actions/authAction";
import { Role, Faculty } from "../../../config/common";

class CreateCoordinator extends Component {
	state = {
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		role: Role.Coordinator,
		studentId: null,
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

	render() {
		const { auth, authError, profile } = this.props;

		if (!auth.uid && profile.role !== Role.Manager) {
			return <Redirect to="/" />;
		}

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">
						Create Coordinator Account
					</h5>
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

					<>
						<label>Choose the faculty:</label>
						<Select
							styles={{
								option: (provided, state) => ({
									...provided,
									borderBottom: "1px dotted pink",
									color: state.isSelected ? "red" : "blue",
									padding: 10,
								}),
								singleValue: (provided, state) => {
									const opacity = state.isDisabled ? 0.5 : 1;
									const transition = "opacity 300ms";

									return { ...provided, opacity, transition };
								},
							}}
							value={this.faculty}
							onChange={(e) => this.handleSelectChange("faculty", e)}
							options={Faculty}
						/>
					</>

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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (credentials) => dispatch(signUp(credentials)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCoordinator);
