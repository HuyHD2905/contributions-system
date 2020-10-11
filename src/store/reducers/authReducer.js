const initState = {
	authError: null,
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			console.log("Login Success!");
			return {
				...state,
				authError: null,
			};
		case "LOGIN_FAIL":
			return { ...state, authError: "Login failed!" };
		case "LOGOUT_SUCCESS":
			console.log("Sign out success!");
			return state;
		default:
			return state;
	}
};

export default authReducer;
