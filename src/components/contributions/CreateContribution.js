import React, { Component } from "react";
import { create } from "../../store/actions/contributionAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Checkbox from "rc-checkbox";

class CreateContribution extends Component {
	state = {
		title: "",
		description: "",
		wordFile: "",
		url: "",
		agreeTermAndPolicies: false,
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.create(this.state);
	};

	handleChange = (e) => {
		const { id, value } = e.target;
		this.setState({
			[id]: value,
		});
	};

	handleFileUpload = (e) => {
		const { id, value, files } = e.target;
		this.setState({
			[id]: value,
			wordFile: files[0],
		});
	};

	onCheckItem = (e) => {
		this.setState({
			agreeTermAndPolicies: e.target.checked,
		});
	};

	render() {
		const { auth, profile } = this.props;
		const { agreeTermAndPolicies } = this.state;

		if (profile.isEmpty) {
			return <h1>Fail</h1>;
		}

		if (!auth.uid) {
			return <Redirect to="/signin" />;
		}

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Create Contribution</h5>
					<div className="input-field">
						<label htmlFor="title">Title</label>
						<input type="text" id="title" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="description">Description</label>
						<input type="text" id="description" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<input type="file" id="url" onChange={this.handleFileUpload} />
					</div>
					<div
						style={{
							flex: 1,
							display: "flex",
							alignItems: "center",
							direction: "row",
						}}
					>
						<label style={{ marginTop: 10 }}>
							<Checkbox onChange={(e, checked) => this.onCheckItem(e)} />
						</label>
						I accept Greenwich University Contribution's{" "}
						<a href="https://en.wikipedia.org/wiki/Terms_of_service">
							Terms & Conditions
						</a>
					</div>
					<div className="input-field">
						<button
							disabled={!agreeTermAndPolicies}
							className="btn pink lighten-1 z-depth-0"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		create: (contribution) => dispatch(create(contribution)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateContribution);
