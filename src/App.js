import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProject from "./components/projects/CreateProject";
import ProjectDetails from "./components/projects/ProjectDetails";
import ProjectList from "./components/projects/ProjectList";
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route path="/project/create" component={CreateProject} />
						<Route path="/project/detail/:id" component={ProjectDetails} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
						<Route path="/project" compoenent={ProjectList} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
