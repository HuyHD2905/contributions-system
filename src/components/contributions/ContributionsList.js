import React, { Component } from "react";
import { connect } from "react-redux";
import { map, isEmpty, filter, get, upperFirst } from "lodash";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import {
	columns,
	marketingManagerColumns,
	studentContributionColumns,
} from "./data";
import { NavLink } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";
import Checkbox from "rc-checkbox";
import { saveAs } from "file-saver";
import JSZipUtils from "jszip-utils";
import { approve } from "../../store/actions/projectActions";
import { Role, Status } from "../../config/common";

class ContributionsList extends Component {
	state = {
		checkItem: {},
		project_ids: [],
	};

	onCheckItem = (item, e) => {
		const { project_ids, checkItem } = this.state;
		let checkItemState = checkItem;
		let projectIdsState = project_ids;

		if (e.target.checked) {
			checkItemState[item.id] = item.fileURL;
			projectIdsState.push(item.id);
		} else {
			projectIdsState = filter(projectIdsState, (projectId) => {
				return projectId !== item.id;
			});
			delete checkItemState[item.id];
		}

		this.setState({
			checkItem: checkItemState,
			project_ids: projectIdsState,
		});
	};

	getStatusColor = (status) => {
		if (status === Status.Pending) {
			return "orange";
		}

		if (status === Status.Approved) {
			return "green";
		}

		if (status === Status.Publish) {
			return "blue";
		}
	};

	getPostsDataTable = () => {
		const { posts, profile } = this.props;
		let postsData = posts;

		postsData = posts.filter((item) => {
			return item.status === "pending";
		});

		let postsMap = [];
		let data = { columns: columns };

		if (get(profile, "role", "") === Role.Manager) {
			postsData = posts.filter((item) => {
				return item.status === "approved";
			});
			data.columns = marketingManagerColumns;
		}

		if (get(profile, "role", "") === Role.Student) {
			postsData = posts.filter((item) => {
				return item.studentId === profile.studentId;
			});
			data.columns = studentContributionColumns;
		}

		if (get(profile, "role", "") === Role.Coordinator) {
			postsData = posts.filter((item) => {
				return (
					item.status === "pending" &&
					item.faculty === get(profile, "faculty", "")
				);
			});
		}

		postsMap = map(postsData, (item) => {
			const data = {
				select: (
					<label>
						<Checkbox onChange={(e, checked) => this.onCheckItem(item, e)} />
					</label>
				),
				title: item.title,
				studentId: item.studentId,
				studentName: item.studentName,
				createdDateTime: item.createdDateTime,
				fileUrl: (
					<NavLink
						to={`/contributionDetail/${item.id}`}
						style={{ color: "blue" }}
					>
						View File
					</NavLink>
				),
			};

			if (get(profile, "role", "") === Role.Manager) {
				data.faculty = item.faculty;
			}

			return data;
		});

		if (get(profile, "role", "") === Role.Coordinator) {
			postsMap = map(postsData, (item) => {
				const data = {
					select: (
						<label>
							<Checkbox onChange={(e, checked) => this.onCheckItem(item, e)} />
						</label>
					),
					title: item.title,
					studentId: item.studentId,
					studentName: item.studentName,
					createdDateTime: item.createdDateTime,
					fileUrl: (
						<NavLink to={`/viewDetail/${item.id}`} style={{ color: "blue" }}>
							View Details
						</NavLink>
					),
				};
				if (get(profile, "role", "") === Role.Manager) {
					data.faculty = item.faculty;
				}
				return data;
			});
		}

		if (get(profile, "role", "") === Role.Student) {
			postsMap = map(postsData, (item) => {
				const data = {
					status: (
						<h5
							style={{
								color: this.getStatusColor(item.status),
							}}
						>
							{upperFirst(item.status)}
						</h5>
					),
					title: item.title,
					createdDateTime: item.createdDateTime,
					fileUrl: (
						<NavLink to={`/viewDetail/${item.id}`} style={{ color: "blue" }}>
							View Details
						</NavLink>
					),
				};
				if (get(profile, "role", "") === Role.Manager) {
					data.faculty = item.faculty;
				}
				return data;
			});
		}

		data.rows = postsMap;
		return data;
	};

	onDownload = () => {
		const { checkItem } = this.state;
		let zip = require("jszip")();
		let file = checkItem[Object.keys(checkItem)[0]];
		let allZip;

		JSZipUtils.getBinaryContent(file, function (err, data) {
			if (err) {
				throw err; // or handle the error
			}
			this.setState({ file: file });
		});

		allZip = zip.file("DOCS/document.docx", "asdiasudg", { binary: false });

		zip
			.generateAsync({ type: "blob", compression: "DEFLATE" })
			.then(function (content) {
				// see FileSaver.js
				saveAs(content, "example.zip");
			});

		console.log(allZip);
	};

	onAccept = () => {
		const { approve, profile } = this.props;

		if (get(profile, "role", "") === Role.Manager) {
			return approve(this.state.project_ids, "publish");
		}

		if (get(profile, "role", "") === Role.Coordinator)
			return approve(this.state.project_ids, "approved");
	};

	render() {
		const { auth, profile } = this.props;
		const { checkItem } = this.state;

		if (!auth.uid) {
			return <Redirect to="/signin" />;
		}

		return (
			<div className="container">
				<div>
					{profile.role !== Role.Student && (
						<div>
							<button
								className="btn pink lighten-1 right"
								disabled={isEmpty(checkItem)}
								onClick={this.onAccept}
							>
								Accept
							</button>
							<button
								className="btn pink lighten-1 right"
								disabled={isEmpty(checkItem)}
								onClick={this.onDownload}
							>
								Download
							</button>
						</div>
					)}
					<MDBDataTableV5
						hover
						entriesOptions={[5, 20, 25]}
						entries={5}
						pagesAmount={4}
						data={this.getPostsDataTable()}
						materialSearch
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		users: state.firestore.ordered.users,
		posts: state.firestore.ordered.posts,
		profile: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		approve: (project_ids, status) => dispatch(approve(project_ids, status)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(["users", "posts"])
)(ContributionsList);
