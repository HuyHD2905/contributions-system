import { find } from "lodash";

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
