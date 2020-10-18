import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";
import CreateManager from "./components/auth/users/CreateManager";
import CreateCooridnator from "./components/auth/users/CreateCoordinator";
import CreateStudent from "./components/auth/users/CreateStudent";
import UserList from "./components/users/UserList";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
						<Route path="/create/manager" component={CreateManager} />
						<Route path="/create/coordinator" component={CreateCooridnator} />
						<Route path="/create/student" component={CreateStudent} />
						<Route path="/user/list" component={UserList} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
