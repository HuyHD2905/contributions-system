const initState = {
	projects: [
		{
			id: 1,
			title: "Project 1",
			author: "HuyHD",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem error nostrum nisi quos quam mollitia magnam, commodi autem. Praesentium, corporis tempore. Illo deleniti magnam accusantium optio voluptatibus explicabo, quod natus.",
			createAt: "3rd October, 9:34 PM",
		},
		{
			id: 2,
			title: "Project 2",
			author: "HienLT",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem error nostrum nisi quos quam mollitia magnam, commodi autem. Praesentium, corporis tempore. Illo deleniti magnam accusantium optio voluptatibus explicabo, quod natus.",
			createAt: "4rd October, 9:34 PM",
		},
	],
};

const projectReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_PROJECT":
			console.log("created project", action.project);
			return state;
		case "CREATE_PROJECT_ERROR":
			console.log("create project error", action.err);
			return state;
		default:
			return state;
	}
};

export default projectReducer;
