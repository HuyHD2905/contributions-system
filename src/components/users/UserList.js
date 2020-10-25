import React, { Component } from "react";
import { connect } from "react-redux";
import { map, filter, get } from "lodash";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";
import { approve } from "../../store/actions/contributionAction";
import { Role, studentColumns } from "../../config/common";

class UserList extends Component {
	state = {
		checkItem: {},
		project_ids: [],
	};

	getUserData = () => {
		const { users, profile } = this.props;
		let data = { columns: studentColumns };
		let userData = users;

		if (get(profile, "role", "") === Role.Admin) {
			userData = filter(userData, (item) => {
				return item.role === Role.Manager;
			});
		}

		if (get(profile, "role", "") === Role.Manager) {
			userData = filter(userData, (item) => {
				return item.role === Role.Coordinator;
			});
		}

		if (get(profile, "role", "") === Role.Coordinator) {
			userData = filter(userData, (item) => {
				return (
					item.role === Role.Student &&
					item.faculty === get(profile, "faculty", "")
				);
			});
		}

		const studentsMap = map(userData, (item) => {
			return {
				email: item.email,
				firstName: item.firstName,
				lastName: item.lastName,
				role: item.role,
				faculty: item.faculty,
			};
		});

		data.rows = studentsMap;
		return data;
	};

	render() {
		const { auth } = this.props;

		if (!auth.uid) {
			return <Redirect to="/signin" />;
		}

		return (
			<div className="container user-list">
				<MDBDataTableV5
					hover
					entriesOptions={[5, 20, 25]}
					entries={5}
					pagesAmount={4}
					data={this.getUserData()}
					materialSearch
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
		users: state.firestore.ordered.users,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		approve: (project_ids) => dispatch(approve(project_ids)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(["users"])
)(UserList);
