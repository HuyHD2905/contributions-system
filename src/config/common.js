export const Role = {
	Admin: "Admin",
	Student: "Student",
	Manager: "Marketing Manager",
	Coordinator: "Marketing Coordinator",
};

export const Status = {
	Pending: "Pending",
	Approved: "Approved",
	Publish: "Publish",
	Reject: "Reject",
};

export const Faculty = [
	{ value: "IT", label: "IT" },
	{ value: "Design", label: "Design" },
	{ value: "Marketing", label: "Marketing" },
];

export const studentColumns = [
	{
		label: "Email",
		field: "email",
		sort: "asc",
		width: 150,
	},
	{
		label: "First Name",
		field: "firstName",
		sort: "asc",
		width: 200,
	},
	{
		label: "Last Name",
		field: "lastName",
		sort: "asc",
		width: 270,
	},
	{
		label: "Role",
		field: "role",
		sort: "asc",
		width: 200,
	},
	{
		label: "Faculty",
		field: "faculty",
		sort: "asc",
		width: 100,
	},
];
