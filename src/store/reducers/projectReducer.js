const initState = {
	projects: [
		{
			id: 1,
			title: "Project 1",
			author: "HuyHD",
			createAt: "3rd October, 9:34 PM",
		},
		{
			id: 2,
			title: "Project 2",
			author: "HienLT",
			createAt: "4rd October, 9:34 PM",
		},
	],
};

const projectReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_PROJECT":
			console.log("created project", action.project);
			break;
	}
	return state;
};

export default projectReducer;
