import { storage } from "firebase";
import { find } from "lodash";
import { Status } from "../../config/common";

export const create = (contribution) => {
	return (dispatch, getState, { getFirestore, getFirebase }) => {
		dispatch({ type: "CREATE_CONTRIBUTION", contribution });
		const fireStore = getFirestore();
		const profile = getState().firebase.profile;
		const uploadFile = storage()
			.ref(`images/${contribution.wordFile.name}`)
			.put(contribution.wordFile);
		uploadFile.on(
			"state_changed",
			(snapShot) => {},
			(error) => {
				console.log(error);
			},
			() => {
				storage()
					.ref("images")
					.child(contribution.wordFile.name)
					.getDownloadURL()
					.then((url) => {
						fireStore
							.collection("posts")
							.add({
								title: contribution.title,
								fileURL: url,
								description: contribution.description,
								currentUpdatedNumber: 0,
								createdDateTime: new Date().toString(),
								updatedDateTime: "",
								faculty: profile.faculty,
								studentId: profile.studentId,
								userId: profile.userId,
								studentName: `${profile.firstName} ${profile.lastName}`,
								status: Status.Pending,
							})
							.then(() => {
								dispatch({ type: "CREATE_CONTRIBUTION_SUCCESS", contribution });
							})
							.catch((err) => {
								alert(err);
							});
					});
			}
		);
	};
};

export const approve = (contributionId, status) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const state = getState();
		const profile = getState().firebase.profile;

		contributionId.map((item) => {
			const post = find(state.firestore.ordered.posts, (data) => {
				return data.id === item;
			});
			dispatch({ type: "APPROVE_CONTRIBUTION" });
			return firestore
				.collection("posts")
				.doc(item)
				.set(
					{
						status: status,
					},
					{ merge: true }
				)
				.then(() => {
					firestore.collection("notifications").add({
						isRead: false,
						postId: item,
						senderId: profile.userId,
						senderName: profile.firstName + " " + profile.lastName,
						text: `${status} your contribution`,
						recieverId: post.userId,
					});
					dispatch({ type: "APPROVE_CONTRIBUTION_SUCCESS" });
				})
				.catch((err) => {
					console.log("approve failed!");
					dispatch({ type: "APPROVE_CONTRIBUTION_FAIL", err });
				});
		});
	};
};
