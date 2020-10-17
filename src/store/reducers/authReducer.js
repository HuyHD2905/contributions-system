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
		case "SIGNUP_SUCCESS":
			console.log("Sign up success!");
			return { ...state, authError: null };
		case "SIGNUP_FAIL":
			console.log("Sign up failed!");
			return {
				...state,
				authError: action.err.message,
			};
		default:
			return state;
	}
};

export default authReducer;
