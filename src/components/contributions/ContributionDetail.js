import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty, find } from "lodash";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import FileViewer from "react-file-viewer";

class ContributionDetail extends Component {
	getPostById = () => {
		const { posts, match } = this.props;
		const post = find(posts, (item) => {
			return item.id === match.params.id;
		});
		return post;
	};

	render() {
		const { posts } = this.props;

		if (isEmpty(posts)) {
			return <h1>No data to show</h1>;
		}

		return (
			<FileViewer
				fileType={"docx"}
				filePath={require("../assets/a.docx")}
				// errorComponent={<Spinner isLoading />}
				onError={() => console.log("errooorrrrrr")}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		users: state.firestore.ordered,
		posts: state.firestore.ordered.posts,
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect(["users", "posts"])
)(ContributionDetail);
