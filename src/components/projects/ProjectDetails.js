import React from "react";

const ProjectDetails = (props) => {
	const id = props.match.params.id;

	return (
		<div className="container section project-details">
			<div className="card z-depth-0">
				<div className="card-content">
					<span className="card-title">Project Title {id}</span>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
						nam quasi quod voluptatem sit, illo in possimus temporibus nulla
						esse ipsam officia debitis non veniam enim! Illo est aut ad.
					</p>
				</div>
				<div className="card-action grey lighten-4 grey-text">
					<div>Posted by HuyHD</div>
					<div>4 Octorber, 10:57 PM</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetails;
