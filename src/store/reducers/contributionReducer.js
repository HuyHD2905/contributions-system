const initState = {
	authError: null,
	contributions: [
		{
			id: 1,
			title: "Contribution 1",
			description: "This is a description 1",
		},
		{
			id: 2,
			title: "Contribution 2",
			description: "This is a description 2",
		},
	],
};

const contributionReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_CONTRIBUTION":
			return { ...state, authError: null };
		case "CREATE_CONTRIBUTION_SUCCESS":
			return { ...state, authError: "Create failed!" };
		case "APPROVE_CONTRIBUTION":
			return { ...state, authError: null };
		case "APPROVE_CONTRIBUTION_SUCCESS":
			return { ...state, authError: null };
		case "APPROVE_CONTRIBUTION_FAIL":
			return { ...state, authError: "Approve failed!" };
		default:
			return state;
	}
};

export default contributionReducer;
