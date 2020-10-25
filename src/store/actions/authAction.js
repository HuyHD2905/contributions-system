import { Role } from "../../config/common";

export const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({
					type: "LOGIN_SUCCESS",
				});
			})
			.catch((err) => {
				dispatch({
					type: "LOGIN_FAIL",
					err,
				});
			});
	};
};

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: "LOGOUT_SUCCESS" });
			});
	};
};

export const signUp = (credentials) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		firebase
			.auth()
			.createUserWithEmailAndPassword(credentials.email, credentials.password)
			.then((response) => {
				return firestore.collection("users").doc(response.user.uid).set({
					userId: response.user.uid,
					email: credentials.email,
					firstName: credentials.firstName,
					lastName: credentials.lastName,
					role: credentials.role,
					studentId: credentials.studentId,
					faculty: credentials.faculty,
				});
			})
			.then(() => {
				dispatch({ type: "SIGNUP_SUCCESS" });
			})
			.catch((err) => {
				dispatch({ type: "SIGNUP_FAIL", err });
			});
	};
};
