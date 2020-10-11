const initState = {
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
	return state;
};

export default contributionReducer;
