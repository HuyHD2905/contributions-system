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
					firstName: credentials.firstName,
					lastName: credentials.lastName,
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
